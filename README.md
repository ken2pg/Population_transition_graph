# Population_transition_graph

## 動作確認方法

0 RESAS サイトで登録を行い、シークレットキーを取得する。<br/>
https://opendata.resas-portal.go.jp/

1 クローンを行う。<br/>
` $ git clone -b feature/feature3 https://github.com/ken2pg/Population_transition_graph`

2 ディレクトリを変更<br/>
` $ cd Population_transition_graph`

3 node_modules をインストール<br/>
`$ npm i`

4 .env ファイルを webpack.config.js ファイルと同じ階層に作成して、RESAS API のシークレット Key を記述<br/>
`HEADERREQUEST = 'シークレットKey'`

5 下記コマンドでローカルサーバーを立ち上げる<br/>
`$ npm run start`
