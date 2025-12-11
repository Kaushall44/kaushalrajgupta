import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Plus, Trash2, Ban } from 'lucide-react';
import { EXPLORER_DATA } from '../constants';
import { FileNode } from '../types';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (fileId: string) => void;
  files: FileNode[];
  height: number;
}

type TerminalTab = 'PROBLEMS' | 'OUTPUT' | 'DEBUG CONSOLE' | 'TERMINAL' | 'GITLENS';

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onOpenFile, files, height }) => {
  const [activeTab, setActiveTab] = useState<TerminalTab>('TERMINAL');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Microsoft Windows [Version 10.0.19045.3693]',
    '(c) Microsoft Corporation. All rights reserved.',
    '',
    'Try "help" to see available commands.',
    ''
  ]);
  const [cwd, setCwd] = useState('C:\\Users\\Kaushal\\Portfolio');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes or when switching back to Terminal tab
  useEffect(() => {
    if (activeTab === 'TERMINAL' && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen, activeTab]);

  // Focus input on click
  const handleContainerClick = () => {
    if (activeTab === 'TERMINAL') {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      const newHistory = [...history, `${cwd}> ${command}`];
      
      if (command) {
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        
        switch (cmd) {
          case 'help':
            newHistory.push(
              'Available commands:',
              '  ls            List directory contents',
              '  cd [dir]      Change directory',
              '  code [file]   Open file in editor',
              '  clear         Clear terminal screen',
              '  whoami        Display current user',
              '  exit          Close terminal',
              '  help          Show this help message'
            );
            break;
            
          case 'ls':
          case 'dir':
            const dirs = ['node_modules', '.git', '.vscode'];
            const fileNames = files.map(f => f.name);
            if (cwd.endsWith('Portfolio')) {
               newHistory.push(...dirs.map(d => `<DIR>          ${d}`));
               newHistory.push(...fileNames.map(f => `               ${f}`));
            } else if (cwd.includes('node_modules')) {
               newHistory.push(...EXPLORER_DATA.nodeModules.map(d => `<DIR>          ${d}`));
            } else if (cwd.includes('.git')) {
               newHistory.push(...EXPLORER_DATA.git.map(f => `               ${f}`));
            } else {
               newHistory.push('Directory is empty.');
            }
            break;

          case 'cd':
            if (args[1]) {
              if (args[1] === '..') {
                const parts = cwd.split('\\');
                if (parts.length > 3) { // Don't go above Root
                  setCwd(parts.slice(0, -1).join('\\'));
                }
              } else {
                const target = args[1].replace('/', '').replace('\\', '');
                if (['node_modules', '.git', '.vscode'].includes(target) && cwd.endsWith('Portfolio')) {
                  setCwd(`${cwd}\\${target}`);
                } else if (cwd.includes('node_modules') && EXPLORER_DATA.nodeModules.includes(target)) {
                   setCwd(`${cwd}\\${target}`);
                } else {
                  newHistory.push(`>>> Error: The system cannot find the path specified: '${args[1]}'.`);
                  newHistory.push(`    - Verify that the directory exists and try again.`);
                }
              }
            } else {
               newHistory.push(cwd);
            }
            break;

          case 'clear':
          case 'cls':
            setHistory([]);
            setInput('');
            return;

          case 'whoami':
            newHistory.push('kaushal\\visitor');
            break;

          case 'code':
            if (args[1]) {
               const fileName = args[1];
               const file = files.find(f => f.name === fileName);
               if (file) {
                 onOpenFile(file.id);
                 newHistory.push(`Opening ${fileName}...`);
               } else {
                 newHistory.push(`>>> Error: File not found: '${fileName}'.`);
                 newHistory.push(`    - Use 'ls' to see a list of available files.`);
               }
            } else {
               newHistory.push('Usage: code [filename]');
            }
            break;

          case 'exit':
            onClose();
            break;

          default:
            newHistory.push(`>>> Error: The term '${cmd}' is not recognized as a command.`);
            newHistory.push(`    - Check the spelling of the command.`);
            newHistory.push(`    - Type "help" to see a list of available commands.`);
        }
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{ height: `${height}px` }}
      className="bg-vscode-sidebar border-t border-vscode-activity flex flex-col font-mono text-sm z-10 w-full animate-slideUp"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-vscode-activity select-none bg-vscode-sidebar">
        <div className="flex gap-6 text-xs text-vscode-text opacity-60 font-semibold">
          {(['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'GITLENS'] as TerminalTab[]).map((tab) => (
            <span 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                cursor-pointer hover:opacity-100 transition-opacity
                ${activeTab === tab ? 'text-vscode-text opacity-100 border-b-2 border-vscode-text pb-1' : ''}
              `}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-vscode-text opacity-60">
           {activeTab === 'TERMINAL' && (
             <div className="flex items-center gap-1 hover:bg-vscode-activity px-1 rounded cursor-pointer" title="New Terminal">
               <Plus className="w-4 h-4" />
               <ChevronDown className="w-3 h-3" />
             </div>
           )}
           {(activeTab === 'OUTPUT' || activeTab === 'TERMINAL') && (
             <div
               title="Clear"
               onClick={() => activeTab === 'TERMINAL' ? setHistory([]) : null}
               className="cursor-pointer"
             >
               <Trash2 className="w-4 h-4 hover:text-vscode-text" />
             </div>
           )}
           <div 
             onClick={onClose} 
             title="Close Panel"
             className="cursor-pointer"
           >
             <X className="w-4 h-4 hover:text-vscode-text" />
           </div>
        </div>
      </div>

      {/* Terminal Body Content */}
      <div 
        className="flex-1 overflow-y-auto bg-vscode-bg" 
        onClick={handleContainerClick}
      >
        {activeTab === 'PROBLEMS' && (
          <div className="p-4 text-vscode-text opacity-70 font-sans">
            <div className="flex items-center gap-2">
               <span className="text-sm">No problems have been detected in the workspace.</span>
            </div>
          </div>
        )}

        {activeTab === 'OUTPUT' && (
          <div className="p-4 font-mono text-vscode-text text-sm">
             <div className="mb-1 opacity-70">[Log] Extension 'kaushal-portfolio' version 1.0.0 activated.</div>
             <div className="mb-1 opacity-70">[Info] React Runtime initialized.</div>
             <div className="mb-1 opacity-70">[Info] Fetching metadata for 5 files...</div>
             <div className="mb-1 opacity-70">[Info] Loaded environment: Production</div>
             <div className="mb-1 text-vscode-blue">[Update] Checking for updates...</div>
             <div className="mb-1 text-vscode-green">[Success] All systems operational. Ready.</div>
          </div>
        )}

        {activeTab === 'DEBUG CONSOLE' && (
          <div className="p-4 font-sans text-vscode-text opacity-80">
            <div className="flex items-center gap-2 mb-2 text-vscode-orange">
              <Ban className="w-4 h-4" />
              <span>Debugging is not available in web mode.</span>
            </div>
            <div className="text-xs font-mono pl-6">
              To debug, please clone the repository locally and run <span className="bg-vscode-activity px-1 rounded">npm run dev</span>.
            </div>
          </div>
        )}

        {activeTab === 'GITLENS' && (
           <div className="p-4 font-mono text-vscode-text">
             <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs opacity-50 uppercase tracking-wider mb-2 font-bold">Current Branch</div>
                  <div className="flex items-center gap-2">
                      <span className="text-vscode-blue font-semibold">main</span>
                      <span className="text-xs bg-vscode-activity px-1 rounded opacity-70">origin/main</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-50 uppercase tracking-wider mb-2 font-bold">Latest Commit</div>
                  <div className="text-sm mb-1">feat: Update portfolio content and structure</div>
                  <div className="text-xs opacity-60 flex gap-2">
                    <span>Kaushal Raj Gupta</span>
                    <span>•</span>
                    <span>2 hours ago</span>
                    <span>•</span>
                    <span className="text-vscode-blue">3f8a1b</span>
                  </div>
                </div>
             </div>
           </div>
        )}

        {activeTab === 'TERMINAL' && (
          <div className="p-4 min-h-full cursor-text">
            {history.map((line, i) => (
              <div 
                key={i} 
                className={`whitespace-pre-wrap leading-5 ${
                  line.trim().startsWith('>>> Error') 
                    ? 'text-red-400' 
                    : 'text-vscode-text'
                }`}
              >
                {line}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-vscode-text mr-2 whitespace-nowrap">{cwd}&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-vscode-text font-mono"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;