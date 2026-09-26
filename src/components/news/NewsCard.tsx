import { Link } from 'react-router';
import { Clock, Eye } from 'lucide-react';
import { NewsArticle } from '../../types/news';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'compact' | 'horizontal';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatViews(views: number) {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  if (variant === 'horizontal') {
    return (
      <Link to={`/news/${article.id}`} className="flex gap-3 group">
        <div className="flex-shrink-0 w-24 h-20 bg-gray-200 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">
            {article.category}
          </span>
          <h3 className="font-display font-bold text-sm text-[#171717] leading-snug mt-0.5 group-hover:text-[#C8102E] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/news/${article.id}`} className="block group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">
          {article.category}
        </span>
        <h3 className="font-display font-bold text-sm text-[#171717] leading-snug mt-0.5 group-hover:text-[#C8102E] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{formatDate(article.publishedAt)}</p>
      </Link>
    );
  }

  return (
    <Link to={`/news/${article.id}`} className="block group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {article.isBreaking && (
          <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">
            Breaking
          </span>
        )}
        <span className="absolute top-3 right-3 bg-[#171717] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
          {article.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-[#171717] leading-snug group-hover:text-[#C8102E] transition-colors line-clamp-2 text-base">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">{article.summary}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-gray-700">{article.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {article.readingTime}m
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {formatViews(article.views)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
