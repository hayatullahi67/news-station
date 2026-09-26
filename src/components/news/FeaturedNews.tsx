import { Link } from 'react-router';
import { Clock, Eye, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../../types/news';

interface FeaturedNewsProps {
  featured: NewsArticle;
  secondary: NewsArticle[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function FeaturedNews({ featured, secondary }: FeaturedNewsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#C8102E]" />
        <h2 className="font-display font-black text-2xl text-[#171717] uppercase tracking-wide">
          Top Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured */}
        <div className="lg:col-span-2">
          <Link to={`/news/${featured.id}`} className="block group">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
              <img
                src={featured.featuredImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {featured.isBreaking && (
                <div className="absolute top-4 left-4 bg-[#C8102E] text-white text-xs font-black uppercase tracking-widest px-3 py-1">
                  Breaking
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <span className="inline-block bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 mb-3">
                  {featured.category}
                </span>
                <h2 className="font-display font-black text-white text-xl sm:text-2xl leading-tight mb-2 sm:mb-3 group-hover:text-red-200 transition-colors line-clamp-2">
                  {featured.title}
                </h2>
                <p className="hidden sm:block text-gray-200 text-sm leading-relaxed line-clamp-2 mb-4">
                  {featured.summary}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <img
                      src={featured.author.avatar}
                      alt={featured.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-white/40"
                    />
                    <span className="font-semibold text-white">{featured.author.name}</span>
                  </div>
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {featured.readingTime}m read
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={11} /> {(featured.views / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Stories */}
        <div className="flex flex-col gap-4">
          {secondary.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="group flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0 w-28 h-24 bg-gray-200 overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C8102E]">
                  {article.category}
                </span>
                <h3 className="font-display font-bold text-[#171717] text-sm leading-snug mt-1 group-hover:text-[#C8102E] transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {article.readingTime}m</span>
                </div>
              </div>
            </Link>
          ))}

          <Link
            to="/"
            className="flex items-center justify-center gap-2 py-3 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mt-auto"
          >
            More Top Stories <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
