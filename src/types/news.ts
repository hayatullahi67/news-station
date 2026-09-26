export type Category =
  | 'All'
  | 'Politics'
  | 'Business'
  | 'Sports'
  | 'Entertainment'
  | 'Technology'
  | 'General';

export type NewsStatus = 'published' | 'draft';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  status: NewsStatus;
  isBreaking: boolean;
  isFeatured: boolean;
  views: number;
  readingTime: number;
  tags: string[];
}
