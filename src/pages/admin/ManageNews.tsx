import { useState } from 'react';
import { Link } from 'react-router';
import { PlusCircle, Search } from 'lucide-react';
import { Category, NewsArticle, NewsStatus } from '../../types/news';
import NewsTable from '../../components/admin/NewsTable';
import CategoryFilter from '../../components/news/CategoryFilter';
import { newsService } from '../../services/newsService';
import { useArticles } from '../../hooks/useArticles';
import { useCategories } from '../../hooks/useCategories';

const ITEMS_PER_PAGE = 6;

export default function ManageNews() {
  const { articles, setArticles, loading } = useArticles();
  const { categories } = useCategories();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | NewsStatus>('all');
  const [page, setPage] = useState(1);

  const filtered = articles.filter((a) => {
    const matchCat = category === 'All' || a.category === category;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = async (id: string) => {
    await newsService.delete(id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleStatus = async (id: string) => {
    const article = articles.find((item) => item.id === id);
    if (!article) return;
    const status = article.status === 'published' ? 'draft' : 'published';
    await newsService.update(id, { status });
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'published' ? 'draft' : 'published' }
          : a
      )
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display font-black text-2xl text-[#171717]">Manage News</h1>
          <p className="text-sm text-gray-500 mt-1">{loading ? 'Loading articles...' : `${filtered.length} articles found`}</p>
        </div>
        <Link
          to="/admin/create"
          className="flex w-full justify-center sm:w-auto items-center gap-2 bg-[#F26926] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-[#D4561A] transition-colors"
        >
          <PlusCircle size={15} /> Create Article
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles by title..."
              className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#F26926]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'published', 'draft'] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${
                  statusFilter === s
                    ? 'bg-[#171717] text-white border-[#171717]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#171717]'
                }`}
              >
                {s === 'all' ? 'All Status' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter categories={['All', ...categories.map((item) => item.name)]} active={category} onChange={(c) => { setCategory(c as Category); setPage(1); }} />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200">
        <NewsTable
          articles={paginated}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Page {page} of {totalPages} · {filtered.length} total
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs font-bold border border-gray-300 hover:border-[#171717] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 text-xs font-bold border transition-colors ${
                    page === p
                      ? 'bg-[#F26926] text-white border-[#F26926]'
                      : 'border-gray-300 hover:border-[#171717]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs font-bold border border-gray-300 hover:border-[#171717] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
