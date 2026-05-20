import React, { useState, useEffect, useMemo } from 'react';
import { Newspaper, Cpu, Briefcase, ShieldAlert, Globe2, Zap, ExternalLink, X, Calendar, Layers, Rocket, Search, TrendingUp, BrainCircuit, Scale, Info, Bookmark, AlertCircle, Award, Clock, Flame, Database } from 'lucide-react';

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
  '3weeks': { label: '直近3週間', days: 21 },
  '3months': { label: '直近3ヶ月', days: 90 },
  'all': { label: 'すべて', days: 9999 }
};

export default function AIInfoGraphic() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTimeRange, setActiveTimeRange] = useState('3weeks'); 
  
  const [archiveData, setArchiveData] = useState([]);
  const [todayHighlights, setTodayHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timestamp = new Date().getTime();
    
    // publicフォルダ直下の2つのファイルを並列でロード！常にキャッシュをぶち破る。
    Promise.all([
      fetch(`/newsData.json?t=${timestamp}`).then(res => res.ok ? res.json() : []),
      fetch(`/todayHighlight.json?t=${timestamp}`).then(res => res.ok ? res.json() : [])
    ])
    .then(([archive, today]) => {
      if (Array.isArray(archive)) setArchiveData(archive);
      if (Array.isArray(today)) setTodayHighlights(today);
    })
    .catch(err => console.error("Data dynamic synchronization error:", err))
    .finally(() => setIsLoading(false));
  }, []);

  const sortedArchive = useMemo(() => {
    return [...archiveData].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [archiveData]);

  const sortedToday = useMemo(() => {
    return [...todayHighlights].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [todayHighlights]);

  const latestDateInDb = sortedArchive.length > 0 ? new Date(sortedArchive[0].date) : new Date();

  // 過去3ヶ月のアーカイブフィルタリング
  const filteredArchive = useMemo(() => {
    return sortedArchive.filter(news => {
      const matchCategory = activeCategory === 'All' || news.category === activeCategory;
      const newsDate = new Date(news.date);
      if (isNaN(newsDate.getTime())) return matchCategory;

      const diffTime = Math.abs(latestDateInDb - newsDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return matchCategory && (diffDays <= TimeRanges[activeTimeRange].days);
    });
  }, [sortedArchive, activeCategory, activeTimeRange, latestDateInDb]);

  const getImportanceBadge = (importance) => {
    switch (importance) {
      case 'critical': return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-500 text-white animate-pulse">CRITICAL</span>;
      case 'high': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">HIGH</span>;
      default: return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">MEDIUM</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-20 selection:bg-blue-500 selection:text-white">
      {/* Premium Cyber Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80 px-6 py-12 md:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
             <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20 mb-3 uppercase tracking-wider">
                <Cpu className="h-3 w-3 animate-spin" /> Intelligent Dual-Stream Engine V4
             </span>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
               AI & Global News <span className="text-blue-500 font-extrabold">Visualizer</span>
             </h1>
          </div>
          <div className="text-slate-400 text-xs max-w-xs border-l-2 border-blue-500 pl-4 py-1">
             毎朝6:00自律更新。今日だけの「特選ハイライト」と、過去3ヶ月をマクロに見る「トレンドアーカイブ」の2層構造。
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-12 mt-4">
        {isLoading ? (
           <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 border-dashed">
              <Cpu className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-sm tracking-widest uppercase animate-pulse">Dual Streams Synchronizing...</p>
           </div>
        ) : (
          <>
            {/* SECTION 1: 🔥 TODAY'S HOT HIGHLIGHTS */}
            <div className="space-y-4">
              <h2 className="text-lg font-black tracking-widest text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text flex items-center gap-2 uppercase">
                <Flame className="h-5 w-5 text-orange-500 animate-bounce" /> Today's Special Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedToday.map((news) => {
                  const catConfig = Categories[news.category] || Categories['All'];
                  return (
                    <div
                      key={`today-${news.id}`}
                      onClick={() => setSelectedNews(news)}
                      className="group relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 cursor-pointer border border-amber-500/20 hover:border-amber-500/60 shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black ${catConfig.color} ${catConfig.bg}`}>{catConfig.label}</span>
                        <div className="flex items-center gap-1.5">
                          {getImportanceBadge(news.importance)}
                          <span className="text-[10px] text-slate-500 font-bold">{news.date}</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-100 mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">{news.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{news.summary}</p>
                    </div>
                  );
                })}
              </div>
              {sortedToday.length === 0 && (
                <p className="text-xs text-slate-500 bg-slate-900/40 p-6 rounded-xl border border-slate-800 text-center">今朝のハイライトは現在データ転送待ちだぜ。</p>
              )}
            </div>

            {/* SECTION 2: 📁 HISTORICAL TREND ARCHIVE */}
            <div className="space-y-6 pt-6 border-t border-slate-900">
              <h2 className="text-lg font-black tracking-widest text-blue-400 flex items-center gap-2 uppercase">
                <Database className="h-5 w-5" /> 3-Month Trend Archive
              </h2>
              
              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-black text-slate-500 px-2">RANGE:</span>
                  {Object.entries(TimeRanges).map(([key, config]) => (
                    <button key={key} onClick={() => setActiveTimeRange(key)} className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${activeTimeRange === key ? 'text-blue-400 bg-slate-800 ring-1 ring-slate-700' : 'text-slate-400 hover:text-slate-200'}`}>{config.label}</button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 items-center sm:justify-end">
                  <span className="text-[10px] font-black text-slate-500 px-2">CAT:</span>
                  <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg p-1.5 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500">
                    {Object.entries(Categories).map(([key, config]) => <option key={key} value={key}>{config.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArchive.map((news) => {
                  const catConfig = Categories[news.category] || Categories['All'];
                  return (
                    <div key={`archive-${news.id}`} onClick={() => setSelectedNews(news)} className="group relative bg-slate-900/40 rounded-2xl p-6 cursor-pointer border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black ${catConfig.color} ${catConfig.bg}`}>{catConfig.label}</span>
                        <div className="flex items-center gap-1.5">
                          {getImportanceBadge(news.importance)}
                          <span className="text-[10px] text-slate-500 font-bold">{news.date}</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-200 mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{news.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">{news.summary}</p>
                      <div className="text-[10px] text-slate-500 font-bold pt-3 border-t border-slate-800/60 flex justify-between items-center mt-auto">
                        <span>ANALYZE_REPORT</span>
                        <ExternalLink className="h-3 w-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {filteredArchive.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-10 bg-slate-900/20 rounded-xl border border-slate-800">該当するアーカイブデータはないぜ。</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedNews && (() => {
        const catConfig = Categories[selectedNews.category] || Categories['All'];
        const paragraphs = Array.isArray(selectedNews.details) ? selectedNews.details : [selectedNews.details];
        let sourcesList = Array.isArray(selectedNews.sources) ? selectedNews.sources : [];
        if (sourcesList.length === 0) {
          sourcesList = [
            { name: "Tavily Web Search Intelligence", url: `https://tavily.com/search?q=${encodeURIComponent(selectedNews.title)}` },
            { name: "Google AI Search Grounding", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNews.title)}` }
          ];
        }

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedNews(null)}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/80 flex justify-between items-start relative">
                 <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                 <div>
                   <div className="flex flex-wrap items-center gap-2 mb-2">
                     <span className={`px-2 py-0.5 rounded text-[9px] font-black ${catConfig.color} ${catConfig.bg}`}>{catConfig.label.toUpperCase()}</span>
                     <span className="text-slate-500 text-xs font-bold flex items-center gap-1"><Calendar className="h-3 w-3" />{selectedNews.date}</span>
                     {getImportanceBadge(selectedNews.importance)}
                   </div>
                   <h2 className="text-lg md:text-xl font-black text-slate-100 leading-snug">{selectedNews.title}</h2>
                 </div>
                 <button onClick={() => setSelectedNews(null)} className="p-2 rounded-xl hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-100"><X className="h-5 w-5" /></button>
              </div>

              <div className="overflow-y-auto flex-grow bg-slate-900/40 p-6 md:p-8 custom-scrollbar space-y-6">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                   <div className="lg:col-span-8 space-y-4 text-slate-300 text-xs md:text-sm leading-loose">
                     <div className="text-blue-400 text-xs font-black tracking-widest border-b border-slate-800 pb-1">DEEP_ANALYSIS</div>
                     {paragraphs.map((paragraph, idx) => <p key={idx} className="font-medium">{paragraph}</p>)}
                   </div>
                   <div className="lg:col-span-4 space-y-4">
                     {/* 【修正点】System_Insightのスコア・メーター部分を、selectedNewsから動的に取得するように連動させたぜ！ */}
                     <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                        <div className="text-[9px] font-black tracking-wider text-slate-400 uppercase flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5 text-blue-400" /> System_Insight</div>
                        <div className="space-y-2 text-[11px] font-bold">
                           <div>
                              <div className="flex justify-between mb-0.5"><span className="text-slate-500">社会的影響度</span><span className="text-blue-400">{selectedNews.socialImpact || 75}%</span></div>
                              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden"><div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${selectedNews.socialImpact || 75}%` }}></div></div>
                           </div>
                           <div>
                              <div className="flex justify-between mb-0.5"><span className="text-slate-500">技術的新規性</span><span className="text-purple-400">{selectedNews.novelty || 70}%</span></div>
                              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden"><div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${selectedNews.novelty || 70}%` }}></div></div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 leading-relaxed font-semibold">
                        <div className="text-[9px] font-black text-slate-500 mb-1">QUICK_SUMMARY</div>
                        {selectedNews.summary}
                     </div>
                   </div>
                 </div>

                 <div className="border-t border-slate-800/80 pt-4">
                   <h3 className="text-xs font-black text-slate-400 mb-2 flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-blue-400" /> VERIFIED_SOURCES</h3>
                   <div className="flex flex-wrap gap-2">
                     {sourcesList.map((source, i) => (
                       <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/40 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-extrabold text-slate-300 hover:text-blue-400" onClick={e => e.stopPropagation()}>
                         <Globe2 className="h-3.5 w-3.5 text-slate-500" /> {source.name || 'エビデンス'} <ExternalLink className="h-3 w-3 opacity-50" />
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #020617; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
      `}} />
    </div>
  );
}
