import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface WebContentProps {
  url: string;
}

export const WebContent: React.FC<WebContentProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Reset loading state when iframe loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [url]);

  // Handle Google search URLs
  if (url.startsWith('https://www.google.com/search')) {
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const searchQuery = searchParams.get('q');
    
    return (
      <iframe
        src={url}
        className="w-full h-full border-none bg-white"
        onLoad={() => setIsLoading(false)}
        title={`Search results for ${searchQuery}`}
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    );
  }

  // For all other URLs
  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
          <Loader2 size={40} className="text-gray-400 animate-spin mb-4" />
          <p className="text-gray-400">Loading...</p>
          <p className="text-gray-600 text-sm mt-2">{url}</p>
        </div>
      )}
      
      <iframe
        src={url}
        className="w-full h-full border-none bg-white"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError('Failed to load webpage');
          setIsLoading(false);
        }}
        title="Web content"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <span className="text-2xl text-red-500">!</span>
          </div>
          <p className="text-gray-300 text-lg">{error}</p>
          <p className="text-gray-600 text-sm mt-2">{url}</p>
        </div>
      )}
    </div>
  );
};