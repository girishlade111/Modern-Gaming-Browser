import React, { useState } from 'react';
import { 
  Home, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Globe, 
  Bookmark, 
  Menu,
  Eye,
  Languages
} from 'lucide-react';
import { useBrowser } from '../../contexts/BrowserContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../common/Button';

export const Toolbar: React.FC = () => {
  const { 
    currentUrl, 
    setCurrentUrl, 
    isIncognitoMode, 
    toggleIncognitoMode,
    toggleSidebar,
    addBookmark
  } = useBrowser();
  const { accentColor } = useTheme();
  const [tempUrl, setTempUrl] = useState(currentUrl);
  
  const accentColorStyles = {
    purple: 'focus-within:border-purple-500',
    blue: 'focus-within:border-blue-500',
    green: 'focus-within:border-green-500',
    red: 'focus-within:border-red-500',
    orange: 'focus-within:border-orange-500'
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUrl(tempUrl);
  };

  const handleIncognitoToggle = () => {
    toggleIncognitoMode();
  };

  const handleAddBookmark = () => {
    if (currentUrl) {
      addBookmark(currentUrl.replace('https://', ''), currentUrl);
    }
  };

  return (
    <div className="h-12 flex items-center space-x-2 px-3 bg-gray-900 border-b border-gray-700">
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        onClick={toggleSidebar}
        title="Open sidebar"
      >
        <Menu size={18} />
      </button>
      
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        title="Go back"
      >
        <ChevronLeft size={18} />
      </button>
      
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        title="Go forward"
      >
        <ChevronRight size={18} />
      </button>
      
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        title="Refresh"
      >
        <RefreshCw size={18} />
      </button>
      
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        title="Home"
      >
        <Home size={18} />
      </button>
      
      <form onSubmit={handleUrlSubmit} className="flex-1">
        <div className={`flex items-center h-9 rounded-2xl bg-gray-800 border border-gray-700 ${accentColorStyles[accentColor]} transition-colors overflow-hidden px-3`}>
          {isIncognitoMode ? (
            <Eye size={16} className="text-gray-500 mr-2" />
          ) : (
            <Lock size={16} className="text-gray-500 mr-2" />
          )}
          
          <input 
            type="text" 
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm text-white"
            placeholder="Search Google or enter a URL"
          />
          
          {tempUrl && (
            <div className="flex space-x-1">
              <button 
                type="button" 
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                title="Translate this page"
              >
                <Languages size={14} />
              </button>
            </div>
          )}
        </div>
      </form>
      
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        onClick={handleAddBookmark}
        title="Bookmark this page"
      >
        <Bookmark size={18} />
      </button>
      
      <Button
        variant="ghost"
        size="sm"
        icon={<Globe size={16} />}
        onClick={handleIncognitoToggle}
        className={isIncognitoMode ? 'text-purple-400' : 'text-gray-400'}
        title={isIncognitoMode ? 'Exit incognito mode' : 'Enter incognito mode'}
      >
        {isIncognitoMode ? 'Incognito' : ''}
      </Button>
    </div>
  );
};