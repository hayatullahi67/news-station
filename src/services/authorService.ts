import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Author } from '../types/news';
const authors = collection(db, 'authors');
export const authorService = {
  async getAll(): Promise<Author[]> { const snapshot = await getDocs(query(authors, orderBy('name'))); return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Author)); },
  async create(author: Omit<Author, 'id'>) { const item = await addDoc(authors, author); return { id: item.id, ...author }; },
  async update(id: string, author: Omit<Author, 'id'>) { await setDoc(doc(db, 'authors', id), author, { merge: true }); return { id, ...author }; },
};
