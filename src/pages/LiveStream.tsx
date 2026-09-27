import { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';
import LiveStreamPlayer from '../components/live/LiveStreamPlayer';
import { getLiveStreamUrl } from '../utils/liveStream';

export default function LiveStream() {
  const [streamUrl, setStreamUrl] = useState(getLiveStreamUrl);

  useEffect(() => {
    const updateStream = () => setStreamUrl(getLiveStreamUrl());
    window.addEventListener('crooz-live-stream-updated', updateStream);
    window.addEventListener('storage', updateStream);
    return () => {
      window.removeEventListener('crooz-live-stream-updated', updateStream);
      window.removeEventListener('storage', updateStream);
    };
  }, []);

  return (
    <div className="bg-[#F5F5F5] min-h-full py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-[#F26926] text-white text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live
          </div>
          <h1 className="font-display font-black text-4xl text-[#171717]">Listen Live</h1>
          <p className="text-gray-600 mt-2 flex items-center justify-center gap-2"><Radio size={16} className="text-[#F26926]" /> Crooz 106.3 FM, Owerri</p>
        </div>
        <LiveStreamPlayer streamUrl={streamUrl} />
        <p className="text-center text-xs text-gray-500 mt-5">For the best listening experience, keep this page open while you listen.</p>
      </div>
    </div>
  );
}
