import { Navigate, Outlet } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminGuard() {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]"><Loader2 className="animate-spin text-[#F26926]" size={28} /></div>;
  return user ? <Outlet /> : <Navigate to="/admin" replace />;
}
