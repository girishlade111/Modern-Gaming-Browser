import React from 'react';
import { useBrowser } from '../../contexts/BrowserContext';
import { Button } from '../common/Button';
import { Package, Plus } from 'lucide-react';

export const ExtensionsPanel: React.FC = () => {
  const { extensions, toggleExtension } = useBrowser();
  
  // Mock extensions data for display purposes
  const mockExtensions = [
    {
      id: '1',
      name: 'uBlock Origin',
      icon: 'https://lh3.googleusercontent.com/n5VkLPYLHVzIOvT-9Q-QRgNQSZlOVCnvEZr_rFhnAq5-w5Ps_J-uYnLitsHuDgxSQkdvJJX0EJwTPJYg73HSyQR3=s60',
      version: '1.42.4',
      isEnabled: true,
      description: 'An efficient blocker for Chromium and Firefox. Fast and lean.',
    },
    {
      id: '2',
      name: 'Dark Reader',
      icon: 'https://lh3.googleusercontent.com/JaKeBmYhMaSns7nKIITwN9rjhQX7HkK9kMaTnbqz3UbMMUKjuNHZfciTC9UhNzDBWuXCbkKdJg=s60',
      version: '4.9.35',
      isEnabled: true,
      description: 'Dark mode for every website. Take care of your eyes, use dark theme for night and daily browsing.',
    },
    {
      id: '3',
      name: 'Grammarly',
      icon: 'https://lh3.googleusercontent.com/vDfGo529tOv4vXwqJRtHN5vSWQmm3KleCfqQfmEn_bcxwZYT1U8w4WBwaG0BRQyU3BbEPOTMAR8=s60',
      version: '14.1009.0',
      isEnabled: false,
      description: 'Grammar checking and writing support.',
    },
  ];

  const displayExtensions = extensions.length > 0 ? extensions : mockExtensions;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-400">Installed Extensions</h3>
        <Button variant="ghost" size="sm" icon={<Plus size={16} />}>
          Add New
        </Button>
      </div>
      
      <div className="space-y-3">
        {displayExtensions.map((extension) => (
          <div key={extension.id} className="bg-gray-850 rounded-xl p-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {extension.icon ? (
                  <img src={extension.icon} alt="" className="w-10 h-10 rounded" />
                ) : (
                  <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center">
                    <Package size={18} className="text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white truncate">
                      {extension.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Version {extension.version}
                    </p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="" 
                      className="sr-only peer" 
                      checked={extension.isEnabled}
                      onChange={() => toggleExtension(extension.id)}
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {extension.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center py-2">
        <Button variant="ghost" size="sm">
          Browse Extension Store
        </Button>
      </div>
    </div>
  );
};