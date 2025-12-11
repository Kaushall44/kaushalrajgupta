import React, { useState, useEffect } from 'react';
import { FileType, FileNode } from './types';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import SettingsPage from './pages/Settings';
import Resume from './pages/Resume';
import { getFileIcon } from './components/IconHelper';
import JsonLd from './components/JsonLd';
import Terminal from './components/Terminal';
import CommandPalette, { Command as PaletteCommand } from './components/CommandPalette';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Import useTheme
import { EXPLORER_DATA, SOCIAL_LINKS } from './constants';
import { 
  ChevronRight, 
  ChevronDown, 
  X, 
  Search, 
  GitGraph, 
  Files,
  UserCircle,
  Settings,
  Bell,
  MoreVertical,
  ArrowRight,
  Folder,
  RefreshCw,
  Check,
  Code,
  Terminal as TerminalIcon,
  Palette,
  Command,
  Download,
  LogOut,
  Github,
  Linkedin,
  Copy,
  FileText
} from 'lucide-react';

// Define the file system structure
const INITIAL_FILES: FileNode[] = [
  { id: 'home', name: 'README.md', type: FileType.MARKDOWN, content: <Home />, description: "Kaushal Raj Gupta - Portfolio Home" },
  { id: 'about', name: 'about.json', type: FileType.JSON, content: <About />, description: "About Kaushal Raj Gupta - Full Stack Engineer" },
  { id: 'resume', name: 'resume.md', type: FileType.MARKDOWN, content: <Resume />, description: "Resume / CV of Kaushal Raj Gupta" },
  { id: 'projects', name: 'projects.ts', type: FileType.TYPESCRIPT, content: <Projects />, description: "Kaushal Raj Gupta's Open Source Projects" },
  { id: 'contact', name: 'contact.css', type: FileType.CSS, content: <Contact />, description: "Contact Information for Kaushal Raj Gupta" },
  { id: 'settings', name: 'settings.json', type: FileType.JSON, content: <SettingsPage />, description: "User Settings Configuration" },
];

type SidebarView = 'explorer' | 'search' | 'scm' | 'extensions' | 'account' | 'settings';

