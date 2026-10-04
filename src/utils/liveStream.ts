export const LIVE_STREAM_STORAGE_KEY = 'crooz-live-stream-url-v2';
export const DEFAULT_LIVE_STREAM_URL = 'https://stream.zeno.fm/ptx4zh3sy7zuv';

export function getLiveStreamUrl() {
  return localStorage.getItem(LIVE_STREAM_STORAGE_KEY)?.trim() || DEFAULT_LIVE_STREAM_URL;
}

export function saveLiveStreamUrl(url: string) {
  localStorage.setItem(LIVE_STREAM_STORAGE_KEY, url.trim());
  window.dispatchEvent(new Event('crooz-live-stream-updated'));
}
