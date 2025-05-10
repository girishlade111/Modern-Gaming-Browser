import React from 'react';
import { Search, Image, User, ChevronDown } from 'lucide-react';
import { useBrowser } from '../../contexts/BrowserContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../common/Button';

export const HomeScreen: React.FC = () => {
  const { setCurrentUrl, searchQuery, setSearchQuery, isLoggedIn, login } = useBrowser();
  const { accentColor, setAccentColor, glowIntensity, setGlowIntensity } = useTheme();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Check if it's a URL or a search query
      if (searchQuery.match(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/)) {
        // It's likely a URL, add https if needed
        setCurrentUrl(searchQuery.startsWith('http') ? searchQuery : `https://${searchQuery}`);
      } else {
        // It's a search query
        setCurrentUrl(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const accentColorOptions = [
    { name: 'Purple', value: 'purple' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Red', value: 'red' },
    { name: 'Orange', value: 'orange' },
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Girish
              </div>
              <div className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                ALPHA
              </div>
            </div>
            
            {!isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                icon={<User size={16} />}
                onClick={login}
              >
                Sign In
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <User size={16} className="text-gray-400" />
                </div>
                <div className="text-sm text-gray-300">User</div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className={`relative shadow-xl rounded-2xl overflow-hidden border-2 border-gray-700 transition-all focus-within:border-${accentColor}-500 group`}>
                <div className={`absolute inset-0 opacity-20 bg-${accentColor}-500 blur-md group-focus-within:opacity-30 transition-opacity`}></div>
                <div className="relative flex items-center bg-gray-800 h-14">
                  <div className="absolute left-4 text-gray-400">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    className="w-full h-full bg-transparent border-none pl-12 pr-4 outline-none text-white"
                    placeholder="Search Google or enter a website URL"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="button" className="h-full px-4 text-gray-400 hover:text-gray-200 transition-colors">
                    <Image size={20} />
                  </button>
                </div>
              </div>
            </form>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="h-24 rounded-2xl bg-gray-800 hover:bg-gray-750 border border-gray-700 cursor-pointer flex flex-col items-center justify-center transition-all p-4 hover:scale-[1.02]">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-10 h-10 mb-2" />
                <span className="text-sm text-gray-300 truncate w-full text-center">Google</span>
              </div>
              <div className="h-24 rounded-2xl bg-gray-800 hover:bg-gray-750 border border-gray-700 cursor-pointer flex flex-col items-center justify-center transition-all p-4 hover:scale-[1.02]">
                <img src="https://github.com/favicon.ico" alt="GitHub" className="w-10 h-10 mb-2" />
                <span className="text-sm text-gray-300 truncate w-full text-center">GitHub</span>
              </div>
              <div className="h-24 rounded-2xl bg-gray-800 hover:bg-gray-750 border border-gray-700 cursor-pointer flex flex-col items-center justify-center transition-all p-4 hover:scale-[1.02]">
                <img src="https://www.youtube.com/favicon.ico" alt="YouTube" className="w-10 h-10 mb-2" />
                <span className="text-sm text-gray-300 truncate w-full text-center">YouTube</span>
              </div>
              <div className="h-24 rounded-2xl bg-gray-800 hover:bg-gray-750 border border-gray-700 cursor-pointer flex flex-col items-center justify-center transition-all p-4 hover:scale-[1.02]">
                <img src="https://twitter.com/favicon.ico" alt="Twitter" className="w-10 h-10 mb-2" />
                <span className="text-sm text-gray-300 truncate w-full text-center">Twitter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-900 border-t border-gray-800">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-xl font-semibold mb-4 text-white">Customize Your Browser</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Accent Color
              </label>
              <div className="flex flex-wrap gap-2">
                {accentColorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      accentColor === color.value
                        ? `border-white bg-${color.value}-500`
                        : `border-gray-700 bg-${color.value}-500`
                    }`}
                    onClick={() => setAccentColor(color.value as any)}
                    title={color.name}
                  ></button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                <span>Glow Intensity</span>
                <span>{glowIntensity}</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>None</span>
                <span>Maximum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};