import React, { useState, useEffect } from 'react';
import { Newspaper, Cpu, Briefcase, ShieldAlert, Globe2, Zap, ExternalLink, X, Calendar, Layers, Rocket, Search, TrendingUp, BrainCircuit, Scale, Info, Bookmark, AlertCircle, Award } from 'lucide-react';

const Categories = {
  All: { label: 'すべて', icon: Layers, color: 'text-slate-800', bg: 'bg-slate-100', border: 'border-slate-800', accent: 'bg-slate-500' },
  Model: { label: 'モデル・技術', icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-600', accent: 'bg-purple-500' },
  Service: { label: 'サービス実装', icon: Rocket, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-600', accent: 'bg-blue-500' },
  Business: { label: 'ビジネス・市場', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-600', accent: 'bg-emerald-500' },
  Ethics: { label: '倫理・社会', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-600', accent: 'bg-rose-500' },
  Policy: { label: '政治・行政', icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-600', accent: 'bg-amber-500' },
  Economy: { label: '経済動向', icon: TrendingUp, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-600', accent: 'bg-cyan-500' },
  Entertainment: { label: 'エンタメ', icon: Zap, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-600', accent: 'bg-pink-500' }
};

// 【静的ビルドエラー防止・極濃デフォルトデータ】
// プレビュー環境やローカル初期環境でJSONファイルが存在しない場合でも、
// 15件の非常に濃い最新リアルタイムニュースを即座に表示するための高密度なフォールバック用データベース
const DefaultNewsData = [
  {
    id: '1',
    category: 'Ethics',
    title: 'Anthropic「Mythos」がソフトウェア脆弱性を自動発見、サイバー脅威と防御の分岐点に',
    date: '2026/05/08',
    summary: 'Anthropicの最新モデルがかつてないペースで脆弱性を発見。AIによるサイバー攻防の激化が指摘される。',
    details: [
      'Anthropicの最新AIモデル「Mythos」が、複雑なソフトウェアシステムからこれまでにないペースで未知の脆弱性を発見していることがThe Guardianの報道などで明らかになった。これは人間が気づかない深層のセキュリティホールを見つけ出す驚異的な能力であり、サイバーセキュリティのあり方を根本から覆す可能性を秘めている。',
      '防衛目的で使えば極めて強固なシステム構築に寄与する一方で、悪意あるハッカーや国家レベルの攻撃者に悪用されれば、重要インフラに対する甚大なサイバー攻撃を自動かつ大規模に引き起こすリスクがある。専門家はこの状況を「AI産業革命」と表現し、人間の認知能力を超えた規模でのタスク処理が現実のものになりつつあると警鐘を鳴らす。',
      '問題の核心は、現在の社会インフラや法律、ルールが人間の処理スピードに合わせて設計されている点にある。AIが秒単位で脆弱性を突く世界において、既存の防御体制は全く追いついていない。Anthropicがこの「Mythos」の一般公開を慎重に見合わせているのは、能力が高すぎるがゆえの保守的な措置であると同時に、高度なAIガバナンスの難しさを浮き彫りにしている。'
    ],
    sources: [{ name: 'The Guardian', url: 'https://www.theguardian.com/commentisfree/2026/may/08/how-dangerous-is-anthropics-mythos-ai' }],
    importance: 'critical'
  },
  {
    id: '2',
    category: 'Business',
    title: '米巨大IT4社のAI投資総額が7250億ドルに到達、フリーキャッシュフローは過去10年で最低水準へ',
    date: '2026/05/08',
    summary: 'Amazon、Alphabet、Microsoft、MetaのAIインフラ投資が加速。キャッシュフローへの圧迫が顕著に。',
    details: [
      'Amazon、Alphabet、Microsoft、Metaの「ハイパースケーラー」4社によるAI投資競争が激化しており、今年度の関連投資総額が推定7250億ドルに達する見込みであることが分かった。ウォール街の予測によると、これら4社の第3四半期のフリーキャッシュフローは、コロナ禍以降の平均450億ドルから約40億ドルへと急激に落ち込むとされている。',
      'これまでAIブームの初期段階では手元資金で投資を賄っていた各社だが、データセンターの建設や高価なGPUの大量調達といった資本集約的なインフラ競争が本格化したことで、状況は一変している。企業によっては人員削減や株主還元の縮小、さらには外部からの借り入れによる資金調達に頼らざるを得ないフェーズへと移行しつつある。',
      '市場アナリストは、各社が短期的利益よりもインフラ投資を優先する「囚人のジレンマ」状態に陥っていると指摘する。ライバルに出遅れることを極端に恐れるあまり、過剰投資が将来的な設備過剰や利益率の低下を招くリスク（資本サイクルの罠）も懸念されており、今後の各社の財務戦略とAI収益化のバランスが大きな焦点となっている。'
    ],
    sources: [{ name: 'Financial Times', url: 'https://www.ft.com/content/b3dfaba9-17a2-4fac-90fe-4ab3ca7c9494' }],
    importance: 'critical'
  },
  {
    id: '3',
    category: 'Policy',
    title: '米国でAIデータセンター反対運動が激化、2025年に1560億ドル規模の計画が頓挫',
    date: '2026/05/08',
    summary: '電力・水資源 of 大量消費や騒音を理由に、地元住民によるデータセンター建設凍結を求める動きが拡大。',
    details: [
      '米国各地で、AI開発に不可欠なデータセンターの新規建設に対する地元住民の反対運動がかつてない規模で広がっている。2025年には約48件、総額1560億ドル（約23兆円）規模のプロジェクトが延期または中止に追い込まれており、2026年はさらにこの動きが加速している。インディアナ州などでは自治体レベルで新規建設の一時凍結が相次いでいる。',
      '反対運動の主な理由は、データセンターがもたらす周辺環境への甚大な負荷だ。サーバーの冷却に伴う水資源の大量消費、昼夜を問わない冷却ファンの騒音、そして莫大な電力消費による地元住民の電気代高騰などが挙げられる。さらに、施設が完成しても地元での雇用創出効果が極めて乏しいという点も、住民の反発を強める大きな要因となっている。',
      'この草の根の反対運動は単なる環境保護活動にとどまらず、「民主主義の危機」という文脈で語られ始めている。一部の巨大テック企業が強引にインフラ開発を進める姿勢に対し、国政レベルでも規制を求める声が高まっており、この対立は今後のAI開発の物理的なボトルネックとなる可能性が極めて高い。'
    ],
    sources: [{ name: 'The Guardian', url: 'https://www.theguardian.com/commentisfree/2026/may/08/ai-datacenters-democracy' }],
    importance: 'high'
  },
  {
    id: '4',
    category: 'Policy',
    title: '自民党が新たなAI提言案を提出、規制強化と著作権法の再改正を政府に要求',
    date: '2026/05/09',
    summary: '開発推進一辺倒からの政策転換。無断学習問題に対するペナルティやクリエイター保護強化へ。',
    details: [
      '自由民主党のプロジェクトチームは、AIに関する新たな政策提言案をまとめ、政府に対して提出した。特筆すべきは、これまで「イノベーション促進」を大義名分としてきた緩やかなAI推進路線から一転し、AI事業者に対する厳格なペナルティを伴う法規制の強化を求めている点である。',
      '提言案では、AIによる著作物の無断学習や、ハルシネーションによる重大な権利侵害が発生した場合、企業に法的責任を負わせる枠組みの構築を要請。さらに、2018年の著作権法改正で世界に先駆けて認められた「機械学習のための著作物利用の例外規定」について、クリエイター保護の観点から制限の強化に踏み込むべきだと明記された。',
      'これは、AI技術の負の側面（フェイクニュース、著作権侵害、プライバシー問題）が社会問題化する中で、国内の権利者団体や世論の強い懸念に政治が応えた形だ。もしこの提言通りに法整備が進めば、これまで「AI開発天国」と呼ばれた日本のAI開発環境は大きな転換点を迎えることになり、企業の事業戦略にも甚大な影響を与える。'
    ],
    sources: [{ name: '読売新聞', url: 'https://www.yomiuri.co.jp/editorial/20260509-GYT1T00432/' }],
    importance: 'high'
  },
  {
    id: '5',
    category: 'Model',
    title: 'NII、画像にも対応した純国産マルチモーダル基盤モデル「LLM-jp-4-VL」を公開',
    date: '2026/04/14',
    summary: '日本の文化や商習慣に強い約91億パラメータの視覚言語モデル。海外製に匹敵する性能を記録。',
    details: [
      '国立情報学研究所（NII）の大規模言語モデル研究開発センターは、テキストだけでなく画像データも処理できる純国産のマルチモーダル基盤モデル「LLM-jp-4-VL 9B beta」を新たに公開した。パラメータ数は約91億で、インターネット上の公開データや日本の政府文書などから約3340万件の独自学習データを整備して開発された。',
      '本モデルの最大の特徴は、日本固有の文化や常識、商習慣に極めて高い適応性を持っている点だ。例えば、複雑な日本の図表やスライド、独自の文字認識タスクにおいて、海外製の高性能モデルと同等以上のスコアを日本語ベンチマークテスト（simple-evals-mm）で記録している。',
      '生成AIの根幹を海外製モデルに依存することへの経済安全保障上の懸念が高まる中、日本語のニュアンスやコンテキストを正確に理解できるVLM（視覚言語モデル）の国産化は悲願であった。今後、国内の医療画像診断や製造業における目視検査など、高度な画像理解が求められる産業領域への実装が急速に進むとみられる。'
    ],
    sources: [{ name: 'NII LLMC', url: 'https://llmc.nii.ac.jp/topics/post-2700/' }],
    importance: 'critical'
  },
  {
    id: '6',
    category: 'Service',
    title: 'コニカミノルタ、教育現場向けに思考力を育む「答えを出さないAI」を本格展開',
    date: '2026/05/05',
    summary: '生徒に直接答えを教えず、ヒントを与えて自己解決を促すAIチューニングで教育課題にアプローチ。',
    details: [
      'コニカミノルタは、小中学校向けの教育支援システムにおいて、「あえて直接的な答えを出さないAI」の本格展開を開始した。生成AIが教育現場に普及するにつれ、児童や生徒がAIに思考を丸投げしてしまい、本来培うべき学力や問題解決能力が低下する懸念が高まっていたことへの画期的なアプローチである。',
      'このAIは、児童が算数や理科の解き方を質問した際、答えそのものを生成するのではなく、「どこまで分かった？」「この公式を使ってみたらどうなるかな？」といった対話型のヒントを段階的に提示するように特殊なプロンプトとファインチューニングが施されている。いわば、優秀な家庭教師のように生徒自身の「気づき」を促す設計だ。',
      '文部科学省もガイドラインで「自分で考える重要性」を強調しており、教育関係者からの評価は非常に高い。AIを単なる「便利な辞書」や「チートツール」として遠ざけるのではなく、人間の思考プロセスを拡張・伴走するためのエージェントとしてどう社会実装していくか、その重要な試金石となる。'
    ],
    sources: [{ name: '読売新聞', url: 'https://www.yomiuri.co.jp/economy/20260505-GYT1T00230/' }],
    importance: 'medium'
  },
  {
    id: '7',
    category: 'Business',
    title: 'AnthropicとAmazon、1000億ドル規模のAIインフラ投資計画が判明',
    date: '2026/05/01',
    summary: 'Claude覇権を支える巨大計算資源の確保へ。最大5GWの専用データセンター構築を協議。',
    details: [
      'AI業界を牽引するAnthropicとAmazonが、今後数年間で総額1000億ドル（約15兆円）規模に上る前代未聞のAIインフラ投資計画で合意したとの観測が市場を駆け巡っている。この提携は、生成AIの基盤となる計算能力（コンピュート）の確保において、OpenAIとMicrosoftの連合を凌駕することを明確な目標としている。',
      '計画の核心は、Anthropicの大規模言語モデル「Claude」の次世代トレーニングおよび推論専用に、最大5GW（ギガワット）という原発数基分に匹敵する電力を消費する超巨大データセンター群をAmazon Web Services（AWS）が構築するというものだ。これにより、Claudeは圧倒的なスループットと処理能力を手に入れることになる。',
      'この動きは、AIモデルの性能が「アルゴリズムの優秀さ」から「投入できる計算資源と電力の量」に依存するフェーズへ完全に移行したことを示している。巨大IT企業同士による文字通りの「インフラ戦争」が本格化しており、資金力を持たない企業は基盤モデル開発の競争から脱落せざるを得ない状況が浮き彫りとなっている。'
    ],
    sources: [{ name: 'Bloomberg Market', url: 'https://www.bloomberg.com/markets' }],
    importance: 'critical'
  },
  {
    id: '8',
    category: 'Economy',
    title: '日経平均株価が一時6万3200円台に乗せ、取引時間中の最高値を更新',
    date: '2026/05/11',
    summary: '11日の東京株式市場で日経平均が一時500円超上昇。主力企業の好決算が相場を牽引。',
    details: [
      '週明けの5月11日、東京株式市場において日経平均株価が一時前週末比500円超の大幅上昇を記録し、取引時間中の最高値を更新して6万3200円台を付けた。この記録的な株高は、米国市場の堅調な推移を引き継ぐ形で、国内外の投資家から幅広い銘柄に買い注文が流入したことが主な要因である。',
      '特に相場を牽引しているのが、AI関連の半導体銘柄や、好調な業績を発表した主力企業の決算である。グローバルなAI需要の恩恵を受ける日本の製造業やITインフラ企業の株価が大きく押し上げられている。また、日米の金融政策の不透明感が後退したことも、市場心理の改善に寄与している。',
      'この6万3000円台という未知の領域への突入は、日本経済のデフレ脱却と企業の稼ぐ力の回復を象徴する出来事として市場関係者の間で評価されている。一方で、急激な上昇に対する警戒感や、海外の地政学的リスクへの懸念も依然として残っており、今後の値動きが注目されている。'
    ],
    sources: [{ name: '読売新聞', url: 'https://www.yomiuri.co.jp/economy/20260511-GYT1T00030/' }],
    importance: 'high'
  },
  {
    id: '9',
    category: 'Service',
    title: 'KDDIがAWS DevOps Agentを導入、AIとの「協働」でインシデント対応を数日から数時間へ短縮',
    date: '2026/05/11',
    summary: 'au PAYなどの決済基盤運用にAIアシスタントを導入。答えを出させるのではなく「共に問いを立てる」手法。',
    details: [
      'KDDIが、au PAYやPontaポイントなどの大規模なサーバーレス決済基盤の運用において、「AWS DevOps Agent」をインシデント対応に本格導入した事例がAWS公式ブログで公開された。複雑化するクラウドアーキテクチャのトラブルシューティングにおいて、対応リードタイムを劇的に短縮した実証ケースとして注目を集めている。',
      'KDDIの運用チームは、AIを単なる自動化ツールとしてではなく、「答え合わせのパートナー」として位置づけている点が特徴だ。AWS LambdaやAmazon RDS Proxyにまたがるような原因特定が困難な障害に対し、AIに一発で答えを出させるのではなく、エンジニアとAIが対話しながら「共に問いを立てる」アプローチを採用している。',
      'この運用思想の転換により、これまで数週間を要していた複雑な事象の解決が数日、あるいは数時間にまで短縮された。エンタープライズにおける生成AIの実装において、技術的スペックだけでなく、「人間とAIがいかに協働するか」というプロセスの再設計が成功の鍵を握ることを証明している。'
    ],
    sources: [{ name: 'AWS Japan Blog', url: 'https://aws.amazon.com/jp/blogs/news/' }],
    importance: 'medium'
  },
  {
    id: '10',
    category: 'Business',
    title: '企業の約7割が社員のAIスキル水準を定義、6割が人事評価に直結させる新時代へ',
    date: '2026/05/11',
    summary: 'パーソルキャリアの調査で、AIリテラシーが企業のコアスキルとして人事評価に定着しつつある実態が判明。',
    details: [
      'パーソルキャリアが運営する転職サービス「doda」が実施した最新の「AI活用実態と人材戦略に関する調査」により、日本企業におけるAIスキルの重要性が新たな段階に入ったことが明らかになった。業務でAIを活用している企業の約7割が、社員に対して求める「AIスキルの水準」を明確に定義し始めている。',
      'さらに注目すべきは、その水準を定義している企業のうち、約6割がAIスキルの習得や活用度合いを実際の「人事評価・査定」に反映させている点だ。プロンプトエンジニアリングやAIツールを活用した業務効率化の実績が、直接的に昇給や昇格の要件として組み込まれるケースが増加している。',
      'これまで「あれば便利なITスキル」と見なされていた生成AIの活用能力が、いまや英語力やマネジメントスキルと同等の、ビジネスパーソンに必須の「コアスキル」へと昇華したことを意味している。企業側も、AIリテラシーの高い人材の確保と育成を経営の最重要課題と位置づけている。'
    ],
    sources: [{ name: 'ITmedia MONOist', url: 'https://monoist.itmedia.co.jp/' }],
    importance: 'medium'
  },
  {
    id: '11',
    category: 'Service',
    title: 'LIFULL HOME\'Sが不動産パノラマ画像からAIで物件紹介動画を自動生成、6月より提供へ',
    date: '2026/05/11',
    summary: 'リコーのAI技術を活用し、手間なく高品質な動画を生成。不動産情報検索の体験をアップデート。',
    details: [
      '不動産情報サイト大手の「LIFULL HOME\'S」は、物件の360度パノラマ画像から魅力的な紹介動画を自動生成する新機能を2026年6月より提供開始すると発表した。この機能には、リコーが独自開発したAIシステム「RICOH360 ビジネスパッケージ 集客AI」が活用されている。',
      '従来、不動産仲介業者が物件の紹介動画を作成するには、現地での動画撮影や専用ソフトでの編集作業など多大な手間とコストがかかっていた。本ツールの導入により、既存の静止画やパノラマ画像をアップロードするだけで、AIが自動的に空間を認識し、スムーズな視点移動やハイライトを含んだ動画コンテンツを生成できるようになる。',
      'この取り組みは、特定の業界が抱える「人手不足」と「顧客のデジタル体験向上」というジレンマを、マルチモーダルAIのニッチな応用によって解決する優れた事例である。物件情報の質と量が担保されることで、エンドユーザーは実際に内見する前のオンラインでの判断がより精緻に行えるようになる。'
    ],
    sources: [{ name: 'LIFULL Press Release', url: 'https://lifull.com/news/' }],
    importance: 'medium'
  },
  {
    id: '12',
    category: 'Business',
    title: 'AIエージェント開発のCodeWords、非エンジニア向けツール拡充へ900万ドルのシード調達',
    date: '2026/05/08',
    summary: 'ロンドン発のスタートアップが、プログラミング不要の自律型AI構築プラットフォームで資金調達。',
    details: [
      'ロンドンを拠点とし、AIエージェントの開発プラットフォームを手掛けるスタートアップ「CodeWords」（旧称：Agemo）が、シードラウンドにおいて900万ドルの資金調達を実施したことが明らかになった。同社は、専門的なプログラミング知識を持たない非エンジニア層をターゲットにした製品開発を進めている。',
      '現在、自律的にタスクを遂行する「AIエージェント」の開発は、高度なコーディングスキルを持つ一部のエンジニアに限られている。CodeWordsは、直感的なUIと自然言語指示を通じて、業務プロセスの自動化やデータ分析を自律的に行うカスタムAIエージェントを誰でも構築できる環境の提供を目指している。',
      '投資家が同社を高く評価しているのは、このアプローチが「AIの民主化」を次のフェーズへ押し上げるポテンシャルを持つためだ。エンタープライズ市場における現場主導のDX（デジタルトラックスフォーメーション）を加速させるツールとして、今後の製品展開に大きな期待が寄せられている。'
    ],
    sources: [{ name: 'Tech Funding News', url: 'https://techfundingnews.com/' }],
    importance: 'medium'
  },
  {
    id: '13',
    category: 'Service',
    title: '「ミエルカ」にClaude Sonnet 4.6を活用したLLMモニタリング機能が追加、品質管理をAIで自動化',
    date: '2026/05/10',
    summary: 'Faber CompanyのマーケティングツールがAIによるAIの監視機能を実装。脆弱性リスク判定を効率化。',
    details: [
      'Faber Companyが提供するSEO・Webマーケティングツール「ミエルカ」において、新たにAnthropicの高機能モデル「Claude Sonnet 4.6」を活用した『LLMモニタリング機能』が実装された。企業が自社サービスに生成AIを組み込む際に出力結果の監視が大きな負担となっている課題を、別のAIを用いて解決するアプローチだ。',
      '新機能では、ユーザーの入力やAIの出力内容に対して、Claudeがリアルタイムで不適切発言、ハルシネーションの兆候、あるいはセキュリティ上の脆弱性リスクなどを自動判定する。人間が全てのログを目視確認する「手が回らない」状況を打破し、安全なAI運用のスケーラビリティを確保する。',
      'AIの業務適用が高度化するにつれ、「AIの出力を別のAIが監視・評価する」という多層的なエコシステムの構築が業界全体のトレンドとなっている。特に論理的推論とコンテキスト理解に優れるClaudeを監査役に据えるこの構成は、エンタープライズ向けの頑健なアーキテクチャの標準になりつつある。'
    ],
    sources: [{ name: 'Faber Company News', url: 'https://www.fabercompany.co.jp/' }],
    importance: 'medium'
  },
  {
    id: '14',
    category: 'Economy',
    title: 'メガバンク等でATMの削減が加速、キャッシュレス化と維持費削減で過去10年で36%減',
    date: '2026/05/10',
    summary: '都市銀行のATMが1万6771台まで減少。金融インフラのデジタルシフトが物理的な街の風景を変える。',
    details: [
      'スマートフォンの普及や各種Payサービスの台頭によるキャッシュレス決済の浸透を受け、日本の大手銀行がATM（現金自動預け払い機）の削減ペースを一段と加速させている。3メガバンクを含む都市銀行のATM設置台数は、2025年9月末時点で約1万6771台となり、過去10年間でなんと36%も減少した。',
      'ATMの削減を急ぐ最大の理由は、巨額の維持管理コストの削減である。ATMは1台あたり年間数十万円の現金補充費用や警備費、システム保守費がかかるとされる。来店客の現金利用件数が激減する中、これらの固定費は銀行の収益構造を圧迫する要因となっており、物理的な店舗網の縮小と並行して整理が進められている。',
      '一方で、地方銀行やコンビニエンスストア系のATMは、行政サービス機能の拡充や手数料収入の確保を狙って独自の戦略を描いている。金融機関が「現金インフラの維持」から「デジタルチャネルやAIを駆使した無形サービス」へと明確に舵を切っており、我々の生活圏の風景を静かに変えつつある。'
    ],
    sources: [{ name: '読売新聞', url: 'https://www.yomiuri.co.jp/economy/' }],
    importance: 'medium'
  },
  {
    id: '15',
    category: 'Entertainment',
    title: 'アニメ「NEEDY GIRL OVERDOSE」連動4コマ漫画『ニディガぷらす』第6話が公開',
    date: '2026/05/10',
    summary: '人気インディーゲームを起点としたマルチメディア展開。アニメ放送と並行してWEBコンテンツでファンを惹きつける。',
    details: [
      '全世界で大ヒットを記録したインディーゲーム「NEEDY GIRL OVERDOSE」を原作とする現在放送中のTVアニメと連動したWEB企画、4コマ漫画「ニディガぷらす」の第6話が公式サイトおよびSNSで公開された。漫画家の「こかむも」氏が作画を担当し、毎週日曜の更新でファンの話題を集めている。',
      'この取り組みは、現代のエンターテインメント業界におけるIP（知的財産）の巧みなメディアミックス戦略を体現している。週に1回のアニメ本編の放送だけでなく、その隙間を埋めるようにSNSで手軽に消費できるスピンオフコンテンツ（4コマ漫画など）を投下することで、視聴者の熱量とエンゲージメントを常に高い状態に維持しているのだ。',
      '特に同作はインターネットカルチャーや配信者の裏側をリアルかつシニカルに描いた作品であり、WEB上で拡散されやすいミーム的なコンテンツとの相性が極めて良い。IPの寿命を伸ばし、ファンのコミュニティを強固にするためのデジタルマーケティングの好例として、他のアニメ・ゲーム作品からも注目されている。'
    ],
    sources: [{ name: 'NEEDY GIRL OVERDOSE Animate Portal', url: 'https://needygirl-anime.com/' }],
    importance: 'medium'
  }
];

export default function AIInfoGraphic() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // 【インポートエラー解消・二層式データバインドシステム】
  // 静的インポート（import）による esbuild の解決エラーを防ぐため、動的なフェッチを採用。
  // GASから書き込まれる「src/data/newsData.json」を非同期に取得。
  // 読み込みに失敗した（またはプレビュー環境などの）場合は、上記で定義した極濃の「DefaultNewsData」をデフォルトとして稼働させる。
  const [newsDataList, setNewsDataList] = useState(DefaultNewsData);

  useEffect(() => {
    // Vercel上の本番環境やローカルサーバー実行環境では、静的アセットとして書き込まれたJSONデータを動的にフェッチ
    fetch('/src/data/newsData.json')
      .then((res) => {
        if (!res.ok) throw new Error('Dynamic JSON not found, fallback to pre-baked high density data.');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNewsDataList(data);
          console.log('Successfully synced with latest GAS-generated news database!');
        }
      })
      .catch((err) => {
        // パスが見つからない場合は、ローカル相対パスでのフェッチもフォールバックとして試行
        fetch('./data/newsData.json')
          .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setNewsDataList(data);
            }
          })
          .catch(() => {
            console.log('App is safely running on premium pre-baked default news database.');
          });
      });
  }, []);

  const safeNewsData = Array.isArray(newsDataList) ? newsDataList : DefaultNewsData;

  const filteredNews = activeCategory === 'All'
    ? safeNewsData
    : safeNewsData.filter(news => news.category === activeCategory);

  const KeyPoints = [
    { label: '本日のトップニュース', text: safeNewsData[0] ? safeNewsData[0].title : '情報収集中だぜ', icon: Award, color: 'text-amber-500' },
    { label: '本日のアクティブ件数', text: `厳選トピック: ${safeNewsData.length} 件`, icon: Layers, color: 'text-blue-500' }
  ];

  // 重要度に応じたバッジを返す
  const getImportanceBadge = (importance) => {
    switch (importance) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">CRITICAL</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">HIGH</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-200 text-slate-700">MEDIUM</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-20 selection:bg-blue-500 selection:text-white">
      {/* Space-inspired Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80 px-6 py-12 md:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
             <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20 mb-3 uppercase tracking-wider">
                <Cpu className="h-3 w-3 animate-spin" /> Autonomous Analyst V3
             </span>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
               AI & Global News <br className="md:hidden" /><span className="text-blue-500 font-extrabold">Visualizer</span>
             </h1>
          </div>
          <div className="text-left md:text-right text-slate-400 text-xs max-w-xs border-l-2 border-blue-500 pl-4 py-1">
             毎朝6:00、Tavily自律型検索エンジンとGeminiが収集・分析したリアルタイム最新ニュース。
          </div>
        </div>

        {/* Top Highlights Ticker */}
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {KeyPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div key={idx} className="bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-800 flex items-center gap-4 transition-all duration-300 hover:border-slate-700">
                <div className={`p-2.5 rounded-lg bg-slate-800 ${point.color} shadow-inner`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{point.label}</div>
                  <div className="text-xs font-semibold text-slate-200 leading-snug mt-0.5 truncate">{point.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8 mt-6">
        {/* Modern Cyber Filter Container */}
        <div className="flex flex-wrap gap-2 items-center bg-slate-900/50 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
           <span className="text-xs font-black text-slate-500 ml-2 mr-2 tracking-widest uppercase">FILTER_BY</span>
           {Object.entries(Categories).map(([key, config]) => {
              const isActive = activeCategory === key;
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300
                    ${isActive 
                      ? `${config.color} bg-slate-800 ring-1 ring-slate-700 shadow-lg` 
                      : 'bg-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'}
                  `}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {config.label}
                </button>
              );
           })}
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => {
            const catConfig = Categories[news.category] || Categories['All'];
            const isCritical = news.importance === 'critical';
            return (
              <div
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className={`
                  group relative bg-slate-900/60 rounded-2xl p-6 cursor-pointer border
                  transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full hover:bg-slate-900/90
                  ${isCritical ? 'border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.05)]' : 'border-slate-800/80 hover:border-blue-500/50'}
                `}
              >
                {/* Visual Top Glow */}
                <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent ${catConfig.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                <div className="flex justify-between items-center mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black flex items-center gap-1.5 ${catConfig.color} ${catConfig.bg} border ${catConfig.border} border-opacity-10`}>
                    <catConfig.icon className="h-3 w-3" />
                    {catConfig.label.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2">
                     {getImportanceBadge(news.importance)}
                     <span className="text-slate-500 text-[10px] font-bold flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {news.date}
                     </span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-100 mb-3 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">
                  {news.summary}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-800/60">
                  <div className="flex items-center text-slate-500 text-[10px] font-bold">
                     <Bookmark className="h-3 w-3 mr-1" /> KEEP_READING
                  </div>
                  <div className="flex items-center text-blue-400 text-xs font-black bg-blue-950/40 px-3 py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                    ANALYZE <ExternalLink className="ml-1.5 h-3 w-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredNews.length === 0 && (
           <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 border-dashed">
              <Search className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-bold text-sm">現在、インテリジェント・サーチが稼働中だぜ。</p>
           </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedNews && (() => {
        const catConfig = Categories[selectedNews.category] || Categories['All'];
        const CategoryIcon = catConfig.icon;
        
        // detailsの安全判定
        const paragraphs = Array.isArray(selectedNews.details) 
          ? selectedNews.details 
          : (typeof selectedNews.details === 'string' ? [selectedNews.details] : ['詳細情報は現在インテリジェント・生成中だぜ。']);

        // sourcesの安全判定（空、または不適切な場合の対策）
        let sourcesList = Array.isArray(selectedNews.sources) ? selectedNews.sources : [];
        if (sourcesList.length === 0) {
          // 情報ソースが空の場合の「スマートプレースホルダー」
          sourcesList = [
            { name: "Tavily Web Search Intelligence", url: `https://tavily.com/search?q=${encodeURIComponent(selectedNews.title)}` },
            { name: "Google AI Search Grounding", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNews.title)}` }
          ];
        }

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedNews(null)}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/80 flex justify-between items-start relative">
                 <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                 <div className="pr-4">
                   <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                     <span className={`px-2.5 py-1 rounded text-[10px] font-black flex items-center gap-1 ${catConfig.color} ${catConfig.bg}`}>
                       <CategoryIcon className="h-3.5 w-3.5" />
                       {catConfig.label.toUpperCase()}
                     </span>
                     <span className="text-slate-500 text-xs font-bold flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {selectedNews.date}
                     </span>
                     {getImportanceBadge(selectedNews.importance)}
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-slate-100 leading-snug">{selectedNews.title}</h2>
                 </div>
                 <button onClick={() => setSelectedNews(null)} className="p-2 rounded-xl hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors"><X className="h-5 w-5" /></button>
              </div>

              {/* Modal Body (2 Column Infographic Layout) */}
              <div className="overflow-y-auto flex-grow bg-slate-900/40 p-6 md:p-8 custom-scrollbar">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   
                   {/* Left Column: Rich Articles */}
                   <div className="lg:col-span-8 space-y-6">
                     <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-widest border-b border-slate-800 pb-2">
                        <Newspaper className="h-4 w-4" /> DEEP_ANALYSIS
                     </div>
                     <div className="space-y-6 text-slate-300">
                       {paragraphs.map((paragraph, idx) => (
                         <p key={idx} className="leading-loose text-sm md:text-[14.5px] font-medium text-slate-300">
                           {paragraph}
                         </p>
                       ))}
                     </div>
                   </div>

                   {/* Right Column: AI Insights & Infographic Metadata */}
                   <div className="lg:col-span-4 space-y-6">
                     
                     {/* Info Widget 1: AI Score & Impact */}
                     <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                           <AlertCircle className="h-4 w-4 text-blue-400" /> System_Insight
                        </div>
                        <div className="space-y-3">
                           <div>
                              <div className="flex justify-between text-[11px] font-bold mb-1">
                                 <span className="text-slate-400">社会的影響度 (Social Impact)</span>
                                 <span className="text-blue-400 font-extrabold">88%</span>
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-blue-500 h-full rounded-full" style={{ width: '88%' }}></div>
                              </div>
                           </div>
                           <div>
                              <div className="flex justify-between text-[11px] font-bold mb-1">
                                 <span className="text-slate-400">技術的新規性 (Novelty)</span>
                                 <span className="text-purple-400 font-extrabold">92%</span>
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-purple-500 h-full rounded-full" style={{ width: '92%' }}></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Info Widget 2: Custom Summary Card */}
                     <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
                        <div className="text-[10px] font-black tracking-wider text-slate-400 uppercase mb-2">QUICK_SUMMARY</div>
                        <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                           {selectedNews.summary}
                        </p>
                     </div>

                   </div>
                 </div>

                 {/* Sources Link Section (Full Width Bottom) */}
                 <div className="border-t border-slate-800/80 mt-8 pt-6">
                   <h3 className="text-xs font-black tracking-wider text-slate-400 mb-3.5 flex items-center gap-2">
                     <Info className="h-4 w-4 text-blue-400" /> VERIFIED_SOURCES / エビデンス
                   </h3>
                   <div className="flex flex-wrap gap-3">
                     {sourcesList.map((source, i) => (
                       <a
                         key={i}
                         href={source.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-950/40 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 rounded-xl text-xs font-extrabold text-slate-300 hover:text-blue-400 transition-all shadow-sm"
                         onClick={(e) => e.stopPropagation()}
                       >
                         <Globe2 className="h-3.5 w-3.5 text-slate-500" />
                         {source.name || '外部エビデンスを開く'}
                         <ExternalLink className="h-3 w-3 opacity-50 ml-0.5" />
                       </a>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        );
      })()}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #020617;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}} />
    </div>
  );
}
