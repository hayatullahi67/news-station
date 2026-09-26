import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface StoredCategory { id: string; name: string; color: string; }
const categories = collection(db, 'categories');
export const categoryService = {
  async getAll(): Promise<StoredCategory[]> { const snapshot = await getDocs(query(categories, orderBy('name'))); return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as StoredCategory)); },
  async create(category: Omit<StoredCategory, 'id'>) { const item = await addDoc(categories, category); return { id: item.id, ...category }; },
  async update(id: string, data: Partial<StoredCategory>) { await updateDoc(doc(db, 'categories', id), data); },
  async delete(id: string) { await deleteDoc(doc(db, 'categories', id)); },
};
