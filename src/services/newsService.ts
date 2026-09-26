// News service placeholder — connect to Firebase Firestore when ready
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { NewsArticle } from '../types/news';

const articles = collection(db, 'articles');
export const newsService = {
  async getAll(): Promise<NewsArticle[]> { const snapshot = await getDocs(query(articles, orderBy('publishedAt', 'desc'))); return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as NewsArticle)); },
  async getById(id: string): Promise<NewsArticle | null> { const item = await getDoc(doc(db, 'articles', id)); return item.exists() ? ({ id: item.id, ...item.data() } as NewsArticle) : null; },
  async create(article: Omit<NewsArticle, 'id'>) { await addDoc(articles, article); },
  async update(id: string, data: Partial<NewsArticle>) { await updateDoc(doc(db, 'articles', id), data); },
  async recordView(id: string) { await updateDoc(doc(db, 'articles', id), { views: increment(1) }); },
  async delete(id: string) { await deleteDoc(doc(db, 'articles', id)); },
};
