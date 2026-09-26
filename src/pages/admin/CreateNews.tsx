import { Link, useParams } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import NewsForm from '../../components/admin/NewsForm';
import type { NewsFormData } from '../../components/admin/NewsForm';
import { authorService } from '../../services/authorService';
import { newsService } from '../../services/newsService';
import { uploadImage } from '../../services/cloudinary';
import type { Author, NewsStatus } from '../../types/news';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getReadingTime } from '../../utils/readingTime';

export default function CreateNews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [existingArticle, setExistingArticle] = useState<import('../../types/news').NewsArticle | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!id) return;
    newsService.getById(id).then((article) => {
      if (!article) throw new Error('Article not found.');
      setExistingArticle(article);
    }).catch((error) => setLoadError(error instanceof Error ? error.message : 'Unable to load this article.'))
      .finally(() => setLoading(false));
  }, [id]);

  const dataUrlToFile = async (value: string, name: string) => {
    const response = await fetch(value); return new File([await response.blob()], name, { type: response.headers.get('content-type') || 'image/jpeg' });
  };
  const uploadIfNew = async (value: string | null, name: string, folder: 'articles' | 'authors') => {
    if (!value || !value.startsWith('data:')) return value || '';
    return uploadImage(await dataUrlToFile(value, name), folder);
  };
  const saveArticle = async (form: NewsFormData, status: NewsStatus) => {
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim() || !form.author.trim() || !form.category) throw new Error('Please complete the article, category, and author details.');
    let author: Author;
    const avatar = await uploadIfNew(form.authorAvatar, 'author.jpg', 'authors');
    if (form.authorId) {
      author = { id: form.authorId, name: form.author.trim(), title: form.authorTitle.trim() || 'Reporter', bio: form.authorBio.trim(), avatar };
      await authorService.update(author.id, { name: author.name, title: author.title, bio: author.bio, avatar: author.avatar });
    }
    else {
      author = await authorService.create({ name: form.author.trim(), title: form.authorTitle.trim() || 'Reporter', bio: form.authorBio.trim(), avatar });
    }
    const featuredImage = await uploadIfNew(form.imagePreview, 'article.jpg', 'articles');
    const now = new Date().toISOString();
    const articleData = { title: form.title.trim(), summary: form.summary.trim(), content: form.content, category: form.category, author, featuredImage, status, isBreaking: form.isBreaking, isFeatured: form.isFeatured, publishedAt: `${form.publishDate}T00:00:00.000Z`, updatedAt: now, readingTime: getReadingTime(form.content) };
    if (id && existingArticle) await newsService.update(id, articleData);
    else await newsService.create({ ...articleData, views: 0, tags: [] });
    navigate('/admin/manage');
  };
  const initialData = existingArticle ? {
    title: existingArticle.title, summary: existingArticle.summary, content: existingArticle.content, category: existingArticle.category,
    author: existingArticle.author.name, authorId: existingArticle.author.id, authorTitle: existingArticle.author.title,
    authorBio: existingArticle.author.bio || '', authorAvatar: existingArticle.author.avatar || null,
    publishDate: existingArticle.publishedAt.slice(0, 10), status: existingArticle.status, isBreaking: existingArticle.isBreaking,
    isFeatured: existingArticle.isFeatured, imagePreview: existingArticle.featuredImage || null,
  } : undefined;

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading article...</div>;
  if (loadError) return <div className="p-6 text-sm font-semibold text-[#C8102E]">{loadError}</div>;
  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <Link
          to="/admin/manage"
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#C8102E] transition-colors uppercase tracking-widest"
        >
          <ChevronLeft size={14} /> Back
        </Link>
        <div>
          <h1 className="font-display font-black text-2xl text-[#171717]">{id ? 'Edit Article' : 'Create Article'}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{id ? 'Update and publish this news article.' : 'Write and publish a new news article.'}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-4 sm:p-6">
        <NewsForm initialData={initialData} onSaveDraft={(form) => saveArticle(form, 'draft')} onPublish={(form) => saveArticle(form, 'published')} />
      </div>
    </div>
  );
}
