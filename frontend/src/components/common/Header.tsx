import { Link, useLocation } from 'react-router-dom';
import { Scale, Search, MessageSquare, GitCompare, FileCheck, Shield, FileText, Clock, Folder, Bell } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Scale },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/chat', label: 'AI Assistant', icon: MessageSquare },
  { path: '/compare', label: 'Compare', icon: GitCompare },
  { path: '/analyze', label: 'Analyze', icon: FileCheck },
  { path: '/compliance', label: 'Compliance', icon: Shield },
  { path: '/explain', label: 'Explain', icon: FileText },
  { path: '/timeline', label: 'Timeline', icon: Clock },
  { path: '/workspaces', label: 'Workspaces', icon: Folder },
  { path: '/alerts', label: 'Alerts', icon: Bell },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-gavel-800 to-gavel-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold-400 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-gavel-900" />
            </div>
            <div>
              <span className="text-xl font-bold">Gavel</span>
              <span className="text-xs text-gavel-300 block -mt-1">Australian Legal Intelligence</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.slice(1, 8).map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm transition-colors
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'text-gavel-200 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/workspaces"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Workspaces"
            >
              <Folder className="w-5 h-5" />
            </Link>
            <Link
              to="/alerts"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
              title="Alerts"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
