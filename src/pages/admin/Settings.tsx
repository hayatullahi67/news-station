import { useState } from 'react';
import { Save, Radio, MessageCircle, Globe, AtSign, Share2, Check } from 'lucide-react';
import croozLogo from '../../assets/crooz-1063-fm-logo.png';
import { getLiveStreamUrl, saveLiveStreamUrl } from '../../utils/liveStream';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState(getLiveStreamUrl);
  const [settings, setSettings] = useState({
    stationName: 'Crooz 106.3 FM',
    description: 'Crooz 106.3 FM — your trusted source for breaking news, in-depth analysis, and comprehensive coverage from Owerri, Imo State.',
    contactEmail: '',
    contactPhone: '+234 907 063 1063',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    adminName: 'Crooz 106.3 FM',
    adminEmail: '',
    adminTitle: 'Chief Editor',
  });

  const update = (key: keyof typeof settings, value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveLiveStreamUrl(liveStreamUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-6 max-w-3xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display font-black text-2xl text-[#171717]">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your station's configuration.</p>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center sm:w-auto items-center gap-2 bg-[#C8102E] text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-[#A00D24] transition-colors"
        >
          {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>

      <div className="bg-white border border-gray-200 p-4 sm:p-6 space-y-3">
        <div>
          <h2 className="font-black text-xs uppercase tracking-widest text-[#171717]">Live Stream</h2>
          <p className="text-sm text-gray-500 mt-1">Paste the direct stream, HLS (.m3u8), YouTube Live, or media URL. The player detects audio or video automatically.</p>
        </div>
        <input type="url" value={liveStreamUrl} onChange={(e) => setLiveStreamUrl(e.target.value)} placeholder="https://example.com/live.m3u8" className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors" />
      </div>

      {/* Station Identity */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Radio size={16} className="text-[#C8102E]" />
          <h2 className="font-black text-xs uppercase tracking-widest text-[#171717]">Station Identity</h2>
        </div>

        <div className="flex flex-col items-start gap-4 p-4 border border-dashed border-gray-300 sm:flex-row sm:items-center">
          <div className="w-28 h-16 bg-white border border-gray-100 rounded-sm flex items-center justify-center flex-shrink-0">
            <img src={croozLogo} alt="Crooz 106.3 FM Owerri" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#171717]">Station Logo</p>
            <p className="text-xs text-gray-500 mt-0.5">Recommended: 256×256px PNG or SVG</p>
            <button type="button" className="mt-2 text-xs font-bold text-[#C8102E] hover:underline">
              Upload New Logo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">Station Name</label>
            <input
              type="text"
              value={settings.stationName}
              onChange={(e) => update('stationName', e.target.value)}
              className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => update('contactEmail', e.target.value)}
              className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">Website Description</label>
          <textarea
            value={settings.description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">Contact Phone</label>
          <input
            type="tel"
            value={settings.contactPhone}
            onChange={(e) => update('contactPhone', e.target.value)}
            className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors"
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="font-black text-xs uppercase tracking-widest text-[#171717] mb-2">Social Media Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { Icon: MessageCircle, key: 'twitter', label: 'Twitter / X' },
            { Icon: Globe, key: 'facebook', label: 'Facebook' },
            { Icon: AtSign, key: 'instagram', label: 'Instagram' },
            { Icon: Share2, key: 'youtube', label: 'YouTube' },
          ].map(({ Icon, key, label }) => (
            <div key={key}>
              <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">{label}</label>
              <div className="relative">
                <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={settings[key as keyof typeof settings]}
                  onChange={(e) => update(key as keyof typeof settings, e.target.value)}
                  className="w-full border border-gray-200 focus:border-[#C8102E] outline-none pl-9 pr-4 py-2.5 text-sm transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Profile */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="font-black text-xs uppercase tracking-widest text-[#171717] mb-2">Admin Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">Full Name</label>
            <input
              type="text"
              value={settings.adminName}
              onChange={(e) => update('adminName', e.target.value)}
              className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">Admin Email</label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => update('adminEmail', e.target.value)}
              className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">Job Title</label>
            <input
              type="text"
              value={settings.adminTitle}
              onChange={(e) => update('adminTitle', e.target.value)}
              className="w-full border border-gray-200 focus:border-[#C8102E] outline-none px-4 py-2.5 text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm font-bold">
          <Check size={16} /> Changes saved successfully!
        </div>
      )}
    </form>
  );
}
