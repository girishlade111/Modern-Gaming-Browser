import React from 'react';
import { Download, File, Pause, Play, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useBrowser } from '../../contexts/BrowserContext';

export const DownloadsPanel: React.FC = () => {
  const { downloads } = useBrowser();
  
  // Mock downloads data for display purposes
  const mockDownloads = [
    {
      id: '1',
      filename: 'project-presentation.pdf',
      url: 'https://example.com/project-presentation.pdf',
      progress: 100,
      status: 'completed' as const,
      startTime: new Date(Date.now() - 3600000),
      fileSize: 4.2 * 1024 * 1024, // 4.2 MB
    },
    {
      id: '2',
      filename: 'game-installer.exe',
      url: 'https://example.com/game-installer.exe',
      progress: 68,
      status: 'in_progress' as const,
      startTime: new Date(),
      fileSize: 1.8 * 1024 * 1024 * 1024, // 1.8 GB
      downloadSpeed: 4.2 * 1024 * 1024, // 4.2 MB/s
    },
    {
      id: '3',
      filename: 'photo-album.zip',
      url: 'https://example.com/photo-album.zip',
      progress: 32,
      status: 'paused' as const,
      startTime: new Date(Date.now() - 600000),
      fileSize: 128 * 1024 * 1024, // 128 MB
    },
    {
      id: '4',
      filename: 'update-patch.bin',
      url: 'https://example.com/update-patch.bin',
      progress: 45,
      status: 'failed' as const,
      startTime: new Date(Date.now() - 7200000),
      fileSize: 82 * 1024 * 1024, // 82 MB
    },
  ];

  const displayDownloads = downloads.length > 0 ? downloads : mockDownloads;

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'in_progress':
        return <Download size={14} className="text-blue-500" />;
      case 'paused':
        return <Pause size={14} className="text-yellow-500" />;
      case 'failed':
        return <AlertTriangle size={14} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-400">Recent Downloads</h3>
        <button className="text-xs text-gray-400 hover:text-white">
          Clear All
        </button>
      </div>
      
      {displayDownloads.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No downloads yet</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {displayDownloads.map((item) => (
            <li key={item.id} className="bg-gray-850 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3">
                    <File size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 truncate max-w-[180px]">
                      {item.filename}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <span>{getStatusIcon(item.status)}</span>
                      <span>{formatFileSize(item.fileSize)}</span>
                      {item.status === 'in_progress' && item.downloadSpeed && (
                        <>
                          <span>•</span>
                          <span>{formatFileSize(item.downloadSpeed)}/s</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {item.status === 'in_progress' && (
                    <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                      <Pause size={14} />
                    </button>
                  )}
                  {item.status === 'paused' && (
                    <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                      <Play size={14} />
                    </button>
                  )}
                  <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              {(item.status === 'in_progress' || item.status === 'paused') && (
                <div className="mt-2 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${
                      item.status === 'paused' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};