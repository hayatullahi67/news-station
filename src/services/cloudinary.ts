declare const __CLOUDINARY_PUBLIC_CONFIG__: { cloudName?: string; collectionName?: string; uploadPreset?: string };
const cloudName = __CLOUDINARY_PUBLIC_CONFIG__.cloudName || 'djwescjtg';
const collectionName = __CLOUDINARY_PUBLIC_CONFIG__.collectionName || 'Crooz';
const uploadPreset = __CLOUDINARY_PUBLIC_CONFIG__.uploadPreset;

export async function uploadImage(file: File, folder: 'articles' | 'authors' = 'articles') {
  if (!uploadPreset) throw new Error('Cloudinary upload preset is not configured. Add CLOUDINARY_UPLOAD_PRESET to .env.');
  const form = new FormData();
  // Cloudinary uploads require a folder; use the requested collection name as its root folder.
  form.append('file', file); form.append('upload_preset', uploadPreset); form.append('folder', `${collectionName}/${folder}`);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Image upload failed.');
  return data.secure_url as string;
}
