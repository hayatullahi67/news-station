import { useEffect, useState } from 'react';
import { categoryService, type StoredCategory } from '../services/categoryService';

export function useCategories() {
  const [categories, setCategories] = useState<StoredCategory[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { categoryService.getAll().then(setCategories).catch(console.error).finally(() => setLoading(false)); }, []);
  return { categories, loading };
}
