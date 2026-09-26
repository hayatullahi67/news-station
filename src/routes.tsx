import { createBrowserRouter, Outlet } from 'react-router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminSidebar from './components/admin/AdminSidebar';
import Home from './pages/Home';
import NewsDetails from './pages/NewsDetails';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageNews from './pages/admin/ManageNews';
import CreateNews from './pages/admin/CreateNews';
import Categories from './pages/admin/Categories';
import Settings from './pages/admin/Settings';
import LiveStream from './pages/LiveStream';
import AdminGuard from './components/admin/AdminGuard';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar />
      <div className="flex-1 min-w-0 overflow-auto pt-14 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: 'news/:id', Component: NewsDetails },
      { path: 'live', Component: LiveStream },
    ],
  },
  {
    path: '/admin',
    Component: AdminLogin,
  },
  {
    path: '/admin',
    Component: AdminGuard,
    children: [
      { Component: AdminLayout, children: [
        { path: 'dashboard', Component: Dashboard },
        { path: 'manage', Component: ManageNews },
        { path: 'create', Component: CreateNews },
        { path: 'edit/:id', Component: CreateNews },
        { path: 'categories', Component: Categories },
        { path: 'settings', Component: Settings },
      ] },
    ],
  },
]);
