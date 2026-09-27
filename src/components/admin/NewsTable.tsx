import { useState } from 'react';
import { Edit2, Eye, Trash2, MoreVertical, CheckCircle, Clock } from 'lucide-react';
import { NewsArticle } from '../../types/news';
import { Link } from 'react-router';

interface NewsTableProps {
  articles: NewsArticle[];
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export default function NewsTable({ articles, onDelete, onToggleStatus }: NewsTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDelete?.(id);
      setDeleteConfirm(null);
      setOpenMenu(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-[#171717]">
            <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-[#171717]">Article</th>
            <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-[#171717] hidden md:table-cell">Category</th>
            <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-[#171717] hidden lg:table-cell">Author</th>
            <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-[#171717]">Status</th>
            <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-widest text-[#171717] hidden md:table-cell">Date</th>
            <th className="text-right py-3 px-4 text-xs font-black uppercase tracking-widest text-[#171717]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              {/* Article */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-14 h-12 bg-gray-200 overflow-hidden hidden sm:block">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-[#171717] text-sm leading-snug line-clamp-2">
                      {article.title}
                    </p>
                    {article.isBreaking && (
                      <span className="text-[10px] font-bold text-[#F26926] uppercase tracking-wider">Breaking</span>
                    )}
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="py-3 px-4 hidden md:table-cell">
                <span className="inline-block bg-gray-100 text-[#171717] text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                  {article.category}
                </span>
              </td>

              {/* Author */}
              <td className="py-3 px-4 hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-700">{article.author.name}</span>
                </div>
              </td>

              {/* Status */}
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${
                    article.status === 'published'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  {article.status === 'published' ? <CheckCircle size={10} /> : <Clock size={10} />}
                  {article.status}
                </span>
              </td>

              {/* Date */}
              <td className="py-3 px-4 hidden md:table-cell text-xs text-gray-500">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>

              {/* Actions */}
              <td className="py-3 px-4 text-right">
                <div className="relative inline-block">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/admin/edit/${article.id}`}
                      className="p-1.5 text-gray-500 hover:text-[#171717] hover:bg-gray-100 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <Link
                      to={`/news/${article.id}`}
                      className="p-1.5 text-gray-500 hover:text-[#171717] hover:bg-gray-100 transition-colors"
                      title="Preview"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      onClick={() => setOpenMenu(openMenu === article.id ? null : article.id)}
                      className="p-1.5 text-gray-500 hover:text-[#171717] hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {openMenu === article.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 shadow-lg z-10 min-w-40 py-1">
                      <button
                        onClick={() => { onToggleStatus?.(article.id); setOpenMenu(null); }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 text-gray-700 font-semibold"
                      >
                        {article.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold ${
                          deleteConfirm === article.id
                            ? 'bg-red-50 text-[#F26926]'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {deleteConfirm === article.id ? 'Confirm Delete?' : 'Delete'}
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Trash2 size={32} className="mx-auto mb-3 text-gray-300" />
          <p className="font-display text-lg">No articles found</p>
        </div>
      )}
    </div>
  );
}
