# Tauri テキストエディタ（初心者向けガイド）

このリポジトリは、Tauri を使ったシンプルなテキストエディタです。
**Git から取得するところから**、順番に説明します。

## 0. 事前に必要なもの

- **Node.js**（JavaScript を動かすため）
- **Rust**（Tauri のアプリ部分を動かすため）

> まだインストールしていない場合は、ここで止まって大丈夫です。
> まず Node.js と Rust を入れてから続きを進めてください。

## 1. Git からダウンロード（クローン）

```bash
git clone <このリポジトリのURL>
cd codex_test
```

## 2. 必要なライブラリをインストール

```bash
npm install
```

このとき **Tauri の CLI も一緒に入ります**（`@tauri-apps/cli`）。

> もし `tauri.conf.json` のエラー（identifier が必要など）が出る場合は、
> **Tauri v2 が入ってしまっている**のが原因です。
> その場合は一度 `node_modules` と `package-lock.json` を削除してから、
> `npm install` をやり直してください（このリポジトリは v1 を使います）。

## 3. アプリを起動（開発モード）

```bash
npm run tauri dev
```

このコマンドで、デスクトップアプリとして起動します。
もし `'tauri' は、内部コマンドまたは外部コマンド...` と出る場合は、
`npm install` をやり直してからもう一度 `npm run tauri dev` を実行してください。

---

## よくある質問

### Q. 画面（HTML/CSS/JS）はどこ？
- `src/` に入っています。

### Q. Tauri の設定はどこ？
- `src-tauri/tauri.conf.json` にあります。

### Q. 保存や開くの処理はどこ？
- `src/main.js` にあります。
