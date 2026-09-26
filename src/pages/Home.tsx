import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router';
import { TrendingUp, Radio, Newspaper, AlertCircle } from 'lucide-react';
import BreakingNews from '../components/layout/BreakingNews';
import FeaturedNews from '../components/news/FeaturedNews';
import NewsGrid from '../components/news/NewsGrid';
import CategoryFilter from '../components/news/CategoryFilter';
import NewsCard from '../components/news/NewsCard';
import { NewsArticle } from '../types/news';
import { useArticles } from '../hooks/useArticles';
import { useCategories } from '../hooks/useCategories';

export default function Home() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const { articles, loading } = useArticles();
  const { categories } = useCategories();
  const publishedArticles = articles.filter((article) => article.status === 'published');

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category');
  const showAllStories = searchParams.get('all') === 'true';

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const featured = publishedArticles.find((a) => a.isFeatured) ?? publishedArticles[0];
  const secondary = publishedArticles.filter((a) => a.id !== featured?.id).slice(0, 3);
  const trendingArticles = [...publishedArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  const filteredArticles: NewsArticle[] = publishedArticles.filter((a) => {
    const matchesCategory = !activeCategory || a.category === activeCategory;
    const matchesSearch = searchQuery
      ? a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setVisibleCount(showAllStories ? Number.MAX_SAFE_INTEGER : 6);
  }, [activeCategory, searchQuery, showAllStories]);

  // Handle hash scrolling when navigated from another page or direct link
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

  return (
    <div id="home">
      <BreakingNews />

      {searchQuery ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#C8102E]" />
            <h2 className="font-display font-black text-2xl text-[#171717] uppercase tracking-wide">
              Search: "{searchQuery}"
            </h2>
          </div>
          <NewsGrid articles={filteredArticles} emptyMessage={`No articles found for "${searchQuery}"`} />
        </div>
      ) : (
        <>
          {loading ? <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Loading the latest news...</div> : featured ? <FeaturedNews featured={featured} secondary={secondary} /> : <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">No published stories yet.</div>}

          {/* Latest News */}
          <section id="latest-news" className="bg-[#F5F5F5] py-10 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#C8102E]" />
                  <h2 className="font-display font-black text-2xl text-[#171717] uppercase tracking-wide">
                    Latest News
                  </h2>
                </div>
              </div>

              {/* Category Filter */}
              <div id="categories" className="mb-6 scroll-mt-24">
                <CategoryFilter categories={categories.map((category) => category.name)} active={activeCategory} onChange={setActiveCategory} />
              </div>

              <NewsGrid articles={filteredArticles.slice(0, visibleCount)} emptyMessage="No articles in this category yet." />

              {visibleCount < filteredArticles.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCount((c) => c + 3)}
                    className="bg-[#171717] text-white font-bold uppercase tracking-widest text-xs px-8 py-3 hover:bg-[#C8102E] transition-colors"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Trending Section */}
          <section id="trending" className="py-10 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trending List */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-[#C8102E]" />
                    <h2 className="font-display font-black text-2xl text-[#171717] uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#C8102E]" /> Trending
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {trendingArticles.map((article, index) => (
                      <div key={article.id} className="flex gap-4 items-start group">
                        <span className="font-display font-black text-4xl text-[#C8102E] leading-none flex-shrink-0 w-10 text-center">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <NewsCard article={article} variant="compact" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* News at a Glance */}
                <div>
                  <div className="bg-[#171717] p-6 text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <Radio size={18} className="text-[#C8102E]" />
                      <h3 className="font-display font-black text-lg uppercase tracking-wide">News at a Glance</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">A live snapshot of what is happening in the newsroom right now.</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-t border-white/15 pt-3">
                        <span className="flex items-center gap-2 text-sm text-gray-300"><Newspaper size={15} className="text-[#C8102E]" /> Published stories</span>
                        <span className="font-display text-xl font-black text-white">{publishedArticles.length}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/15 pt-3">
                        <span className="flex items-center gap-2 text-sm text-gray-300"><AlertCircle size={15} className="text-[#C8102E]" /> Breaking now</span>
                        <span className="font-display text-xl font-black text-white">{publishedArticles.filter((article) => article.isBreaking).length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
