import React from 'react';
import { X } from 'lucide-react';
import { useBrowser, Tab as TabType } from '../../contexts/BrowserContext';
import { useTheme } from '../../contexts/ThemeContext';

interface TabProps {
  tab: TabType;
}

export const Tab: React.FC<TabProps> = ({ tab }) => {
  const { activateTab, closeTab, activeTabId } = useBrowser();
  const { accentColor } = useTheme();
  
  const isActive = tab.id === activeTabId;

  const accentColorStyles = {
    purple: 'border-t-purple-500',
    blue: 'border-t-blue-500',
    green: 'border-t-green-500',
    red: 'border-t-red-500',
    orange: 'border-t-orange-500'
  };

  const activeStyles = isActive 
    ? `bg-gray-800 ${accentColorStyles[accentColor]} border-t-2` 
    : 'bg-gray-900 hover:bg-gray-800 border-t-transparent';

  const handleClick = () => {
    activateTab(tab.id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeTab(tab.id);
  };

  return (
    <div 
      className={`flex items-center h-9 min-w-[120px] max-w-[200px] px-3 relative rounded-t-lg transition-all duration-300 ${activeStyles} cursor-pointer group`}
      onClick={handleClick}
    >
      {tab.favicon && (
        <img src={tab.favicon} alt="" className="w-4 h-4 mr-2" />
      )}
      
      <div className="flex-1 truncate text-sm text-gray-200">
        {tab.title || 'New Tab'}
      </div>
      
      <button 
        className="w-5 h-5 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-700 text-gray-400 hover:text-white transition-opacity ml-1"
        onClick={handleClose}
      >
        <X size={14} />
      </button>

      {tab.isLoading && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 animate-pulse w-full"></div>
      )}
    </div>
  );
};