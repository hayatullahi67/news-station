export const LIVE_STREAM_STORAGE_KEY = 'crooz-live-stream-url-v2';
export const DEFAULT_LIVE_STREAM_URL = 'https://wazobiafmlagos951-atunwadigital.streamguys1.com/wazobiafmlagos951?utm_source=chatgpt.com';

export function getLiveStreamUrl() {
  return localStorage.getItem(LIVE_STREAM_STORAGE_KEY)?.trim() || DEFAULT_LIVE_STREAM_URL;
}

export function saveLiveStreamUrl(url: string) {
  localStorage.setItem(LIVE_STREAM_STORAGE_KEY, url.trim());
  window.dispatchEvent(new Event('crooz-live-stream-updated'));
}
