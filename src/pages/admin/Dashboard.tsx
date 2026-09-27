import { Link } from 'react-router';
import { Newspaper, CheckCircle, FileEdit, Eye, TrendingUp, PlusCircle, BarChart3 } from 'lucide-react';
import NewsTable from '../../components/admin/NewsTable';
import { useArticles } from '../../hooks/useArticles';

// Simple bar chart data
const activityData = [
  { day: 'Mon', value: 8 },
  { day: 'Tue', value: 14 },
  { day: 'Wed', value: 6 },
  { day: 'Thu', value: 18 },
  { day: 'Fri', value: 12 },
  { day: 'Sat', value: 4 },
  { day: 'Sun', value: 7 },
];
const maxActivity = Math.max(...activityData.map((d) => d.value));

export default function Dashboard() {
  const { articles, loading } = useArticles();
  const published = articles.filter((article) => article.status === 'published');
  const drafts = articles.filter((article) => article.status === 'draft');
  const totalViews = articles.reduce((total, article) => total + article.views, 0);
  const stats = [
    { label: 'Total Articles', value: articles.length.toString(), icon: Newspaper, delta: 'In your newsroom', color: 'bg-blue-50 text-blue-600' },
    { label: 'Published', value: published.length.toString(), icon: CheckCircle, delta: 'Visible on the website', color: 'bg-green-50 text-green-600' },
    { label: 'Drafts', value: drafts.length.toString(), icon: FileEdit, delta: 'Pending publication', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, delta: 'Across all articles', color: 'bg-red-50 text-red-600' },
  ];
  const mostViewed = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display font-black text-2xl text-[#171717]">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">{loading ? 'Loading newsroom data...' : "Welcome back. Here's what's happening today."}</p>
        </div>
        <Link
          to="/admin/create"
          className="flex w-full justify-center sm:w-auto items-center gap-2 bg-[#F26926] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-[#D4561A] transition-colors"
        >
          <PlusCircle size={15} /> New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, delta, color }) => (
          <div key={label} className="min-w-0 bg-white border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">{label}</p>
              <div className={`w-9 h-9 rounded-sm flex items-center justify-center ${color}`}>
                <Icon size={17} />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-[#171717]">{value}</p>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <TrendingUp size={11} /> {delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={16} className="text-[#F26926]" />
            <h2 className="font-black text-xs uppercase tracking-widest text-[#171717]">Publishing Activity — This Week</h2>
          </div>
          <div className="flex items-end gap-3 h-40">
            {activityData.map(({ day, value }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-gray-600">{value}</span>
                <div
                  className="w-full bg-[#F26926] transition-all duration-500 hover:bg-[#171717]"
                  style={{ height: `${(value / maxActivity) * 100}%`, minHeight: '4px' }}
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Eye size={16} className="text-[#F26926]" />
            <h2 className="font-black text-xs uppercase tracking-widest text-[#171717]">Most Viewed</h2>
          </div>
          <div className="space-y-4">
            {mostViewed.map((article, i) => (
              <div key={article.id} className="flex gap-3">
                <span className="font-display font-black text-xl text-gray-100 w-7 flex-shrink-0">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#171717] leading-snug line-clamp-2 font-display">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {(article.views / 1000).toFixed(1)}k views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Articles Table */}
      <div className="bg-white border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-xs uppercase tracking-widest text-[#171717]">Recent Articles</h2>
          <Link to="/admin/manage" className="text-xs font-bold text-[#F26926] hover:text-[#171717] uppercase tracking-widest transition-colors">
            View All →
          </Link>
        </div>
        <NewsTable articles={articles.slice(0, 5)} />
      </div>
    </div>
  );
}
