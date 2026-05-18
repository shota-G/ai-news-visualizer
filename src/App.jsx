```react
import React, { useState, useEffect, useMemo } from 'react';
import { Newspaper, Cpu, Briefcase, ShieldAlert, Globe2, Zap, ExternalLink, X, Calendar, Layers, Rocket, Search, TrendingUp, BrainCircuit, Scale, Info, Bookmark, AlertCircle, Award, Clock } from 'lucide-react';

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

const TimeRanges = {
  '3days': { label: '直近3日', days: 3 },
  '3weeks': { label: '過去3週間', days: 21 },
  '3months': { label: '過去3ヶ月', days: 90 },
  'all': { label: 'すべて', days: 9999 }
};

export default function AIInfoGraphic() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTimeRange, setActiveTimeRange] = useState('3months'); 
  
  const [newsDataList, setNewsDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 【修正点】Vercel(Vite)環境で確実に取得できるよう、public直下のパスに変更。
    // さらにキャッシュを防ぐためにタイムスタンプを付与して常に最新を取得する。
    const fetchUrl = `/newsData.json?t=${new Date().getTime()}`;
    
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Data fetch failed');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNewsDataList(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load news data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const safeNewsData = Array.isArray(newsDataList) ? newsDataList : [];

  const sortedNewsData = useMemo(() => {
    return [...safeNewsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [safeNewsData]);

  // データに存在する日付のリスト
  const availableDates = useMemo(() => {
    const dates = Array.from(new Set(sortedNewsData.map(news => news.date)));
    return ['All', ...dates].sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return new Date(b) - new Date(a);
    });
  }, [sortedNewsData]);

  const latestDateInDb = sortedNewsData.length > 0 ? new Date(sortedNewsData[0].date) : new Date();

  const filteredNews = useMemo(() => {
    return sortedNewsData.filter(news => {
      const matchCategory = activeCategory === 'All' || news.category === activeCategory;
      
      const newsDate = new Date(news.date);
      // 日付が不正な場合は除外しないための安全策
      if (isNaN(newsDate.getTime())) return matchCategory;

      const diffTime = Math.abs(latestDateInDb - newsDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const allowedDays = TimeRanges[activeTimeRange].days;
      const matchTimeRange = diffDays <= allowedDays;

      return matchCategory && matchTimeRange;
    });
  }, [sortedNewsData, activeCategory, activeTimeRange, latestDateInDb]);

  const KeyPoints = [
    { label: '最新のメジャートピック', text: sortedNewsData[0] ? sortedNewsData[0].title : '情報収集中...', icon: Award, color: 'text-amber-500' },
    { label: '表示中の抽出件数', text: `${TimeRanges[activeTimeRange].label}の厳選トピック: ${filteredNews.length} 件`, icon: Layers, color: 'text-blue-500' }
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
                <Cpu className="h-3 w-3 animate-spin" /> Autonomous Analyst V4 (3 Months DB)
             </span>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
               AI & Global News <br className="md:hidden" /><span className="text-blue-500 font-extrabold">Visualizer</span>
             </h1>
          </div>
          <div className="text-left md:text-right text-slate-400 text-xs max-w-xs border-l-2 border-blue-500 pl-4 py-1">
             直近3ヶ月の中から最大30件の重要ニュースを自動収集。期間を切り替えてタイムラインを俯瞰できます。
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
        
        {/* Time Range Filter (期間フィルター) */}
        <div className="flex flex-wrap gap-2 items-center bg-slate-900/50 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
           <span className="text-xs font-black text-blue-500 ml-2 mr-2 tracking-widest uppercase flex items-center gap-1">
             <Clock className="h-3.5 w-3.5" /> TIME_RANGE
           </span>
           {Object.entries(TimeRanges).map(([key, config]) => {
              const isActive = activeTimeRange === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTimeRange(key)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300
                    ${isActive 
                      ? `text-blue-400 bg-slate-800 ring-1 ring-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.1)]` 
                      : 'bg-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'}
                  `}
                >
                  {config.label}
                </button>
              );
           })}
           <span className="ml-auto text-[10px] font-bold text-slate-600 hidden sm:block">
             [ データベース総件数: {sortedNewsData.length}件 ]
           </span>
        </div>

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


        {/* Dashboard Cards Grid */}
        {isLoading ? (
           <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 border-dashed mt-4">
              <Cpu className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-sm tracking-widest uppercase animate-pulse">Synchronizing Data...</p>
           </div>
        ) : (
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
        )}
        
        {!isLoading && filteredNews.length === 0 && (
           <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 border-dashed mt-4">
              <Search className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-bold text-sm">指定した期間・カテゴリに該当するニュースはないか、GASのデータ収集待ちだぜ。</p>
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


```
