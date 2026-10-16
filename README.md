# 株式会社buy4 コーポレートサイト

ビルド不要の静的HTMLサイトです。GitHub Pages でそのまま公開できます。
Claude が更新するときも、人が更新するときも、HTMLファイルを直接編集します。

## ページ構成

| URL | ファイル |
|---|---|
| / | index.html |
| /services/ | services/index.html |
| /works/ | works/index.html |
| /company/ | company/index.html |
| /news/ | news/index.html（一覧） |
| /news/◯◯.html | news/◯◯.html（記事） |
| /contact/ | contact/index.html |

共通の見た目は `assets/style.css`、メニュー開閉・トップの図・問い合わせフォームは `assets/main.js`。
ヘッダーとフッターは各HTMLに同じものが入っているので、メニューを変えるときは全ページを同じように直す。

## よくある更新

- **ニュースを追加**：`news/website-renewal.html` をコピーして新しい記事を作り、`news/index.html` の一覧の一番上に1行足す。
- **実績を追加**：`index.html`（トップは6件まで）と `works/index.html` の `<article class="case">` を1つ足す。
- **パネル人数を更新**：`index.html` の PANEL セクションと `services/index.html` の 03、トップの数字の帯（約3,300名）。
- **問い合わせの送り先**：`contact/index.html` の `data-to="..."` と、右側の連絡先。

## 問い合わせフォーム

サーバーを持たない作りなので、送信ボタンで入力内容入りのメールが開く方式。
フォーム送信サービス（Formspree など）を使う場合は `assets/main.js` の送信処理を差し替える。

## 公開（GitHub Pages）

1. このフォルダの中身をリポジトリのルートに置く
2. リポジトリの Settings › Pages で「Deploy from a branch」→ `main` / `/(root)`
3. 独自ドメインを使う場合は Settings › Pages の Custom domain に入力し、DNSに GitHub Pages 用のレコードを追加

## 消してはいけないファイル

- `CNAME`：独自ドメイン www.buy4.co.jp の設定（GitHub Pages）
- `googleffe0e911483fc776.html`：Google Search Console の所有権確認（消すと確認が外れる）
- `sitemap.xml`：ページを増やしたら1行足す
