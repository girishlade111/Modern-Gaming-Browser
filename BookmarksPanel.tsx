import React from 'react';
import { ExternalLink, FolderPlus, Trash2 } from 'lucide-react';
import { useBrowser } from '../../contexts/BrowserContext';
import { Button } from '../common/Button';

export const BookmarksPanel: React.FC = () => {
  const { bookmarks, removeBookmark } = useBrowser();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" icon={<FolderPlus size={16} />}>
          New Folder
        </Button>
      </div>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No bookmarks yet</p>
          <p className="text-sm text-gray-600 mt-2">
            Click the bookmark icon in the toolbar to add one
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((bookmark) => (
            <li 
              key={bookmark.id} 
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center overflow-hidden">
                <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3">
                  {bookmark.favicon ? (
                    <img src={bookmark.favicon} alt="" className="w-4 h-4" />
                  ) : (
                    <ExternalLink size={12} className="text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-gray-300 truncate">
                  {bookmark.title}
                </span>
              </div>
              
              <button
                className="w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-700 text-gray-400 hover:text-white transition-opacity"
                onClick={() => removeBookmark(bookmark.id)}
                title="Delete bookmark"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};