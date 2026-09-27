import { useEffect, useState, useRef } from 'react';
import { Upload, X, Bold, Italic, AlignLeft, List, Link as LinkIcon, ImagePlus } from 'lucide-react';
import { Category, NewsStatus } from '../../types/news';
import { uploadImage } from '../../services/cloudinary';
import { authorService } from '../../services/authorService';
import type { Author } from '../../types/news';
import { useCategories } from '../../hooks/useCategories';

export interface NewsFormData {
  title: string;
  summary: string;
  content: string;
  category: Category;
  author: string;
  authorId: string;
  authorTitle: string;
  authorBio: string;
  authorAvatar: string | null;
  publishDate: string;
  status: NewsStatus;
  isBreaking: boolean;
  isFeatured: boolean;
  imagePreview: string | null;
}

interface NewsFormProps {
  initialData?: Partial<NewsFormData>;
  onSaveDraft?: (data: NewsFormData) => Promise<void> | void;
  onPublish?: (data: NewsFormData) => Promise<void> | void;
}

const defaultData: NewsFormData = {
  title: '',
  summary: '',
  content: '',
  category: '' as Category,
  author: '',
  authorId: '',
  authorTitle: '',
  authorBio: '',
  authorAvatar: null,
  publishDate: new Date().toISOString().split('T')[0],
  status: 'draft',
  isBreaking: false,
  isFeatured: false,
  imagePreview: null,
};

