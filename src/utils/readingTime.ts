const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): number {
  const plainText = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
