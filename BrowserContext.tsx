import React, { createContext, useContext, useState } from 'react';

// Types
export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isActive: boolean;
  isLoading: boolean;
  isPinned: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  folderId?: string;
}

export interface BookmarkFolder {
  id: string;
  name: string;
  parentId?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  visitTime: Date;
}

export interface Download {
  id: string;
  filename: string;
  url: string;
  progress: number;
  status: 'in_progress' | 'completed' | 'paused' | 'failed';
  startTime: Date;
  fileSize?: number;
  downloadSpeed?: number;
}

export interface Extension {
  id: string;
  name: string;
  icon: string;
  version: string;
  isEnabled: boolean;
  description: string;
}

interface BrowserContextType {
  currentUrl: string;
  setCurrentUrl: (url: string) => void;
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (url?: string, title?: string) => void;
  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
  isIncognitoMode: boolean;
  toggleIncognitoMode: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  bookmarks: Bookmark[];
  bookmarkFolders: BookmarkFolder[];
  addBookmark: (title: string, url: string, folderId?: string) => void;
  removeBookmark: (id: string) => void;
  history: HistoryItem[];
  clearHistory: () => void;
  downloads: Download[];
  extensions: Extension[];
  toggleExtension: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeSidebarPanel: string | null;
  setActiveSidebarPanel: (panel: string | null) => void;
}

const defaultContext: BrowserContextType = {
  currentUrl: '',
  setCurrentUrl: () => {},
  tabs: [],
  activeTabId: null,
  addTab: () => {},
  closeTab: () => {},
  activateTab: () => {},
  isIncognitoMode: false,
  toggleIncognitoMode: () => {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  bookmarks: [],
  bookmarkFolders: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  history: [],
  clearHistory: () => {},
  downloads: [],
  extensions: [],
  toggleExtension: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  isSidebarOpen: false,
  toggleSidebar: () => {},
  activeSidebarPanel: null,
  setActiveSidebarPanel: () => {},
};

const BrowserContext = createContext<BrowserContextType>(defaultContext);

export const useBrowser = () => useContext(BrowserContext);

export const BrowserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      title: 'New Tab',
      url: '',
      isActive: true,
      isLoading: false,
      isPinned: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string | null>('1');
  const [isIncognitoMode, setIsIncognitoMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeSidebarPanel, setActiveSidebarPanel] = useState<string | null>(null);

  const addTab = (url = '', title = 'New Tab') => {
    const newTab: Tab = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      url,
      isActive: true,
      isLoading: false,
      isPinned: false,
    };

    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        isActive: false,
      })).concat(newTab)
    );
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string) => {
    setTabs((prevTabs) => {
      const tabIndex = prevTabs.findIndex((tab) => tab.id === id);
      if (prevTabs.length === 1) {
        // If it's the last tab, add a new empty tab
        return [
          {
            id: Math.random().toString(36).substring(2, 9),
            title: 'New Tab',
            url: '',
            isActive: true,
            isLoading: false,
            isPinned: false,
          },
        ];
      }

      const newTabs = prevTabs.filter((tab) => tab.id !== id);
      
      // If we're closing the active tab, activate the next one or the previous one if it's the last
      if (activeTabId === id) {
        const newActiveIndex = tabIndex === prevTabs.length - 1 ? tabIndex - 1 : tabIndex;
        const newActiveTab = newTabs[newActiveIndex];
        if (newActiveTab) {
          newActiveTab.isActive = true;
          setActiveTabId(newActiveTab.id);
        }
      }
      
      return newTabs;
    });
  };

  const activateTab = (id: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        isActive: tab.id === id,
      }))
    );
    setActiveTabId(id);
  };

  const toggleIncognitoMode = () => {
    setIsIncognitoMode((prev) => !prev);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addBookmark = (title: string, url: string, folderId?: string) => {
    const newBookmark: Bookmark = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      url,
      folderId,
    };
    setBookmarks((prev) => [...prev, newBookmark]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleExtension = (id: string) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === id ? { ...ext, isEnabled: !ext.isEnabled } : ext
      )
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <BrowserContext.Provider
      value={{
        currentUrl,
        setCurrentUrl,
        tabs,
        activeTabId,
        addTab,
        closeTab,
        activateTab,
        isIncognitoMode,
        toggleIncognitoMode,
        isLoggedIn,
        login,
        logout,
        bookmarks,
        bookmarkFolders,
        addBookmark,
        removeBookmark,
        history,
        clearHistory,
        downloads,
        extensions,
        toggleExtension,
        searchQuery,
        setSearchQuery,
        isSidebarOpen,
        toggleSidebar,
        activeSidebarPanel,
        setActiveSidebarPanel,
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
};