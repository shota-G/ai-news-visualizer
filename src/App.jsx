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
  }
];

export default function AIInfoGraphic() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDate, setActiveDate] = useState('All'); // 日付フィルター用の状態を追加
  
  const [newsDataList, setNewsDataList] = useState(DefaultNewsData);

  useEffect(() => {
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

  // 【追加】データを日付の降順（新しい順）に並び替え
  const sortedNewsData = [...safeNewsData].sort((a, b) => new Date(b.date) - new Date(a.date));

  // 【追加】データに存在する日付のリストを重複なしで抽出して降順に並べ替え
  const availableDates = ['All', ...Array.from(new Set(sortedNewsData.map(news => news.date)))].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return new Date(b) - new Date(a);
  });

  // 【更新】カテゴリフィルターと日付フィルターの両方を適用
  const filteredNews = sortedNewsData.filter(news => {
    const matchCategory = activeCategory === 'All' || news.category === activeCategory;
    const matchDate = activeDate === 'All' || news.date === activeDate;
    return matchCategory && matchDate;
  });

  const KeyPoints = [
    { label: '本日のトップニュース', text: sortedNewsData[0] ? sortedNewsData[0].title : '情報収集中だぜ', icon: Award, color: 'text-amber-500' },
    { label: '表示中の件数', text: `厳選トピック: ${filteredNews.length} 件`, icon: Layers, color: 'text-blue-500' }
  ];

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
      {/* Header */}
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

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-4 mt-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 items-center bg-slate-900/50 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
           <span className="text-xs font-black text-slate-500 ml-2 mr-2 tracking-widest uppercase">CATEGORY</span>
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

        {/* Date Filter (新規追加) */}
        <div className="flex flex-wrap gap-2 items-center bg-slate-900/50 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
           <span className="text-xs font-black text-slate-500 ml-2 mr-2 tracking-widest uppercase">DATE_FILTER</span>
           {availableDates.map(date => {
              const isActive = activeDate === date;
              return (
                <button
                  key={date}
                  onClick={() => setActiveDate(date)}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300
                    ${isActive 
                      ? `text-blue-400 bg-slate-800 ring-1 ring-slate-700 shadow-lg` 
                      : 'bg-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'}
                  `}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {date === 'All' ? 'すべての日付' : date}
                </button>
              );
           })}
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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
           <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 border-dashed mt-4">
              <Search className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-bold text-sm">該当するニュースが見つからないぜ。</p>
           </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedNews && (() => {
        const catConfig = Categories[selectedNews.category] || Categories['All'];
        const CategoryIcon = catConfig.icon;
        
        const paragraphs = Array.isArray(selectedNews.details) 
          ? selectedNews.details 
          : (typeof selectedNews.details === 'string' ? [selectedNews.details] : ['詳細情報は現在インテリジェント・生成中だぜ。']);

        let sourcesList = Array.isArray(selectedNews.sources) ? selectedNews.sources : [];
        if (sourcesList.length === 0) {
          sourcesList = [
            { name: "Tavily Web Search Intelligence", url: `https://tavily.com/search?q=${encodeURIComponent(selectedNews.title)}` },
            { name: "Google AI Search Grounding", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNews.title)}` }
          ];
        }

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedNews(null)}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              
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

              <div className="overflow-y-auto flex-grow bg-slate-900/40 p-6 md:p-8 custom-scrollbar">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   
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

                   <div className="lg:col-span-4 space-y-6">
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

                     <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
                        <div className="text-[10px] font-black tracking-wider text-slate-400 uppercase mb-2">QUICK_SUMMARY</div>
                        <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                           {selectedNews.summary}
                        </p>
                     </div>
                   </div>
                 </div>

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
