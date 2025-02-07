# playwright-sandbox

## Usage
```bash
$ npx playwright test --list
$ npx playwright test
$ npx playwright test --ui
$ npx playwright show-report
$ npx playwright codegen

# Run tests on different browse

# To specify which browser you would like to run your tests on, use the --project flag followed by the name of the browser.
$ npx playwright test --project webkit

# Run specific tests

$ npx playwright test landing-page.spec.ts
$ npx playwright test tests/todo-page/ tests/landing-page/
# To run files that have landing or login in the file name, simply pass in these keywords to the CLI.
$ npx playwright test landing login
# To run a test with a specific title, use the -g flag followed by the title of the test.
$ npx playwright test -g "add a todo item"

# Run last failed tests

# To run only the tests that failed in the last test run, first run your tests and then run them again with the --last-failed flag.
$ npx playwright test --last-failed

# Debug tests with the Playwright Inspector

$ npx playwright test --debug
$ npx playwright test example.spec.ts --debug
# To debug a specific test from the line number where the test(.. is defined, add a colon followed by the line number at the end of the test file name, followed by the --debug flag.
$ npx playwright test example.spec.ts:10 --debug
```

## Note
- sample
