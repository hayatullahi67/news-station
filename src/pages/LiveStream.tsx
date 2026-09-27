import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Radio } from 'lucide-react';
import LiveStreamPlayer from '../components/live/LiveStreamPlayer';
import { getLiveStreamUrl } from '../utils/liveStream';
import { useArticles } from '../hooks/useArticles';
import NewsCard from '../components/news/NewsCard';

export default function LiveStream() {
  const [streamUrl, setStreamUrl] = useState(getLiveStreamUrl);
  const { articles, loading } = useArticles();

  useEffect(() => {
    const updateStream = () => setStreamUrl(getLiveStreamUrl());
    window.addEventListener('crooz-live-stream-updated', updateStream);
    window.addEventListener('storage', updateStream);
    return () => {
      window.removeEventListener('crooz-live-stream-updated', updateStream);
      window.removeEventListener('storage', updateStream);
    };
  }, []);

  const topStories = articles
    .filter((article) => article.status === 'published')
    .sort((left, right) => {
      const priority = Number(right.isBreaking) - Number(left.isBreaking)
        || Number(right.isFeatured) - Number(left.isFeatured);
      return priority || new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
    })
    .slice(0, 4);

  return (
    <div className="bg-[#F5F5F5] min-h-full py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-[#F26926] text-white text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live
          </div>
          <h1 className="font-display font-black text-4xl text-[#171717]">Listen Live</h1>
          <p className="text-gray-600 mt-2 flex items-center justify-center gap-2"><Radio size={16} className="text-[#F26926]" /> Crooz 106.3 FM, Owerri</p>
        </div>
        <LiveStreamPlayer streamUrl={streamUrl} />
        <p className="text-center text-xs text-gray-500 mt-5">For the best listening experience, keep this page open while you listen.</p>

        <section className="mt-12" aria-labelledby="top-stories-heading">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#F26926]" />
              <h2 id="top-stories-heading" className="font-display font-black text-2xl text-[#171717] uppercase tracking-wide">Top Stories</h2>
            </div>
            <Link to="/news" className="text-xs font-bold uppercase tracking-widest text-[#F26926] hover:text-[#171717] transition-colors">View all news</Link>
          </div>
          {loading ? <p className="py-8 text-center text-sm text-gray-500">Loading top stories...</p> : topStories.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {topStories.map((article) => <NewsCard key={article.id} article={article} variant="horizontal" />)}
            </div>
          ) : <p className="py-8 text-center text-sm text-gray-500">Top stories will appear here soon.</p>}
        </section>
      </div>
    </div>
  );
}
