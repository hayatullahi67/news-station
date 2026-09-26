import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import croozLogo from '../assets/crooz-1063-fm-logo.png';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  if (user) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try { await authService.login(email, password); navigate('/admin/dashboard'); }
    catch { setError('Sign-in failed. Check your email, password, and Firebase Authentication setup.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={croozLogo} alt="Crooz 106.3 FM Owerri" className="h-28 w-60 object-contain mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-semibold uppercase tracking-widest">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-[#171717] p-8">
          <h2 className="font-display font-black text-2xl text-[#171717] mb-1">Sign In</h2>
          <p className="text-sm text-gray-500 mb-7">Access the newsroom management system.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-[#C8102E] px-4 py-3 mb-5 text-sm font-semibold">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full border-2 border-gray-200 focus:border-[#C8102E] outline-none px-4 py-3 text-sm transition-colors"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#171717] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-200 focus:border-[#C8102E] outline-none px-4 py-3 pr-12 text-sm transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#C8102E]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#C8102E] font-semibold hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8102E] text-white font-black uppercase tracking-widest text-sm py-4 hover:bg-[#A00D24] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Secure admin access powered by Firebase Authentication
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-gray-500 hover:text-[#C8102E] transition-colors font-semibold">
            ← Return to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
