import React from 'react';
import { TabBar } from './TabBar';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { HomeScreen } from '../pages/HomeScreen';
import { WebContent } from '../pages/WebContent';
import { useBrowser } from '../../contexts/BrowserContext';

export const BrowserFrame: React.FC = () => {
  const { currentUrl, isSidebarOpen } = useBrowser();
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-950 text-white">
      <TabBar />
      <Toolbar />
      
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-16' : ''}`}>
          {currentUrl ? <WebContent url={currentUrl} /> : <HomeScreen />}
        </main>
      </div>
    </div>
  );
};