import { useEffect, useState } from 'react';
import type { NewsArticle } from '../types/news';
import { newsService } from '../services/newsService';

export function useArticles() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { newsService.getAll().then(setArticles).catch(console.error).finally(() => setLoading(false)); }, []);
  return { articles, loading, setArticles };
}
