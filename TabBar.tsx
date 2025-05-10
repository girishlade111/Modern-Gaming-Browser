import React from 'react';
import { Plus } from 'lucide-react';
import { useBrowser } from '../../contexts/BrowserContext';
import { Tab } from '../common/Tab';

export const TabBar: React.FC = () => {
  const { tabs, addTab } = useBrowser();

  const handleAddTab = () => {
    addTab();
  };

  return (
    <div className="h-10 flex items-center bg-gray-900 border-b border-gray-700 px-2">
      <div className="flex space-x-1 overflow-x-auto hide-scrollbar flex-1">
        {tabs.map((tab) => (
          <Tab key={tab.id} tab={tab} />
        ))}
      </div>
      
      <button 
        onClick={handleAddTab}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors ml-2"
        title="New Tab"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};