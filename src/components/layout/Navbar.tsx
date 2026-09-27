import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Search, Menu, X } from 'lucide-react';
import croozLogo from '../../assets/crooz-1063-fm-logo.png';

const NAV_ITEMS = [
  { label: 'News', to: '/news' },
  { label: 'Latest News', to: '/news#latest-news' },
  { label: 'Categories', to: '/news#categories' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (location.pathname === '/' && !location.search) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white border-b-2 border-[#171717] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center flex-shrink-0"
          >
            <img src={croozLogo} alt="Crooz 106.3 FM Owerri" className="h-14 w-28 object-contain object-center" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-[#F26926] hover:text-[#171717] transition-colors uppercase tracking-wide">
              Listen Live
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-semibold text-[#171717] hover:text-[#F26926] transition-colors uppercase tracking-wide cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm w-32 sm:w-48 focus:outline-none focus:border-[#F26926]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="text-[#171717] hover:text-[#F26926] transition-colors p-1"
              >
                <Search size={20} />
              </button>
            )}

           
            <button
              className="md:hidden p-1 text-[#171717]"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[#F26926] uppercase tracking-wide py-1">
            Listen Live
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-[#171717] hover:text-[#F26926] uppercase tracking-wide py-1 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold uppercase tracking-widest text-white bg-[#171717] px-3 py-2 text-center"
          >
            Admin Login
          </Link>
        </div>
      )}
    </header>
  );
}
