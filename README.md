# Playwright Sandbox

## Overview

Playwright を使用したE2Eテストの学習・実験用プロジェクトです。Basic認証付きのシンプルなHTTPサーバーを内蔵しており、並列実行・タイムアウト制御・レートリミットなど Playwright の各種機能を試せる環境を提供します。GitHub Actions による CI テストにも対応しています。

## Tech Stack

- **Runtime**: Node.js 22.x
- **Testing**: Playwright
- **Language**: TypeScript
- **Linter / Formatter**: Biome
- **Git Hooks**: Lefthook
- **Environment**: dotenv
- **CI/CD**: GitHub Actions
- **Container**: Docker / Docker Compose

## Prerequisites

- Node.js 22.x（`actions/setup-node` の `lts/*` に相当）
- npm（`npm ci` を使用）
- Playwright 対応ブラウザ（`npx playwright install` でインストール）
- Docker（コンテナ実行時のみ）

## Setup

1. リポジトリをクローン:

```bash
git clone https://github.com/co6tter/playwright-sandbox.git
cd playwright-sandbox
```

2. 依存関係をインストール:

```bash
npm ci
```

3. 環境変数を設定:

```bash
cp .env.sample .env
# .env を編集して BASIC_AUTH_USERNAME と BASIC_AUTH_PASSWORD を設定
```

4. Playwright ブラウザをインストール:

```bash
npx playwright install --with-deps
```

## Usage

### サーバーの起動

```bash
npm start
```

`http://localhost:3000` で起動します（ポートは環境変数 `PORT` で変更可能）。

### テストの実行

```bash
npx playwright test
```

### テストレポートの表示

```bash
npx playwright show-report
```

### コードフォーマット

```bash
npx biome check --write .
```

### Docker での起動

```bash
docker compose up --build
```

## Directory Structure

```
.
├── .github/
│   └── workflows/        # GitHub Actions ワークフロー
├── tests/
│   ├── helpers/          # テストヘルパー関数
│   ├── index.html        # テスト用 HTML
│   ├── a.spec.ts         # 並列・タイムアウト検証テスト
│   ├── b.spec.ts         # 並列・タイムアウト検証テスト
│   ├── example.spec.ts   # 基本的なサンプルテスト
│   └── server.spec.ts    # サーバー動作確認テスト
├── tests-examples/       # Playwright 公式サンプルテスト
├── server.mjs            # Basic 認証付き静的 HTTP サーバー
├── playwright.config.ts  # Playwright 設定
├── biome.json            # Biome 設定
├── lefthook.yml          # Git hooks 設定
├── docker-compose.yml    # Docker Compose 設定
├── Dockerfile            # Docker イメージ定義
└── package.json          # プロジェクト依存関係
```

## License

MIT
