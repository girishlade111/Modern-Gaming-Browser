import React from 'react';
import {
  Bookmark,
  Clock,
  Download,
  Puzzle,
  Settings,
  Cast,
  User,
  X
} from 'lucide-react';
import { useBrowser } from '../../contexts/BrowserContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../common/Button';
import { BookmarksPanel } from '../panels/BookmarksPanel';
import { HistoryPanel } from '../panels/HistoryPanel';
import { DownloadsPanel } from '../panels/DownloadsPanel';
import { ExtensionsPanel } from '../panels/ExtensionsPanel';

export const Sidebar: React.FC = () => {
  const { 
    isSidebarOpen, 
    toggleSidebar, 
    activeSidebarPanel, 
    setActiveSidebarPanel,
    isLoggedIn,
    login,
    logout
  } = useBrowser();
  const { accentColor } = useTheme();
  
  if (!isSidebarOpen) return null;

  const handlePanelSelect = (panel: string) => {
    setActiveSidebarPanel(activeSidebarPanel === panel ? null : panel);
  };

  const accentColorStyles = {
    purple: 'border-purple-500 text-purple-500 bg-purple-500/10',
    blue: 'border-blue-500 text-blue-500 bg-blue-500/10',
    green: 'border-green-500 text-green-500 bg-green-500/10',
    red: 'border-red-500 text-red-500 bg-red-500/10',
    orange: 'border-orange-500 text-orange-500 bg-orange-500/10'
  };

  const getIconClassName = (panel: string) => {
    return activeSidebarPanel === panel
      ? accentColorStyles[accentColor]
      : 'text-gray-400 hover:text-white hover:bg-gray-800';
  };

  const renderActivePanel = () => {
    switch (activeSidebarPanel) {
      case 'bookmarks':
        return <BookmarksPanel />;
      case 'history':
        return <HistoryPanel />;
      case 'downloads':
        return <DownloadsPanel />;
      case 'extensions':
        return <ExtensionsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 flex z-40">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4">
        <div className="flex-1 flex flex-col items-center space-y-4">
          <button
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${getIconClassName('bookmarks')}`}
            onClick={() => handlePanelSelect('bookmarks')}
            title="Bookmarks"
          >
            <Bookmark size={20} />
          </button>
          
          <button
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${getIconClassName('history')}`}
            onClick={() => handlePanelSelect('history')}
            title="History"
          >
            <Clock size={20} />
          </button>
          
          <button
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${getIconClassName('downloads')}`}
            onClick={() => handlePanelSelect('downloads')}
            title="Downloads"
          >
            <Download size={20} />
          </button>
          
          <button
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${getIconClassName('extensions')}`}
            onClick={() => handlePanelSelect('extensions')}
            title="Extensions"
          >
            <Puzzle size={20} />
          </button>
          
          <button
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors text-gray-400 hover:text-white hover:bg-gray-800`}
            title="Cast"
          >
            <Cast size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center space-y-4 mt-4">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          
          <button
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isLoggedIn ? 'text-green-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            onClick={isLoggedIn ? logout : login}
            title={isLoggedIn ? 'Logged in - Click to log out' : 'Log in'}
          >
            <User size={20} />
          </button>
        </div>
      </div>
      
      {/* Panel content */}
      {activeSidebarPanel && (
        <div className="w-80 bg-gray-900 border-r border-gray-800 animate-slideIn">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <h2 className="text-lg font-medium text-white capitalize">
              {activeSidebarPanel}
            </h2>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              onClick={() => setActiveSidebarPanel(null)}
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4">
            {renderActivePanel()}
          </div>
        </div>
      )}
    </div>
  );
};