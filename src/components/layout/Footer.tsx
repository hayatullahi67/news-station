import { Link, useNavigate, useLocation } from 'react-router';
import { MessageCircle, Globe, AtSign, Share2, Phone } from 'lucide-react';
import croozLogo from '../../assets/crooz-1063-fm-logo.png';
import { useCategories } from '../../hooks/useCategories';

export default function Footer() {
  const { categories } = useCategories();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (location.pathname === '/' && !location.search) {
      e.preventDefault();
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${targetId}`);
        }
      }
    } else {
      e.preventDefault();
      if (targetId === 'home') {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(`/#${targetId}`);
      }
    }
  };

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    category: string
  ) => {
    e.preventDefault();
    navigate(`/?category=${encodeURIComponent(category)}#categories`);
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#171717] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="inline-flex bg-white rounded-sm p-1 mb-4">
              <img src={croozLogo} alt="Crooz 106.3 FM Owerri" className="h-16 w-32 object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of the stories that shape our world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-[#C8102E] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', targetId: 'home', to: '/' },
                { label: 'Listen Live', targetId: '', to: '/live' },
                { label: 'Latest News', targetId: 'latest-news', to: '/#latest-news' },
                { label: 'Categories', targetId: 'categories', to: '/#categories' },
                { label: 'Contact', targetId: 'contact', to: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  {link.to === '/live' ? <Link to="/live" className="text-gray-400 hover:text-white text-sm transition-colors">{link.label}</Link> : <a href={link.to} onClick={(e) => handleNavClick(e, link.targetId)} className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">{link.label}</a>}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-[#C8102E] mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map(({ id, name: cat }) => (
                <li key={id}>
                  <a
                    href={`/?category=${cat}#categories`}
                    onClick={(e) => handleCategoryClick(e, cat)}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-16">
            <h4 className="font-bold uppercase tracking-widest text-xs text-[#C8102E] mb-4">Get In Touch</h4>
            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <p>Owerri Ring Road, Toronto - Uratta</p>
              <p>Owerri North L.G.A, Owerri - Imo State</p>
              <p className="flex items-center gap-2">
                <Phone size={14} />
                Tel: +234 907 063 1063
              </p>
            </div>
            <div className="flex gap-3">
              {[MessageCircle, Globe, AtSign, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 Crooz 106.3 FM. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
