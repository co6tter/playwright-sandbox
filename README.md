# Playwright Sandbox

## Overview

Playwright を使用したE2Eテストの学習・実験用プロジェクトです。Basic認証付きのシンプルなHTTPサーバーを備え、レートリミット機能やGitHub Actionsによる自動テストを含みます。

## Tech Stack

- **Runtime**: Node.js
- **Testing**: Playwright
- **Code Quality**: Biome (Linter & Formatter)
- **Git Hooks**: Lefthook
- **Environment**: dotenv
- **CI/CD**: GitHub Actions

## Setup

1. リポジトリをクローン:
```bash
git clone <repository-url>
cd playwright-sandbox
```

2. 依存関係をインストール:
```bash
npm install
```

3. 環境変数を設定:
```bash
cp .env.sample .env
# .envファイルを編集してBASIC_AUTH_USERNAMEとBASIC_AUTH_PASSWORDを設定
```

4. Playwrightブラウザをインストール:
```bash
npx playwright install
```

## Usage

### サーバーの起動

```bash
npm start
```

サーバーは `http://localhost:3000` で起動します（ポートは環境変数 `PORT` で変更可能）。

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

## Directory Structure

```
.
├── .github/
│   └── workflows/          # GitHub Actions ワークフロー
├── tests/                  # Playwrightテストファイル
│   ├── helpers/            # テストヘルパー関数
│   ├── index.html          # テスト用HTMLファイル
│   ├── a.spec.ts           # テストファイル A
│   ├── b.spec.ts           # テストファイル B
│   ├── example.spec.ts     # サンプルテスト
│   └── server.spec.ts      # サーバーテスト
├── tests-examples/         # Playwrightサンプルテスト
├── server.mjs              # Basic認証付きHTTPサーバー
├── playwright.config.ts    # Playwright設定ファイル
├── biome.json              # Biome設定ファイル
├── lefthook.yml            # Git hooks設定
├── docker-compose.yml      # Docker Compose設定
├── Dockerfile              # Dockerイメージ定義
└── package.json            # プロジェクト依存関係
```

## License

This repository is for personal/private use only.