const AppContent: React.FC = () => {
  const [files] = useState<FileNode[]>(INITIAL_FILES);
  const [openFiles, setOpenFiles] = useState<string[]>(['home']);
  const [activeFileId, setActiveFileId] = useState<string>('home');
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSidebarView, setActiveSidebarView] = useState<SidebarView>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<'explorer' | 'scm' | 'settings' | 'account' | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const { toggleTheme } = useTheme();

  // Terminal Resize State
  const [terminalHeight, setTerminalHeight] = useState(192); // Default 192px (h-48)
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);

  // Section Visibility State (Controlled by the three dots menu)
  const [sidebarSections, setSidebarSections] = useState({
    openEditors: true,
    folders: true,
    outline: false,
    timeline: false
  });

  // Section Expansion State (Accordion open/close)
  const [expandedSections, setExpandedSections] = useState({
    openEditors: true,
    outline: true,
    timeline: true
  });

  // Folder expansion states for the file tree
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'root': true,
    'node_modules': false,
    '.git': false,
    'vscode': true
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [draggedTabId, setDraggedTabId] = useState<string | null>(null);
  
  // Update Logic States
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
         if (isExplorerOpen) setIsExplorerOpen(false);
         // Adjust terminal height on mobile if it's too large
         if (terminalHeight > window.innerHeight * 0.4) {
           setTerminalHeight(window.innerHeight * 0.3);
         }
      } else {
         if (!isExplorerOpen && activeSidebarView === 'explorer') setIsExplorerOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Only run once on mount (and setup listener)

  // Handle Terminal Resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingTerminal) return;
      
      // Calculate new height: Total Window Height - Mouse Y Position - Footer Height (24px)
      // We essentially want the space from the mouse cursor to the top of the footer.
      const newHeight = window.innerHeight - e.clientY - 24;
      
      // Constraints: Min 100px, Max 80% of window height
      if (newHeight > 100 && newHeight < window.innerHeight * 0.8) {
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizingTerminal(false);
    };

    if (isResizingTerminal) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingTerminal]);


  // Helper to close a file by ID (reused by keyboard shortcut and click handler)
  const closeFileById = (fileId: string) => {
    const newOpenFiles = openFiles.filter(id => id !== fileId);
    setOpenFiles(newOpenFiles);
    
    if (activeFileId === fileId) {
      if (newOpenFiles.length > 0) {
        // Default to the last opened file
        setActiveFileId(newOpenFiles[newOpenFiles.length - 1]);
      } else {
        setActiveFileId('');
      }
    }
  };
  
  // Helper for notifications
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Helper for Check Updates
  const checkForUpdates = () => {
      setActiveMenu(null);
      setIsCheckingUpdates(true);
      // Simulate network request
      setTimeout(() => {
          setIsCheckingUpdates(false);
          setShowUpdateModal(true);
      }, 1500);
  };

  const handleDownloadResume = () => {
      showNotification("Downloading Resume...");
      // Simulate download
      setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/Kaushal_Raj_Gupta.pdf'; 
          link.download = 'Kaushal_Raj_Gupta_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }, 1000);
  };

  const handleFileClick = (fileId: string) => {
    if (!openFiles.includes(fileId)) {
      setOpenFiles([...openFiles, fileId]);
    }
    setActiveFileId(fileId);
    if (isMobile) setIsExplorerOpen(false);
    // Close menus if open
    setActiveMenu(null);
  };

  // Commands Definition for Palette
  const commands: PaletteCommand[] = [
    { id: '1', label: 'Go to File: Home (README.md)', category: 'File', action: () => handleFileClick('home') },
    { id: '2', label: 'Go to File: About', category: 'File', action: () => handleFileClick('about') },
    { id: '3', label: 'Go to File: Projects', category: 'File', action: () => handleFileClick('projects') },
    { id: '4', label: 'Go to File: Contact', category: 'File', action: () => handleFileClick('contact') },
    { id: '5', label: 'Go to File: Resume', category: 'File', action: () => handleFileClick('resume') },
    { id: '6', label: 'Go to File: Settings', category: 'File', action: () => handleFileClick('settings') },
    { id: '7', label: 'Close Active File', category: 'File', shortcut: 'Ctrl+W', action: () => activeFileId && closeFileById(activeFileId) },
    { id: '8', label: 'Toggle Terminal', category: 'View', shortcut: 'Ctrl+`', action: () => setIsTerminalOpen(prev => !prev) },
    { id: '9', label: 'Toggle Explorer', category: 'View', action: () => setIsExplorerOpen(prev => !prev) },
    { id: '10', label: 'Toggle Color Theme', category: 'Preferences', action: () => toggleTheme() },
    { id: '11', label: 'Download Resume (PDF)', category: 'File', action: () => handleDownloadResume() },
    { id: '12', label: 'Check for Updates', category: 'Help', action: () => checkForUpdates() },
    { id: '13', label: 'Show All Commands', category: 'Help', shortcut: 'Ctrl+Shift+P', action: () => setIsCommandPaletteOpen(true) },
    { id: '14', label: 'Sign Out', category: 'Account', action: () => setIsLoggedIn(false) },
  ];

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette (Ctrl + Shift + P)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
        setIsCommandPaletteOpen(prev => !prev);
        return;
      }

      // Toggle Terminal with Ctrl + `
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        e.stopPropagation();
        setIsTerminalOpen(prev => !prev);
        return;
      }
      
      // Close Active File (Ctrl + W)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'w' || e.key === 'W')) {
        e.preventDefault(); 
        e.stopPropagation();
        if (activeFileId) {
          closeFileById(activeFileId);
        }
        return;
      }

      // Switch Open Files (Ctrl + Tab)
      if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
         e.preventDefault();
         e.stopPropagation();
         
         if (openFiles.length > 1) {
            const currentIndex = openFiles.indexOf(activeFileId);
            // Handle Shift for reverse cycling
            const direction = e.shiftKey ? -1 : 1;
            
            let nextIndex = currentIndex + direction;
            // Handle wrap-around
            if (nextIndex >= openFiles.length) nextIndex = 0;
            if (nextIndex < 0) nextIndex = openFiles.length - 1;
            
            setActiveFileId(openFiles[nextIndex]);
         }
         return;
      }
    };
    
    // Use capture phase to intercept events before browser defaults where possible
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [activeFileId, openFiles, isTerminalOpen]);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // SEO: Update Title and Meta Description based on active file
  useEffect(() => {
    const activeFile = files.find(f => f.id === activeFileId);
    if (activeFile) {
      document.title = `${activeFile.name} - Kaushal Raj Gupta`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', activeFile.description || '');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = activeFile.description || '';
        document.head.appendChild(meta);
      }
    }
  }, [activeFileId, files]);


  const closeFile = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    closeFileById(fileId);
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const toggleSectionExpansion = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSectionVisibility = (section: keyof typeof sidebarSections) => {
    setSidebarSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSidebarClick = (view: SidebarView) => {
    if (activeSidebarView === view && isExplorerOpen) {
      setIsExplorerOpen(false);
    } else {
      setActiveSidebarView(view);
      setIsExplorerOpen(true);
      // Focus search input if opening search
      if (view === 'search') {
        setTimeout(() => document.getElementById('search-input')?.focus(), 50);
      }
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, fileId: string) => {
    setDraggedTabId(fileId);
    e.dataTransfer.effectAllowed = 'move';
    // Remove transparency on drag image if possible, or style the dragging element
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedTabId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetFileId: string) => {
    e.preventDefault();
    if (!draggedTabId || draggedTabId === targetFileId) return;

    const oldIndex = openFiles.indexOf(draggedTabId);
    const newIndex = openFiles.indexOf(targetFileId);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOpenFiles = [...openFiles];
      newOpenFiles.splice(oldIndex, 1);
      newOpenFiles.splice(newIndex, 0, draggedTabId);
      setOpenFiles(newOpenFiles);
    }
    setDraggedTabId(null);
  };

  // If not logged in, show Login Screen
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-vscode-bg text-vscode-text font-mono select-none px-4 text-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-vscode-sidebar flex items-center justify-center mb-6 ring-4 ring-vscode-activity shadow-2xl">
           <UserCircle className="w-12 h-12 sm:w-16 sm:h-16 text-vscode-text opacity-80" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Kaushal Raj Gupta</h1>
        <p className="text-gray-500 mb-8 text-sm">Senior Full Stack Engineer</p>
        
        <button 
            onClick={() => {
                setIsLoggedIn(true);
                showNotification("Welcome back!");
            }}
            className="bg-vscode-blue text-white px-8 sm:px-10 py-2.5 text-sm font-medium rounded hover:bg-opacity-90 transition-all shadow-lg hover:shadow-vscode-blue/20 flex items-center gap-2"
        >
            Enter Portfolio <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  const activeFileNode = files.find(f => f.id === activeFileId);

  // Filter files for search
  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-screen text-vscode-text bg-vscode-bg font-mono overflow-hidden transition-colors duration-300">
      <JsonLd />
      
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        commands={commands}
      />

      {/* Update Check Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setShowUpdateModal(false)}>
          <div className="bg-vscode-sidebar border border-vscode-activity shadow-2xl p-6 w-[400px] max-w-[90%] rounded shadow-black/50" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl text-vscode-text font-semibold mb-2">No Updates Available</h2>
            <p className="text-vscode-text opacity-80 mb-6 leading-relaxed">
                You are currently running the latest version of <span className="font-semibold text-vscode-blue">Kaushal Raj Gupta Portfolio (v2.0.0)</span>.
            </p>
            <div className="flex justify-end">
                <button 
                    className="bg-vscode-blue text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors font-medium text-sm"
                    onClick={() => setShowUpdateModal(false)}
                >
                    OK
                </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Flex Container */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Activity Bar (Far Left Icon Strip) */}
        <aside className="w-12 bg-vscode-activity flex flex-col items-center py-4 justify-between border-r border-vscode-sidebar z-40 select-none transition-colors duration-300 shrink-0">
          <div className="flex flex-col gap-6">
            <div 
              className={`cursor-pointer transition-colors border-l-2 p-2 relative ${activeSidebarView === 'explorer' && isExplorerOpen ? 'border-vscode-text text-vscode-text' : 'border-transparent text-gray-500 hover:text-vscode-text'}`}
              onClick={() => handleSidebarClick('explorer')}
              title="Explorer (Ctrl+Shift+E)"
            >
              <Files className="w-6 h-6" />
            </div>
            <div 
              className={`cursor-pointer transition-colors border-l-2 p-2 ${activeSidebarView === 'search' && isExplorerOpen ? 'border-vscode-text text-vscode-text' : 'border-transparent text-gray-500 hover:text-vscode-text'}`}
              onClick={() => handleSidebarClick('search')}
              title="Search (Ctrl+Shift+F)"
            >
              <Search className="w-6 h-6" />
            </div>
            <div 
              className={`cursor-pointer transition-colors border-l-2 p-2 ${activeSidebarView === 'scm' && isExplorerOpen ? 'border-vscode-text text-vscode-text' : 'border-transparent text-gray-500 hover:text-vscode-text'}`}
              onClick={() => handleSidebarClick('scm')}
              title="Source Control (Ctrl+Shift+G)"
            >
              <GitGraph className="w-6 h-6" />
              {/* Git Badge */}
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-vscode-blue hidden"></div>
            </div>
          </div>
          <div className="flex flex-col gap-6 mb-2">
            
            {/* Account Icon with Menu */}
            <div className="relative">
                <div 
                  className={`cursor-pointer transition-colors p-2 ${activeMenu === 'account' ? 'text-vscode-text' : 'text-gray-500 hover:text-vscode-text'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === 'account' ? null : 'account');
                  }}
                  title="Accounts"
                >
                  <UserCircle className="w-6 h-6" />
                </div>
                
                {activeMenu === 'account' && (
                  <div className="absolute left-10 bottom-2 w-64 bg-vscode-sidebar border border-vscode-activity shadow-xl rounded-sm py-1 z-50 text-sm normal-case text-vscode-text">
                    <div className="px-4 py-2 border-b border-vscode-activity mb-1">
                        <div className="font-semibold">Kaushal Raj Gupta</div>
                        <div className="text-xs opacity-60">github.com/kaushall44</div>
                    </div>
                    
                    <a 
                      href={SOCIAL_LINKS.find(s => s.name === 'GitHub')?.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" /> GitHub Profile
                    </a>
                    
                    <a 
                      href={SOCIAL_LINKS.find(s => s.name === 'LinkedIn')?.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn Profile
                    </a>

                    <div 
                        className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            navigator.clipboard.writeText(SOCIAL_LINKS.find(s => s.name === 'Email')?.url.replace('mailto:', '') || '');
                            showNotification("Email copied to clipboard");
                            setActiveMenu(null);
                        }}
                    >
                        <Copy className="w-4 h-4" /> Copy Email
                    </div>
                    
                    <div className="h-[1px] bg-vscode-activity my-1"></div>

                    <div 
                        className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            handleDownloadResume();
                            setActiveMenu(null);
                        }}
                    >
                        <Download className="w-4 h-4" /> Download Resume
                    </div>

                    <div className="h-[1px] bg-vscode-activity my-1"></div>
                    
                    <div 
                      className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2 text-red-400 hover:text-white"
                      onClick={() => {
                         setActiveMenu(null);
                         showNotification("Signing out...");
                         setTimeout(() => setIsLoggedIn(false), 500);
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </div>
                  </div>
                )}
            </div>
            
            {/* Settings Gear with Menu */}
            <div className="relative">
              <div 
                className={`cursor-pointer transition-colors p-2 ${activeMenu === 'settings' ? 'text-vscode-text' : 'text-gray-500 hover:text-vscode-text'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === 'settings' ? null : 'settings');
                }}
                title="Manage"
              >
                <Settings className="w-6 h-6" />
              </div>
              
              {activeMenu === 'settings' && (
                <div className="absolute left-10 bottom-2 w-56 bg-vscode-sidebar border border-vscode-activity shadow-xl rounded-sm py-1 z-50 text-sm normal-case text-vscode-text">
                  <div 
                    className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2" 
                    onClick={() => {
                      setIsCommandPaletteOpen(true);
                      setActiveMenu(null);
                    }}
                  >
                    <Command className="w-4 h-4" /> Command Palette...
                  </div>
                  <div 
                    className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2"
                    onClick={() => handleFileClick('settings')}
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </div>
                  <div className="h-[1px] bg-vscode-activity my-1"></div>
                  <div 
                    className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      toggleTheme();
                      setActiveMenu(null);
                    }}
                  >
                    <Palette className="w-4 h-4" /> Color Theme
                  </div>
                  <div className="h-[1px] bg-vscode-activity my-1"></div>
                  <div 
                    className="px-4 py-1.5 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center gap-2"
                    onClick={() => checkForUpdates()}
                  >
                    <Download className="w-4 h-4" /> Check for Updates...
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Sidebar Panel */}
        {isExplorerOpen && (
          <>
            {/* Mobile Backdrop */}
            {isMobile && (
              <div 
                className="absolute inset-0 z-20 bg-black/50 backdrop-blur-[1px]"
                onClick={() => setIsExplorerOpen(false)}
              ></div>
            )}
            <nav className={`
              w-64 bg-vscode-sidebar flex flex-col border-r border-vscode-activity/30 transition-colors duration-300 z-30 shrink-0
              ${isMobile ? 'absolute left-12 top-0 bottom-0 shadow-2xl h-full' : 'relative'}
            `}>
              
              {/* Explorer View */}
              {activeSidebarView === 'explorer' && (
                <>
                  <div className="h-9 px-4 flex items-center justify-between text-xs tracking-wider uppercase text-gray-500 font-semibold select-none shrink-0">
                    <span>Explorer</span>
                    <div className="relative">
                      <MoreVertical 
                        className="w-4 h-4 cursor-pointer hover:text-vscode-text" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === 'explorer' ? null : 'explorer');
                        }}
                      />
                      {activeMenu === 'explorer' && (
                        <div className="absolute right-0 top-6 w-52 bg-vscode-sidebar border border-vscode-activity shadow-xl rounded-sm py-1 z-50 text-sm normal-case text-vscode-text">
                          <div 
                            className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center justify-between" 
                            onClick={() => toggleSectionVisibility('openEditors')}
                          >
                            <span>Open Editors</span>
                            {sidebarSections.openEditors && <Check className="w-3 h-3" />}
                          </div>
                          <div 
                            className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center justify-between" 
                            onClick={() => toggleSectionVisibility('folders')}
                          >
                            <span>Folders</span>
                            {sidebarSections.folders && <Check className="w-3 h-3" />}
                          </div>
                          <div 
                            className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center justify-between" 
                            onClick={() => toggleSectionVisibility('outline')}
                          >
                            <span>Outline</span>
                            {sidebarSections.outline && <Check className="w-3 h-3" />}
                          </div>
                          <div 
                            className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer flex items-center justify-between" 
                            onClick={() => toggleSectionVisibility('timeline')}
                          >
                            <span>Timeline</span>
                            {sidebarSections.timeline && <Check className="w-3 h-3" />}
                          </div>
                          <div className="h-[1px] bg-vscode-activity my-1"></div>
                          <div className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer" onClick={() => { setExpandedFolders({ root: true }); showNotification("Collapsed All Folders"); }}>
                            <span>Collapse Folders</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    {/* OPEN EDITORS SECTION */}
                    {sidebarSections.openEditors && (
                      <div className="w-full">
                         <div 
                           className="flex items-center px-1 py-1 cursor-pointer text-xs font-bold text-gray-500 hover:text-vscode-text transition-colors"
                           onClick={() => toggleSectionExpansion('openEditors')}
                         >
                           {expandedSections.openEditors ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                           OPEN EDITORS
                         </div>
                         {expandedSections.openEditors && (
                           <div className="pl-0 pb-2">
                              {openFiles.length === 0 && <div className="px-6 text-xs text-gray-500 italic">No open editors</div>}
                              {openFiles.map(id => {
                                const file = files.find(f => f.id === id);
                                if (!file) return null;
                                return (
                                  <div 
                                    key={id}
                                    className={`group flex items-center justify-between px-3 py-1 cursor-pointer text-sm hover:bg-vscode-highlight/20 transition-colors ${activeFileId === id ? 'bg-vscode-highlight/40 text-vscode-text' : 'text-gray-500'}`}
                                    onClick={() => handleFileClick(id)}
                                  >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                       <span className="shrink-0 text-xs text-gray-500 opacity-70 group-hover:opacity-100"><X className="w-3 h-3 opacity-0" /></span>
                                       <span className="flex items-center gap-1.5 truncate">
                                         {getFileIcon(file.type)}
                                         {file.name}
                                       </span>
                                    </div>
                                    <span 
                                      className={`opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-0.5 ${activeFileId === id ? 'opacity-100' : ''}`}
                                      onClick={(e) => closeFile(e, id)}
                                    >
                                      <X className="w-3 h-3" />
                                    </span>
                                  </div>
                                );
                              })}
                           </div>
                         )}
                      </div>
                    )}

                    {/* FOLDERS SECTION (KAUSHAL-PORTFOLIO) */}
                    {sidebarSections.folders && (
                      <div className="px-0 py-0">
                        <div 
                          className="flex items-center cursor-pointer text-gray-500 font-bold text-xs px-1 py-1 hover:bg-vscode-highlight/20 transition-colors"
                          onClick={() => toggleFolder('root')}
                        >
                          {expandedFolders['root'] ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                          KAUSHAL-PORTFOLIO
                        </div>
                        
                        {/* File Tree */}
                        {expandedFolders['root'] && (
                          <div className="pl-0">
                            {/* Interactive node_modules */}
                            <div 
                              className="flex items-center px-3 py-1 cursor-pointer text-sm text-gray-500 hover:bg-vscode-highlight/20 transition-colors"
                              onClick={() => toggleFolder('node_modules')}
                            >
                              {expandedFolders['node_modules'] ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                              <span className="mr-2">node_modules</span>
                            </div>
                            {expandedFolders['node_modules'] && (
                              <div className="pl-5">
                                {EXPLORER_DATA.nodeModules.map((item) => (
                                  <div 
                                    key={item} 
                                    className="flex items-center px-4 py-0.5 cursor-pointer text-sm text-gray-500 hover:text-vscode-text transition-colors"
                                    onClick={() => showNotification(`Opened ${item} (Read Only)`)}
                                  >
                                    <ChevronRight className="w-3 h-3 mr-1 opacity-50" />
                                    <Folder className="w-3 h-3 mr-2 text-vscode-blue" />
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Interactive .git */}
                            <div 
                              className="flex items-center px-3 py-1 cursor-pointer text-sm text-gray-500 hover:bg-vscode-highlight/20 transition-colors"
                              onClick={() => {
                                toggleFolder('.git');
                                showNotification("System Folder: Git Repository Configuration");
                              }}
                            >
                              {expandedFolders['.git'] ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                              <span className="mr-2">.git</span>
                            </div>
                            {expandedFolders['.git'] && (
                               <div className="pl-5">
                                 {EXPLORER_DATA.git.map((item) => (
                                  <div 
                                    key={item} 
                                    className="flex items-center px-4 py-0.5 cursor-pointer text-sm text-gray-500 hover:text-vscode-text transition-colors"
                                    onClick={() => showNotification(`Git internal: ${item}`)}
                                  >
                                    {item.includes('.') ? <Code className="w-3 h-3 mr-2 text-gray-500" /> : <Folder className="w-3 h-3 mr-2 text-gray-500" />}
                                    {item}
                                  </div>
                                ))}
                               </div>
                            )}

                            {/* Actual Files (excluding settings.json from tree to mimic hidden/dotfiles or just active files) */}
                            {files.filter(f => f.id !== 'settings').map(file => (
                              <div 
                                key={file.id}
                                onClick={() => handleFileClick(file.id)}
                                className={`flex items-center px-3 py-1 cursor-pointer text-sm border-l-2 border-transparent hover:bg-vscode-highlight/20 transition-colors pl-5
                                  ${activeFileId === file.id ? 'bg-vscode-highlight/40 text-vscode-text border-vscode-blue' : 'text-gray-500'}
                                `}
                              >
                                <div className="mr-2">
                                  {getFileIcon(file.type)}
                                </div>
                                {file.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* OUTLINE SECTION */}
                    {sidebarSections.outline && (
                      <div className="w-full">
                         <div 
                           className="flex items-center px-1 py-1 cursor-pointer text-xs font-bold text-gray-500 hover:text-vscode-text transition-colors border-t border-vscode-activity"
                           onClick={() => toggleSectionExpansion('outline')}
                         >
                           {expandedSections.outline ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                           OUTLINE
                         </div>
                         {expandedSections.outline && (
                           <div className="px-6 py-2 text-xs text-gray-500 italic">
                             No outline information available.
                           </div>
                         )}
                      </div>
                    )}

                    {/* TIMELINE SECTION */}
                    {sidebarSections.timeline && (
                      <div className="w-full">
                         <div 
                           className="flex items-center px-1 py-1 cursor-pointer text-xs font-bold text-gray-500 hover:text-vscode-text transition-colors border-t border-vscode-activity"
                           onClick={() => toggleSectionExpansion('timeline')}
                         >
                           {expandedSections.timeline ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                           TIMELINE
                         </div>
                         {expandedSections.timeline && (
                           <div className="px-6 py-2 text-xs text-gray-500 italic">
                             No timeline information available.
                           </div>
                         )}
                      </div>
                    )}

                  </div>
                </>
              )}

              {/* Search View */}
              {activeSidebarView === 'search' && (
                <div className="flex flex-col h-full">
                  <div className="h-9 px-4 flex items-center justify-between text-xs tracking-wider uppercase text-gray-500 font-semibold select-none shrink-0">
                    <span>Search</span>
                    <RefreshCw className="w-3 h-3 cursor-pointer hover:text-vscode-text" onClick={() => setSearchQuery('')} />
                  </div>
                  <div className="px-4 py-2 shrink-0">
                    <div className="bg-vscode-bg border border-vscode-activity focus-within:border-vscode-blue flex items-center px-2 py-1 rounded-sm relative">
                      <input 
                         id="search-input"
                         type="text" 
                         className="bg-transparent border-none text-vscode-text text-sm focus:outline-none w-full placeholder-gray-500 py-1"
                         placeholder="Search files"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         autoComplete="off"
                      />
                      {searchQuery && (
                        <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-vscode-text" onClick={() => setSearchQuery('')} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-0">
                     {searchQuery && (
                       <>
                          <div className="text-xs text-gray-400 mb-2 px-4 uppercase">{filteredFiles.length} results</div>
                          {filteredFiles.map(file => (
                            <div 
                              key={file.id} 
                              className="text-sm text-vscode-text cursor-pointer hover:bg-vscode-highlight/20 px-4 py-1 flex flex-col"
                              onClick={() => handleFileClick(file.id)}
                            >
                              <div className="flex items-center gap-2">
                                {getFileIcon(file.type)}
                                <span className="font-semibold">{file.name}</span>
                              </div>
                              <span className="text-xs text-gray-500 ml-6 truncate">{file.description}</span>
                            </div>
                          ))}
                       </>
                     )}
                     {!searchQuery && (
                        <div className="px-4 text-xs text-gray-500 mt-4 text-center">
                          Search for files by name<br/>(e.g. "projects", "css")
                        </div>
                     )}
                  </div>
                </div>
              )}

              {/* Source Control View */}
              {activeSidebarView === 'scm' && (
                <div className="flex flex-col h-full">
                  <div className="h-9 px-4 flex items-center justify-between text-xs tracking-wider uppercase text-gray-500 font-semibold select-none shrink-0">
                    <span>Source Control</span>
                    <div className="flex gap-2 relative">
                      <Files className="w-4 h-4 cursor-pointer hover:text-vscode-text" onClick={() => showNotification("View as Tree")} />
                      <MoreVertical 
                        className="w-4 h-4 cursor-pointer hover:text-vscode-text" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === 'scm' ? null : 'scm');
                        }}
                      />
                      {activeMenu === 'scm' && (
                        <div className="absolute right-0 top-6 w-48 bg-vscode-sidebar border border-vscode-activity shadow-xl rounded-sm py-1 z-50 text-sm normal-case text-vscode-text">
                           <div className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer" onClick={() => showNotification("View as List")}>
                             <span>View as List</span>
                           </div>
                           <div className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer" onClick={() => showNotification("View as Tree")}>
                             <span>View as Tree</span>
                           </div>
                           <div className="h-[1px] bg-vscode-activity my-1"></div>
                           <div className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer" onClick={() => showNotification("Commit All")}>
                             <span>Commit All</span>
                           </div>
                           <div className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer" onClick={() => showNotification("Pull")}>
                             <span>Pull</span>
                           </div>
                           <div className="px-3 py-1 hover:bg-vscode-highlight hover:text-white cursor-pointer" onClick={() => showNotification("Push")}>
                             <span>Push</span>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-vscode-bg m-2 rounded-sm border border-vscode-activity shrink-0">
                      <div className="flex items-center justify-between text-xs text-vscode-text mb-2">
                        <span>Message</span>
                      </div>
                      <input className="w-full bg-vscode-bg text-sm p-1 text-vscode-text focus:outline-none border border-transparent focus:border-vscode-blue placeholder-gray-500" placeholder="Message (Ctrl+Enter)"/>
                      <button 
                        className="w-full mt-2 bg-vscode-blue text-white text-xs py-1 hover:bg-opacity-90 flex items-center justify-center gap-1"
                        onClick={() => showNotification("Commit successful (Simulation)")}
                      >
                        <Check className="w-3 h-3" /> Commit
                      </button>
                  </div>
                  <div className="px-4 py-2 flex-1 text-sm text-gray-500 text-center mt-4">
                     <div className="flex flex-col items-center opacity-60">
                        <GitGraph className="w-12 h-12 mb-2" />
                        <span>No changes detected.</span>
                        <span className="text-xs mt-1">Working tree is clean.</span>
                     </div>
                  </div>
                </div>
              )}
              
            </nav>
          </>
        )}

        {/* Editor & Terminal Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-vscode-bg relative transition-colors duration-300">
          
          {/* Notification Toast */}
          {notification && (
            <div className="absolute top-4 right-4 bg-vscode-sidebar text-vscode-text px-4 py-3 rounded shadow-lg border border-vscode-activity z-50 flex items-center gap-3 animate-slideIn transition-all">
              <div className="w-2 h-2 rounded-full bg-vscode-blue"></div>
              {notification}
            </div>
          )}

          {/* Tabs Bar */}
          <div className="flex bg-vscode-sidebar overflow-x-auto border-b border-vscode-activity/50 scrollbar-hide h-9 shrink-0 transition-colors duration-300">
             {openFiles.map(fileId => {
               const file = files.find(f => f.id === fileId);
               if (!file) return null;
               const isActive = activeFileId === fileId;

               return (
                 <div 
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, file.id)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, file.id)}
                    className={`
                      flex items-center px-3 min-w-[120px] max-w-[200px] h-full text-sm cursor-pointer border-r border-vscode-activity/20 select-none group relative transition-colors
                      ${isActive ? 'bg-vscode-bg text-vscode-text border-t-2 border-t-vscode-blue' : 'bg-vscode-tabInactive text-gray-500 hover:bg-vscode-bg/50'}
                    `}
                 >
                   <span className="mr-2">{getFileIcon(file.type, "w-3 h-3")}</span>
                   <span className="flex-1 truncate">{file.name}</span>
                   <span 
                      onClick={(e) => closeFile(e, file.id)}
                      className={`ml-2 p-0.5 rounded-md hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}
                   >
                     <X className="w-3 h-3" />
                   </span>
                 </div>
               );
             })}
          </div>

          {/* Breadcrumbs (Visual only) */}
          <div className="h-6 flex items-center px-4 text-xs text-gray-500 bg-vscode-bg shadow-sm shrink-0 transition-colors duration-300">
             <span className="mr-1 hover:text-vscode-text cursor-pointer">kaushal-portfolio</span>
             <ChevronRight className="w-3 h-3 mx-1" />
             <span className="text-vscode-text flex items-center gap-1">
               {activeFileNode && getFileIcon(activeFileNode.type, "w-3 h-3")}
               {activeFileNode?.name || 'Welcome'}
             </span>
          </div>

          {/* Content Render Area */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            <div className="flex-1 overflow-auto">
              {activeFileNode ? (
                activeFileNode.content
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-30 select-none">
                  <div className="w-32 h-32 bg-no-repeat bg-contain bg-center opacity-20 mb-4" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg)'}}></div>
                  <div className="text-sm flex gap-8 text-gray-500">
                    <div className="text-center"><span className="block mb-1 text-gray-400">Show All Commands</span><kbd className="bg-gray-800 px-2 py-1 rounded text-xs">Ctrl+Shift+P</kbd></div>
                    <div className="text-center"><span className="block mb-1 text-gray-400">Go to File</span><kbd className="bg-gray-800 px-2 py-1 rounded text-xs">Ctrl+P</kbd></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Terminal Panel */}
          {isTerminalOpen && (
            <>
              {/* Resize Handle */}
              <div 
                className="h-1 cursor-row-resize hover:bg-vscode-blue transition-colors w-full z-20"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsResizingTerminal(true);
                }}
              />
              <Terminal 
                isOpen={isTerminalOpen} 
                onClose={() => setIsTerminalOpen(false)} 
                files={files}
                onOpenFile={handleFileClick}
                height={terminalHeight}
              />
            </>
          )}

        </main>
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-vscode-blue text-white text-xs flex items-center justify-between px-3 select-none z-30 shrink-0">
        <div className="flex items-center gap-4">
           <a href="https://github.com/kaushall44/kaushalrajgupta" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer">
             <GitGraph className="w-3 h-3" />
             <span className="font-bold">main*</span>
           </a>
           <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded" onClick={() => showNotification("No errors detected")}>
             <div className="w-3 h-3 rounded-full border border-white/50 flex items-center justify-center text-[8px]">×</div>
             0
             <div className="w-3 h-3 rounded-full border border-white/50 flex items-center justify-center text-[8px] ml-1">!</div>
             0
           </div>
           {isCheckingUpdates && (
            <div className="flex items-center gap-1.5 px-2 transition-all">
                <RefreshCw className="w-3 h-3 animate-spin" />
            </div>
           )}
           <div 
             className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded" 
             onClick={() => setIsTerminalOpen(!isTerminalOpen)}
             title="Toggle Terminal (Ctrl + `)"
           >
              <TerminalIcon className="w-3 h-3" />
           </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Ln {Math.floor(Math.random() * 100)}, Col {Math.floor(Math.random() * 20)}</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">M {activeFileNode ? activeFileNode.type : 'Plain Text'}</span>
          <span className="hover:bg-white/10 px-1 rounded cursor-pointer" onClick={() => showNotification("Formatting...")}>Prettier</span>
          <span className="hover:bg-white/10 px-1 rounded cursor-pointer" onClick={() => showNotification("Notifications")}>
             <Bell className="w-3 h-3" />
          </span>
        </div>
      </footer>
    </div>
  );
};

// Wrapper App component to provide context
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;