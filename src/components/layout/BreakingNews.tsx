import { AlertCircle } from 'lucide-react';
import { useArticles } from '../../hooks/useArticles';

export default function BreakingNews() {
  const { articles, loading } = useArticles();
  const headlines = articles
    .filter((article) => article.status === 'published' && article.isBreaking)
    .map((article) => article.summary);

  if (!loading && headlines.length === 0) return null;

  return (
    <div className="bg-[#C8102E] text-white overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center gap-2 bg-[#8B0B1F] px-4 py-2 font-bold text-sm tracking-widest uppercase z-10">
          <AlertCircle size={14} className="animate-pulse" />
          Breaking
        </div>
        <div className="flex-1 overflow-hidden relative py-2">
          <div className="breaking-ticker whitespace-nowrap text-sm font-medium">
            {loading ? 'Loading breaking news...' : headlines.join(' • ')}
          </div>
        </div>
      </div>
    </div>
  );
}
