import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  Tag,
  Settings,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  User,
  Menu,
  X,
} from 'lucide-react';
import croozLogo from '../../assets/crooz-1063-fm-logo.png';
import { authService } from '../../services/authService';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', to: '/admin/dashboard' },
  { icon: Newspaper, label: 'Manage News', to: '/admin/manage' },
  { icon: PlusCircle, label: 'Create News', to: '/admin/create' },
  { icon: Tag, label: 'Categories', to: '/admin/categories' },
  { icon: Settings, label: 'Settings', to: '/admin/settings' },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin', { replace: true });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-3 z-40 flex h-10 w-10 items-center justify-center bg-[#171717] text-white shadow-lg lg:hidden"
        aria-label="Open admin navigation"
      >
        <Menu size={20} />
      </button>
      {mobileOpen && <button type="button" aria-label="Close admin navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-72 flex-col bg-[#171717] text-white shadow-xl transition-all duration-300 lg:sticky lg:top-0 lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none ${
          collapsed ? 'lg:w-16' : ''
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
      <button type="button" onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 p-1 text-gray-300 hover:text-white lg:hidden" aria-label="Close admin navigation"><X size={20} /></button>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="bg-white rounded-sm p-0.5 flex-shrink-0">
          <img src={croozLogo} alt="Crooz 106.3 FM" className={`${collapsed ? 'w-11 h-11' : 'w-16 h-11'} object-contain`} />
        </div>
        {!collapsed && (
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#C8102E] uppercase leading-none block">Admin Portal</span>
        )}
      </div>

      {/* Admin Profile */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8102E] flex items-center justify-center flex-shrink-0">
              <User size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Crooz 106.3 FM</p>
              <p className="text-xs text-gray-400 truncate">Owerri, Imo State</p>
            </div>
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C8102E] rounded-full text-[8px] flex items-center justify-center font-bold">3</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map(({ icon: Icon, label, to }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                collapsed ? 'justify-center' : ''
              } ${
                active
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-semibold">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle + Logout */}
      <div className="border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span className="text-sm font-semibold">Collapse</span></>}
        </button>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-[#C8102E] hover:bg-white/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>
      </aside>
    </>
  );
}
