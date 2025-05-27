# playwright-sandbox

## Usage

```bash
npx playwright test --list
npx playwright test
npx playwright test --ui
npx playwright test --headed --workers=4

npx playwright show-report
npx playwright codegen

# Run tests on different browse

# To specify which browser you would like to run your tests on, use the --project flag followed by the name of the browser.
npx playwright test --project webkit

# Run specific tests

npx playwright test landing-page.spec.ts
npx playwright test tests/todo-page/ tests/landing-page/
# To run files that have landing or login in the file name, simply pass in these keywords to the CLI.
npx playwright test landing login
# To run a test with a specific title, use the -g flag followed by the title of the test.
npx playwright test -g "add a todo item"

# Run last failed tests

# To run only the tests that failed in the last test run, first run your tests and then run them again with the --last-failed flag.
npx playwright test --last-failed

# Debug tests with the Playwright Inspector

npx playwright test --debug
npx playwright test example.spec.ts --debug
# To debug a specific test from the line number where the test(.. is defined, add a colon followed by the line number at the end of the test file name, followed by the --debug flag.
npx playwright test example.spec.ts:10 --debug
```

## Note

test files are run in parallel. Tests in a single file are run in order, in the same worker process.

- You can configure tests using test.describe.configure to run tests in a single file in parallel.
- You can configure entire project to have all tests in all files to run in parallel using testProject.fullyParallel or testConfig.fullyParallel.
- To disable parallelism limit the number of workers to one.

```bash
npx playwright test --workers=1
```

VSCode・Cursorの拡張機能の Show browser で実行すると workers = 1 になる。

Playwright Test enforces a timeout for each test, 30 seconds by default.
