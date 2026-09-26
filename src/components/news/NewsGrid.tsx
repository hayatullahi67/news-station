import { NewsArticle } from '../../types/news';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
  emptyMessage?: string;
}

export default function NewsGrid({ articles, emptyMessage = 'No articles found.' }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="font-display text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
