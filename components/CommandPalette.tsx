import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';

export interface Command {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, commands }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredCommands = commands.filter(cmd => {
    const fullText = `${cmd.category ? cmd.category + ': ' : ''}${cmd.label}`;
    return fullText.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        scrollSelectedIntoView(selectedIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        scrollSelectedIntoView(selectedIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  const scrollSelectedIntoView = (index: number) => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[index] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center pt-2 bg-black/20 backdrop-blur-[1px]" onClick={onClose}>
      <div 
        className="w-[600px] max-w-[90%] bg-vscode-sidebar border border-vscode-activity shadow-2xl rounded-md overflow-hidden flex flex-col h-max max-h-[400px] animate-slideDown"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-2 flex items-center gap-2 border-b border-vscode-activity bg-vscode-bg">
          <span className="text-vscode-text opacity-70"><ChevronRight size={16} /></span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-vscode-text placeholder-gray-500 text-sm font-sans"
            placeholder="Type a command to find..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            spellCheck={false}
          />
        </div>
        <div ref={listRef} className="overflow-y-auto py-1 bg-vscode-sidebar">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 italic">No matching commands found</div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <div
                key={cmd.id}
                className={`px-4 py-2 flex justify-between items-center text-sm cursor-pointer border-l-2 ${
                  index === selectedIndex 
                    ? 'bg-vscode-highlight/40 text-vscode-text border-vscode-blue' 
                    : 'text-vscode-text/80 hover:bg-vscode-highlight/20 border-transparent'
                }`}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {cmd.category ? <span className="opacity-60 font-normal mr-1">{cmd.category}:</span> : ''}
                    {cmd.label}
                  </span>
                </div>
                {cmd.shortcut && (
                  <span className="text-xs opacity-50 bg-vscode-bg px-1.5 py-0.5 rounded border border-vscode-activity">
                    {cmd.shortcut}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;