export default function NewsForm({ initialData, onSaveDraft, onPublish }: NewsFormProps) {
  const [form, setForm] = useState<NewsFormData>({ ...defaultData, ...initialData });
  const [dragOver, setDragOver] = useState(false);
  const [saved, setSaved] = useState<'draft' | 'published' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const inlineImageRef = useRef<HTMLInputElement>(null);
  const [uploadingInlineImage, setUploadingInlineImage] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [savedAuthors, setSavedAuthors] = useState<Author[]>([]);
  const [addingAuthor, setAddingAuthor] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authorImageRef = useRef<HTMLInputElement>(null);
  const { categories: savedCategories } = useCategories();

  useEffect(() => { if (initialData) setForm({ ...defaultData, ...initialData }); }, [initialData]);

  // A contentEditable element must not be re-rendered on every keystroke: doing
  // so moves the caret and can make Backspace behave unpredictably. Only load
  // supplied article content when the editor is opened for editing.
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (initialData?.content || '')) {
      editorRef.current.innerHTML = initialData?.content || '';
    }
  }, [initialData?.content]);

  useEffect(() => { if (!form.category && savedCategories[0]) update('category', savedCategories[0].name as Category); }, [savedCategories, form.category]);

  useEffect(() => { authorService.getAll().then(setSavedAuthors).catch(console.error); }, []);

  const update = (key: keyof NewsFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => update('imagePreview', e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAuthorImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => update('authorAvatar', event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const selectAuthor = (id: string) => {
    if (id === 'new') { setAddingAuthor(true); update('authorId', ''); update('author', ''); update('authorTitle', ''); update('authorBio', ''); update('authorAvatar', null); return; }
    const author = savedAuthors.find((item) => item.id === id);
    if (!author) return;
    setAddingAuthor(true); update('authorId', author.id); update('author', author.name); update('authorTitle', author.title); update('authorBio', author.bio || ''); update('authorAvatar', author.avatar);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageFile(file);
  };

  const formatText = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command);
    update('content', editorRef.current?.innerHTML ?? form.content);
  };

  const insertInlineImage = async (file: File) => {
    setUploadingInlineImage(true);
    try {
      const url = await uploadImage(file, 'articles');
      editorRef.current?.focus();
      document.execCommand('insertImage', false, url);
      update('content', editorRef.current?.innerHTML ?? form.content);
    } finally { setUploadingInlineImage(false); }
  };

  const handleEditorPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const html = event.clipboardData.getData('text/html');
    const plainText = event.clipboardData.getData('text/plain');
    const source = new DOMParser().parseFromString(html || plainText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>'), 'text/html');
    source.querySelectorAll('script, iframe, object, embed, style').forEach((element) => element.remove());
    source.body.querySelectorAll<HTMLElement>('*').forEach((element) => {
      element.removeAttribute('bgcolor');
      Array.from(element.attributes).filter((attribute) => attribute.name.toLowerCase().startsWith('on')).forEach((attribute) => element.removeAttribute(attribute.name));
      element.style.removeProperty('background');
      element.style.removeProperty('background-color');
      element.style.removeProperty('background-image');
      element.style.removeProperty('color');
      element.removeAttribute('color');
    });
    editorRef.current?.focus();
    document.execCommand('insertHTML', false, source.body.innerHTML);
    update('content', editorRef.current?.innerHTML ?? form.content);
  };

  const handleSaveDraft = async () => {
    try { setIsSubmitting(true); setSubmitError(''); await onSaveDraft?.(form); setSaved('draft'); setTimeout(() => setSaved(null), 3000); }
    catch (error) { setSubmitError(error instanceof Error ? error.message : 'Unable to save draft.'); }
    finally { setIsSubmitting(false); }
  };

  const handlePublish = async () => {
    try { setIsSubmitting(true); setSubmitError(''); await onPublish?.({ ...form, status: 'published' }); setSaved('published'); setTimeout(() => setSaved(null), 3000); }
    catch (error) { setSubmitError(error instanceof Error ? error.message : 'Unable to publish article.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Main Editor */}
      <div className="flex-1 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">
            Article Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Enter a compelling headline..."
            className="w-full border-2 border-gray-200 focus:border-[#F26926] outline-none px-4 py-3 font-display font-bold text-xl text-[#171717] transition-colors"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">
            Article Summary *
          </label>
          <textarea
            value={form.summary}
            onChange={(e) => update('summary', e.target.value)}
            placeholder="Write a brief summary of the article (2-3 sentences)..."
            rows={3}
            className="w-full border-2 border-gray-200 focus:border-[#F26926] outline-none px-4 py-3 text-sm text-gray-700 resize-none transition-colors"
          />
        </div>

        {/* Rich Text-style Content */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">
            Article Content *
          </label>
          <div className="border-2 border-gray-200 focus-within:border-[#F26926] transition-colors">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50">
              {[
                { Icon: Bold, command: 'bold', label: 'Bold' },
                { Icon: Italic, command: 'italic', label: 'Italic' },
                { Icon: AlignLeft, command: 'justifyLeft', label: 'Align left' },
                { Icon: List, command: 'insertUnorderedList', label: 'Bullet list' },
              ].map(({ Icon, command, label }) => (
                <button
                  key={command}
                  type="button"
                  title={label}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => formatText(command)}
                  className="p-1.5 text-gray-500 hover:text-[#171717] hover:bg-gray-200 transition-colors"
                >
                  <Icon size={14} />
                </button>
              ))}
              <button type="button" title="Insert image" onClick={() => inlineImageRef.current?.click()} className="p-1.5 text-gray-500 hover:text-[#171717] hover:bg-gray-200 transition-colors"><ImagePlus size={14} /></button>
              <input ref={inlineImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void insertInlineImage(file); e.target.value = ''; }} />
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <span className="basis-full sm:basis-auto text-xs text-gray-400">{uploadingInlineImage ? 'Uploading image...' : 'Format text or insert an image'}</span>
            </div>
            <div ref={editorRef} contentEditable suppressContentEditableWarning onPaste={handleEditorPaste} onInput={(e) => update('content', e.currentTarget.innerHTML)} data-placeholder="Write your full article content here..." className="article-editor min-h-80 px-4 py-4 text-sm text-gray-700 outline-none leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 [&_img]:max-w-full [&_img]:my-4" />
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">
            Featured Image
          </label>
          {form.imagePreview ? (
            <div className="relative">
              <img
                src={form.imagePreview}
                alt="Preview"
                className="w-full h-56 object-cover"
              />
              <button
                onClick={() => update('imagePreview', null)}
                className="absolute top-3 right-3 bg-white text-[#171717] p-1.5 shadow hover:bg-red-50 hover:text-[#F26926] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed cursor-pointer flex flex-col items-center justify-center py-12 transition-colors ${
                dragOver ? 'border-[#F26926] bg-red-50' : 'border-gray-300 hover:border-[#F26926] hover:bg-gray-50'
              }`}
            >
              <Upload size={28} className="text-gray-400 mb-3" />
              <p className="text-sm font-semibold text-gray-600">Drop image here or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageFile(file);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Settings */}
      <div className="lg:w-72 space-y-5">
        {/* Publish Settings */}
        <div className="border-2 border-[#171717] p-5">
          <h3 className="font-black text-xs uppercase tracking-widest text-[#171717] mb-4">Publish Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value as NewsStatus)}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F26926]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Publish Date</label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) => update('publishDate', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F26926]"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <div>
                <p className="text-sm font-bold text-[#171717]">Breaking News</p>
                <p className="text-xs text-gray-500">Show in breaking ticker</p>
              </div>
              <button
                type="button"
                onClick={() => update('isBreaking', !form.isBreaking)}
                className={`w-11 h-6 rounded-full transition-colors relative ${form.isBreaking ? 'bg-[#F26926]' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${form.isBreaking ? 'translate-x-5' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <div>
                <p className="text-sm font-bold text-[#171717]">Featured Story</p>
                <p className="text-xs text-gray-500">Show in hero section</p>
              </div>
              <button
                type="button"
                onClick={() => update('isFeatured', !form.isFeatured)}
                className={`w-11 h-6 rounded-full transition-colors relative ${form.isFeatured ? 'bg-[#F26926]' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${form.isFeatured ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>

          {saved && (
            <div className={`mt-4 px-3 py-2 text-xs font-bold text-center ${saved === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
              {saved === 'published' ? '✓ Article published!' : '✓ Draft saved!'}
            </div>
          )}
          {submitError && <p className="mt-3 text-xs font-semibold text-[#F26926] leading-relaxed">{submitError}</p>}

          <div className="mt-5 space-y-2">
            <button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="w-full bg-[#F26926] text-white font-bold uppercase tracking-widest text-xs py-3 hover:bg-[#D4561A] disabled:opacity-60 transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Publish Now'}
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="w-full border-2 border-[#171717] text-[#171717] font-bold uppercase tracking-widest text-xs py-2.5 hover:bg-[#171717] hover:text-white disabled:opacity-60 transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
          </div>
        </div>

        {/* Article Details */}
        <div className="border border-gray-200 p-5 space-y-4">
          <h3 className="font-black text-xs uppercase tracking-widest text-[#171717]">Article Details</h3>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Category *</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value as Category)}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F26926]"
            >
              {savedCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Article Author *</label>
            {savedAuthors.length > 0 && <select onChange={(e) => selectAuthor(e.target.value)} defaultValue="new" className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F26926] mb-3"><option value="new">+ Add a new author</option>{savedAuthors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}</select>}
            <input type="text" value={form.author} onChange={(e) => update('author', e.target.value)} placeholder="Author full name" className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F26926]" />
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-[#171717]">Author Profile</p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => authorImageRef.current?.click()} className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                {form.authorAvatar ? <img src={form.authorAvatar} alt="Author preview" className="w-full h-full object-cover" /> : <Upload size={15} className="text-gray-400" />}
              </button>
              <div className="min-w-0"><p className="text-xs font-semibold text-gray-700">Author photo</p><p className="text-[11px] text-gray-400">Upload a profile image</p></div>
              <input ref={authorImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleAuthorImage(file); }} />
            </div>
            <input type="text" value={form.authorTitle} onChange={(e) => update('authorTitle', e.target.value)} placeholder="Role, e.g. News Reporter" className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F26926]" />
            <textarea value={form.authorBio} onChange={(e) => update('authorBio', e.target.value)} placeholder="Short author bio (shown on the article page)" rows={4} className="w-full border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#F26926]" />
          </div>
        </div>
      </div>
    </div>
  );
}
