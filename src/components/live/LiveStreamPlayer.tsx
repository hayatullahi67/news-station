import { useEffect, useMemo, useRef, useState } from 'react';
import Hls from 'hls.js';
import { AlertCircle, Headphones, Radio, Video } from 'lucide-react';

type StreamType = 'audio' | 'video' | 'hls' | 'embed' | 'unknown';

interface StreamInfo {
  type: StreamType;
  embedUrl?: string;
}

function detectStream(url: string): StreamInfo {
  const normalized = url.trim();
  const youtube = normalized.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([\w-]{11})/i);
  if (youtube) return { type: 'embed', embedUrl: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=0&rel=0` };
  if (/\.(m3u8)(?:[?#].*)?$/i.test(normalized)) return { type: 'hls' };
  if (/streamguys/i.test(normalized)) return { type: 'audio' };
  if (/\.(mp3|aac|m4a|ogg|oga|opus|wav)(?:[?#].*)?$/i.test(normalized)) return { type: 'audio' };
  if (/\.(mp4|webm|ogv|mov)(?:[?#].*)?$/i.test(normalized)) return { type: 'video' };
  return { type: 'unknown' };
}

export default function LiveStreamPlayer({ streamUrl }: { streamUrl: string }) {
  const stream = useMemo(() => detectStream(streamUrl), [streamUrl]);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [detectedAudio, setDetectedAudio] = useState(stream.type === 'audio');
  const [error, setError] = useState('');

  useEffect(() => {
    setDetectedAudio(stream.type === 'audio');
    setError('');
  }, [stream.type, streamUrl]);

  useEffect(() => {
    if (stream.type !== 'hls' || !mediaRef.current) return;
    const media = mediaRef.current;
    if (media.canPlayType('application/vnd.apple.mpegurl')) {
      media.src = streamUrl;
      return;
    }
    if (!Hls.isSupported()) {
      setError('This browser cannot play this HLS stream. Please try a current browser.');
      return;
    }
    const hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(media);
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) setError('The live stream is unavailable right now. Please try again shortly.');
    });
    return () => hls.destroy();
  }, [stream.type, streamUrl, detectedAudio]);

  if (!streamUrl) {
    return (
      <div className="bg-[#171717] text-white min-h-72 flex flex-col items-center justify-center p-8 text-center">
        <Radio size={36} className="text-[#C8102E] mb-4" />
        <h2 className="font-display font-black text-2xl">Live stream coming soon</h2>
        <p className="text-gray-300 text-sm mt-2 max-w-md">Crooz 106.3 FM is preparing its online broadcast. Please check back soon.</p>
      </div>
    );
  }

  if (stream.type === 'embed' && stream.embedUrl) {
    return <iframe title="Crooz 106.3 FM live stream" src={stream.embedUrl} className="w-full aspect-video bg-black" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  }

  const isAudio = detectedAudio;
  const MediaTag = isAudio ? 'audio' : 'video';
  const mediaProps = {
    ref: mediaRef as React.RefObject<HTMLVideoElement & HTMLAudioElement>,
    controls: true,
    autoPlay: false,
    playsInline: true,
    onLoadedMetadata: (event: React.SyntheticEvent<HTMLVideoElement | HTMLAudioElement>) => {
      const media = event.currentTarget;
      if (stream.type === 'unknown' && media instanceof HTMLVideoElement && media.videoWidth === 0) setDetectedAudio(true);
      if (stream.type === 'hls' && media instanceof HTMLVideoElement && media.videoWidth === 0) setDetectedAudio(true);
    },
    onError: () => setError('The live stream could not be loaded. Please check the stream link or try again later.'),
    className: isAudio ? 'w-full' : 'w-full aspect-video bg-black',
  };

  return (
    <div className="bg-[#171717]">
      <div className={`${isAudio ? 'min-h-72 flex items-center justify-center p-8' : ''}`}>
        {isAudio ? (
          <div className="w-full max-w-xl text-center text-white">
            <Headphones size={42} className="mx-auto text-[#C8102E] mb-4" />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C8102E] mb-2">Now broadcasting</p>
            <h2 className="font-display font-black text-2xl mb-6">Crooz 106.3 FM — Owerri</h2>
            <MediaTag key="audio" {...mediaProps} src={stream.type === 'hls' ? undefined : streamUrl} />
          </div>
        ) : (
          <MediaTag key="video" {...mediaProps} src={stream.type === 'hls' ? undefined : streamUrl} />
        )}
      </div>
      <div className="flex items-center gap-2 px-5 py-3 text-sm text-white border-t border-white/10">
        {isAudio ? <Headphones size={16} className="text-[#C8102E]" /> : <Video size={16} className="text-[#C8102E]" />}
        <span>{isAudio ? 'Audio stream detected' : stream.type === 'hls' ? 'Live stream detected — media type will adjust automatically' : 'Video stream detected'}</span>
      </div>
      {error && <div className="flex items-center gap-2 bg-red-50 text-[#A00D24] px-5 py-3 text-sm"><AlertCircle size={16} />{error}</div>}
    </div>
  );
}
