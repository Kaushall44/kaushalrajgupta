import React from 'react';
import LineNumbers from '../components/LineNumbers';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const settingsData = {
    "editor.fontSize": 14,
    "editor.fontFamily": "'JetBrains Mono', monospace",
    "editor.tabSize": 2,
    "editor.wordWrap": "on",
    "workbench.colorTheme": theme === 'dark' ? "GitHub Dark" : "Light (Visual Studio)",
    "workbench.iconTheme": "Material Icon Theme",
    "files.autoSave": "afterDelay",
    "terminal.integrated.fontFamily": "'JetBrains Mono', monospace",
    "git.enableSmartCommit": true,
    "portfolio.owner": "Kaushal Raj Gupta",
    "portfolio.status": "Open to work"
  };

  const jsonString = JSON.stringify(settingsData, null, 2);
  const lines = jsonString.split('\n');

  return (
    <div className="flex w-full h-full overflow-auto bg-vscode-bg">
      <LineNumbers lines={lines.length + 5} />
      <div className="flex-1 p-4 font-mono text-sm sm:text-base">
        <div className="mb-4 text-vscode-comment text-xs sm:text-sm">
          // User Settings (JSON)<br/>
          // Controls the appearance and behavior of the portfolio.<br/>
          // <span className="text-vscode-orange">Click on 'workbench.colorTheme' value to switch themes.</span>
        </div>
        <pre>
          <code className="language-json">
            <span className="text-vscode-yellow">&#123;</span>
            {lines.slice(1, -1).map((line, idx) => {
               const [key, value] = line.split(':');
               const formattedKey = key.trim();
               const formattedValue = value ? value.trim().replace(',', '') : '';
               const hasComma = line.trim().endsWith(',');

               // Special interactive logic for theme
               const isThemeKey = formattedKey === '"workbench.colorTheme"';
               
               return (
                 <div key={idx} className="leading-6 hover:bg-vscode-highlight/20 cursor-text group relative">
                   <span className="text-vscode-variable pl-4">{formattedKey}</span>: 
                   
                   {isThemeKey ? (
                      <span 
                        className="text-vscode-string cursor-pointer underline decoration-dotted decoration-vscode-text underline-offset-4 hover:text-vscode-blue transition-colors"
                        onClick={toggleTheme}
                        title="Click to toggle theme"
                      >
                         {formattedValue}
                      </span>
                   ) : (
                      <span className={
                        formattedValue.includes('"') ? 'text-vscode-string' : 
                        formattedValue === 'true' || formattedValue === 'false' ? 'text-vscode-blue' : 
                        'text-vscode-number'
                      }> {formattedValue}</span>
                   )}

                   {hasComma && <span className="text-vscode-text">,</span>}
                   
                   {isThemeKey && (
                     <span className="absolute right-4 text-vscode-comment text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                       // Click to switch theme
                     </span>
                   )}
                 </div>
               )
            })}
            <span className="text-vscode-yellow">&#125;</span>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Settings;