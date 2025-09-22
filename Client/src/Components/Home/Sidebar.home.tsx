import { useState } from 'react';
import { Home, Settings, ChevronLeft, ChevronRight, LogOut, Droplet, Bell, MessageCircle, Activity, Sun } from 'lucide-react';
import type { User } from '@/State/Types';
import type { NavigateFunction } from 'react-router-dom';

interface Props {
  collapsed: Boolean,
  onToggle: () => void,
  user: User,
  activeItem: string,
  onNavigate: (itemKey: string) => void,
  navigate: NavigateFunction
}

const Sidebar = ({ collapsed, onToggle, user, activeItem, onNavigate, navigate }: Props) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const menuItems = [
    { icon: Home, label: 'Home', key: 'home' },
    { icon: Activity, label: 'Soil Health', key: 'soilquality' },
    { icon: Sun, label: 'Soil Moisture', key: 'soilmoisture' },
    { icon: MessageCircle, label: 'AgroAI', key: 'agroai' },
    // { icon: Droplet, label: 'Irrigation', key: 'irrigation' },
    { icon: Bell, label: 'Notification', key: 'notification' },
  ];

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  }

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div className="fixed inset-0 z-20 bg-black/20 lg:hidden" onClick={onToggle} />
      )}
      
      <div className={`
        h-full bg-neutral-100 border-r border-black
        transition-all duration-300 ease-in-out flex flex-col
        lg:relative lg:translate-x-0
        ${collapsed ? 'w-14 lg:translate-x-0' : 'w-80 translate-x-0 fixed left-0 top-0 z-30'}
      `}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-black">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-900 tracking-tight">Agrosmart</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="rounded-md p-1.5 text-emerald-700 transition-all hover:bg-emerald-200/50 hover:text-emerald-900 active:scale-95"
          >
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto px-4 p-4">
          <nav className="space-y-6">
            {/* Menu Items Section */}
            <div className="space-y-4">
              {collapsed && (<div className="pt-4"></div>)}
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(item.key)}
                  className={`
                    flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                    transition-all duration-200 hover:bg-emerald-200/50 hover:text-emerald-900
                    ${activeItem === item.key
                      ? 'bg-emerald-500/20 text-emerald-900 border border-emerald-200' 
                      : 'text-gray-800'
                    }
                    ${collapsed ? 'justify-center px-3' : ''}
                  `}
                >
                  <item.icon size={22} className="flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              ))}
            </div>

            {/* Settings */}
            <div className="space-y-1">
              <button 
                onClick={() => onNavigate('settings')}
                className={`
                  flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                  transition-all duration-200 hover:bg-emerald-200/50 hover:text-emerald-900
                  ${activeItem === 'settings'
                    ? 'bg-emerald-500/20 text-emerald-900 border border-black' 
                    : 'text-gray-800'
                  }
                  ${collapsed ? 'justify-center px-3' : ''}
                `}
              >
                <Settings size={22} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">Settings</span>}
              </button>
            </div>
          </nav>
        </div>

        {/* User Profile */}
        <div className="border-t border-black p-4">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`
                flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm
                transition-colors hover:bg-emerald-200/50
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-black flex items-center justify-center text-emerald-900 font-medium">
                {user.username.charAt(0)}
              </div>
              {!collapsed && (
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium text-gray-900 truncate">{user.username}</div>
                  <div className="text-xs text-gray-600 truncate">{user.email}</div>
                </div>
              )}
            </button>

            {/* Dropdown */}
            {showUserMenu && !collapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border border-black bg-white shadow-lg z-40">
                <div className="border-b border-black p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-black flex items-center justify-center text-emerald-900 font-medium">
                      {user.username.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 truncate">{user.username}</div>
                      <div className="text-sm text-gray-600 truncate">{user.email}</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  className="flex w-full items-center gap-2 p-3 text-sm text-red-600 transition-colors hover:bg-red-100/50"
                >
                  <LogOut size={18} className="flex-shrink-0" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;