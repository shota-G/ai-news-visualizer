import React, { useState } from 'react';
import { Newspaper, Cpu, Briefcase, ShieldAlert, Globe2, Zap, ExternalLink, X, Calendar, Layers, Rocket, Search, TrendingUp, BrainCircuit, Scale, Info } from 'lucide-react';
import NewsData from './data/newsData.json';

const Categories = {
  All: { label: 'すべて', icon: Layers, color: 'text-slate-800', border: 'border-slate-800' },
  Model: { label: 'モデル・技術', icon: BrainCircuit, color: 'text-purple-600', border: 'border-purple-600' },
  Service: { label: 'サービス実装', icon: Rocket, color: 'text-blue-600', border: 'border-blue-600' },
  Business: { label: 'ビジネス・市場', icon: Briefcase, color: 'text-emerald-600', border: 'border-emerald-600' },
  Ethics: { label: '倫理・社会', icon: ShieldAlert, color: 'text-rose-600', border: 'border-rose-600' },
  Policy: { label: '政治・行政', icon: Scale, color: 'text-amber-600', border: 'border-amber-600' },
  Economy: { label: '経済動向', icon: TrendingUp, color: 'text-cyan-600', border: 'border-cyan-600' },
  Entertainment: { label: 'エンタメ', icon: Zap, color: 'text-pink-600', border: 'border-pink-600' }
};

export default function AIInfoGraphic() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // データが空、または配列じゃない場合の安全対策
  const safeNewsData = Array.isArray(NewsData) ? NewsData : [];

  const filteredNews = activeCategory === 'All'
    ? safeNewsData
    : safeNewsData.filter(news => news.category === activeCategory);

  const KeyPoints = [
    { label: '最新トピック', text: safeNewsData[0] ? safeNewsData[0].title : 'ニュースを収集中だぜ', icon: BrainCircuit, color: 'text-purple-600' },
    { label: '総件数', text: `本日の厳選ニュース: ${safeNewsData.length} 件`, icon: Layers, color: 'text-emerald-600' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 md:p-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 border-b border-slate-700 pb-6">
          <div>
             <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-widest shadow-sm">
                Latest Auto Feed
             </span>
             <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 tracking-tight">
               <Newspaper className="h-8 w-8 text-blue-400" />
               AI & Global News Visualizer
             </h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KeyPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white/90 ${point.color} shadow-sm`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{point.label}</div>
                    <div className="text-xs font-semibold text-white leading-snug mt-0.5">{point.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8 mt-4">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
           {Object.entries(Categories).map(([key, config]) => {
              const isActive = activeCategory === key;
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200
                    ${isActive 
                      ? `${config.color} ring-2 ring-offset-2 ${config.border.replace('border-', 'ring-')} bg-slate-50` 
                      : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {config.label}
                </button>
              );
           })}
        </div>

        {/* Main News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => {
            const catConfig = Categories[news.category] || Categories['All'];
            return (
              <div
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className="group bg-white rounded-2xl p-6 cursor-pointer border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${catConfig.color} bg-slate-50 border ${catConfig.border} border-opacity-20`}>
                    {catConfig.label}
                  </span>
                  <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                     <Calendar className="h-3 w-3" /> {news.date}
                  </span>
                </div>
                <h3 className="text-[17px] font-extrabold text-slate-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-grow font-medium line-clamp-3">
                  {news.summary}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    詳細を見る <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredNews.length === 0 && (
           <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-bold">ニュースを読み込み中、またはデータが空だぜ。</p>
           </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedNews && (() => {
        const catConfig = Categories[selectedNews.category] || Categories['All'];
        
        // 【重要】detailsが配列じゃない（ただの文字列）だった場合の安全ガード
        const paragraphs = Array.isArray(selectedNews.details) 
          ? selectedNews.details 
          : (typeof selectedNews.details === 'string' ? [selectedNews.details] : []);

        // 【重要】sourcesが配列じゃない場合の安全ガード
        const sourcesList = Array.isArray(selectedNews.sources) ? selectedNews.sources : [];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedNews(null)}>
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-6 md:p-8 border-b bg-slate-50 flex justify-between items-start">
                 <div>
                   <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold ${catConfig.color} border ${catConfig.border} border-opacity-30 bg-white mb-2`}>
                     {catConfig.label}
                   </span>
                   <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">{selectedNews.title}</h2>
                 </div>
                 <button onClick={() => setSelectedNews(null)} className="p-2 rounded-full hover:bg-slate-200 border border-slate-200 text-slate-500"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto flex-grow bg-white">
                 <div className="space-y-6 mb-8 text-slate-700">
                   {paragraphs.map((paragraph, idx) => (
                     <p key={idx} className="leading-loose text-[15px]">{paragraph}</p>
                   ))}
                 </div>
                 <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                   <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><Info className="h-4 w-4 text-blue-500" /> 情報ソース</h3>
                   <div className="flex flex-wrap gap-3">
                     {sourcesList.map((source, i) => (
                       <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:text-blue-700 transition-all">
                         <Globe2 className="h-4 w-4 text-slate-400" /> {source.name || 'リンク'} <ExternalLink className="h-3 w-3 opacity-50 ml-1" />
                       </a>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
