import React from 'react';
import { Clock, ExternalLink, Search, Trash2 } from 'lucide-react';
import { useBrowser } from '../../contexts/BrowserContext';
import { Button } from '../common/Button';

export const HistoryPanel: React.FC = () => {
  const { history, clearHistory } = useBrowser();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Mock history data for display purposes
  const mockHistory = [
    {
      id: '1',
      title: 'GitHub: Let&#39;s build from here',
      url: 'https://github.com',
      visitTime: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      title: 'Stack Overflow - Where Developers Learn, Share, & Build',
      url: 'https://stackoverflow.com',
      visitTime: new Date(Date.now() - 7200000),
    },
    {
      id: '3',
      title: 'Reddit - Dive into anything',
      url: 'https://reddit.com',
      visitTime: new Date(Date.now() - 86400000),
    },
  ];

  const displayHistory = history.length > 0 ? history : mockHistory;
  
  const filteredHistory = displayHistory.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search history"
          className="bg-gray-800 border border-gray-700 rounded-xl text-sm text-white pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-400">Recent</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          icon={<Trash2 size={16} />}
          onClick={clearHistory}
        >
          Clear
        </Button>
      </div>
      
      {filteredHistory.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No history matching your search</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredHistory.map((item) => (
            <li 
              key={item.id} 
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center overflow-hidden">
                <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3">
                  {item.favicon ? (
                    <img src={item.favicon} alt="" className="w-4 h-4" />
                  ) : (
                    <ExternalLink size={12} className="text-gray-400" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm text-gray-300 truncate">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock size={10} className="mr-1" />
                    {formatDate(item.visitTime)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};