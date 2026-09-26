import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { Category } from '../../types/news';
import { categoryService } from '../../services/categoryService';
import { useArticles } from '../../hooks/useArticles';

interface CategoryItem {
  id: string;
  name: Category;
  color: string;
  count: number;
}

const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'];

export default function Categories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [inputName, setInputName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { articles } = useArticles();

  useEffect(() => { categoryService.getAll().then((items) => setCategories(items.map((item) => ({ ...item, name: item.name as Category, count: articles.filter((article) => article.category === item.name).length })))).catch(console.error).finally(() => setLoading(false)); }, [articles]);

  const openAdd = () => {
    setEditId(null);
    setInputName('');
    setModalOpen(true);
  };

  const openEdit = (cat: CategoryItem) => {
    setEditId(cat.id);
    setInputName(cat.name);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!inputName.trim()) return;
    if (editId) {
      await categoryService.update(editId, { name: inputName.trim() });
      setCategories((prev) => prev.map((c) => (c.id === editId ? { ...c, name: inputName.trim() as Category } : c)));
    } else {
      const color = colors[categories.length % colors.length];
      const created = await categoryService.create({ name: inputName.trim(), color });
      setCategories((prev) => [...prev, { ...created, name: created.name as Category, count: 0 }]);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      await categoryService.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display font-black text-2xl text-[#171717]">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">{loading ? 'Loading categories...' : 'Manage news categories and their articles.'}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex w-full justify-center sm:w-auto items-center gap-2 bg-[#C8102E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-[#A00D24] transition-colors"
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-96 text-sm">
          <thead>
            <tr className="border-b-2 border-[#171717]">
              <th className="text-left py-3 px-6 text-xs font-black uppercase tracking-widest text-[#171717]">Category</th>
              <th className="text-left py-3 px-6 text-xs font-black uppercase tracking-widest text-[#171717] hidden sm:table-cell">Articles</th>
              <th className="text-right py-3 px-6 text-xs font-black uppercase tracking-widest text-[#171717]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                    <span className="font-display font-bold text-[#171717]">{cat.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 hidden sm:table-cell">
                  <span className="text-gray-500">{cat.count} articles</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-1.5 text-gray-500 hover:text-[#171717] hover:bg-gray-100 transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className={`p-1.5 transition-colors ${
                        deleteConfirm === cat.id
                          ? 'text-[#C8102E] bg-red-50'
                          : 'text-gray-500 hover:text-[#C8102E] hover:bg-red-50'
                      }`}
                      title={deleteConfirm === cat.id ? 'Click again to confirm' : 'Delete'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && categories.length === 0 && <p className="px-6 py-10 text-center text-sm text-gray-500">No categories yet. Add your first category.</p>}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white border-2 border-[#171717] p-4 sm:p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-black text-lg text-[#171717]">
                {editId ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="e.g. Science & Health"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="w-full border-2 border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#C8102E] text-white font-bold uppercase tracking-widest text-xs py-3 hover:bg-[#A00D24] transition-colors"
                >
                  <Check size={14} /> {editId ? 'Save Changes' : 'Add Category'}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-bold uppercase tracking-widest text-xs py-3 hover:border-[#171717] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
