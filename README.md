# ExHud  
アクションバーを分割し、アクションバー/サイドバーとして表示させる。
プレイヤーごとに表示できるサイドバーにする
---

# 詳細

それぞれを個別として表示するためにDPに保存
毎tick監視して整形して表示

オブジェクトはバニラコマンドorScriptで事前に作成する
---


# コマンド
`/actionbar <selector> <text> <stayDuration>` - アクションバーを表示

`/sidebar.set <selector> <objectiveId> <text> <score>` - スコアをセット
`/sidebar.refset <selector> <objectiveId> <baseText>` - バニラのスコアを参照してセット
`/sidebar.refsetall <selector> <objectiveId>` - バニラのスコアを参照してすべてのセット
`/sidebar.reset <selector> <objectiveId> <text>` - スコアをリセット
`/sidebar.resetall <selector> <objectiveId>` - スコアをすべてリセット
`/sidebar.show <selector> <objectiveId>` - サイドバーを表示

`/sidebar.display <selector> <objectiveId> <displayName>` - サイドバーの名前を変更

# やること
[] アクションバーで \n が機能しない
[] アクションバーで rawtext を使用できるようにする
[x] sidebar: ディスプレイネームの変更
[x] sidebar: sortの追加
[] sidebar: 最大表示数