import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Clock, Eye, Calendar, ChevronRight, Share2, MessageCircle, Globe, Link2, Bookmark } from 'lucide-react';
import NewsCard from '../components/news/NewsCard';
import { useArticles } from '../hooks/useArticles';
import { newsService } from '../services/newsService';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function NewsDetails() {
  const { id } = useParams<{ id: string }>();
  const { articles, loading } = useArticles();
  const article = articles.find((a) => a.id === id && a.status === 'published');
  const [displayViews, setDisplayViews] = useState<number | null>(null);

  useEffect(() => {
    if (!article) return;
    setDisplayViews(article.views);
    const viewedKey = `article-viewed:${article.id}`;
    if (sessionStorage.getItem(viewedKey)) return;

    sessionStorage.setItem(viewedKey, 'true');
    newsService.recordView(article.id)
      .then(() => setDisplayViews(article.views + 1))
      .catch(() => sessionStorage.removeItem(viewedKey));
  }, [article]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-24 text-center text-gray-500">Loading article...</div>;

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display font-black text-4xl text-[#171717] mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/"
          className="bg-[#F26926] text-white font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[#D4561A] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const related = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-[#F26926] transition-colors font-semibold">Home</Link>
            <ChevronRight size={12} />
            <Link to="/" className="hover:text-[#F26926] transition-colors font-semibold">{article.category}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-400 line-clamp-1">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Article */}
          <div className="lg:col-span-2">
            {/* Category + Breaking */}
            <div className="flex items-center gap-3 mb-4">
              {article.isBreaking && (
                <span className="bg-[#F26926] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                  Breaking
                </span>
              )}
              <span className="border border-[#F26926] text-[#F26926] text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                {article.category}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-[#171717] text-3xl sm:text-4xl leading-tight mb-4 break-words">
              {article.title}
            </h1>

            {/* Summary */}
            <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-[#F26926] pl-4 mb-6 italic font-display">
              {article.summary}
            </p>

            {/* Author + Meta */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-t border-b border-gray-200 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F26926]"
                />
                <div>
                  <p className="font-bold text-[#171717] text-sm">{article.author.name}</p>
                  <p className="text-xs text-gray-500">{article.author.title}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:ml-auto text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {article.readingTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={13} />
                  {displayViews === null ? article.views : displayViews} views
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 bg-gray-200">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full object-cover max-h-[480px]"
              />
              <p className="text-xs text-gray-400 px-3 py-2">
                Photo related to: {article.tags.join(', ')}
              </p>
            </div>

            {/* Article Content */}
            <div className="article-content prose-custom text-[#171717] text-base leading-[1.85] font-body [&_p]:mb-5 [&_img]:max-w-full [&_img]:my-6" dangerouslySetInnerHTML={{ __html: article.content.includes('<') ? article.content : article.content.split('\n\n').map((paragraph) => `<p>${paragraph}</p>`).join('') }} />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500 mr-1">Tags:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 hover:bg-[#F26926] hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <Share2 size={14} /> Share:
                </span>
                {[
                  { Icon: MessageCircle, color: 'hover:bg-sky-500', label: 'Twitter' },
                  { Icon: Globe, color: 'hover:bg-blue-600', label: 'Facebook' },
                  { Icon: Link2, color: 'hover:bg-blue-700', label: 'LinkedIn' },
                ].map(({ Icon, color, label }) => (
                  <button
                    key={label}
                    className={`w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-500 ${color} hover:text-white hover:border-transparent transition-colors`}
                    title={label}
                  >
                    <Icon size={15} />
                  </button>
                ))}
                <button className="ml-auto flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#F26926] transition-colors">
                  <Bookmark size={14} /> Save
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Bio */}
            <div className="border-2 border-[#171717] p-5">
              <h3 className="font-black text-xs uppercase tracking-widest text-[#171717] mb-4">About the Author</h3>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-bold text-[#171717]">{article.author.name}</p>
                  <p className="text-xs text-[#F26926] font-semibold">{article.author.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {article.author.bio || 'A Crooz 106.3 FM journalist covering breaking news, investigative reports, and in-depth analysis.'}
              </p>
            </div>

            {/* Most Read */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-[#F26926]" />
                <h3 className="font-black text-xs uppercase tracking-widest text-[#171717]">Most Read</h3>
              </div>
              <div className="space-y-4">
                {[...articles].filter((a) => a.status === 'published').sort((a, b) => b.views - a.views).slice(0, 5).map((a, i) => (
                  <div key={a.id} className="flex gap-3">
                    <span className="font-display font-black text-2xl text-gray-100 leading-none w-7 flex-shrink-0">
                      {i + 1}
                    </span>
                    <Link
                      to={`/news/${a.id}`}
                      className="text-sm font-display font-bold text-[#171717] leading-snug hover:text-[#F26926] transition-colors line-clamp-2"
                    >
                      {a.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-14 pt-8 border-t-2 border-[#171717]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-[#F26926]" />
              <h2 className="font-display font-black text-2xl text-[#171717] uppercase tracking-wide">
                Related Stories
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
