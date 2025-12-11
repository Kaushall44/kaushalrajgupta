import React from 'react';
import LineNumbers from '../components/LineNumbers';
import { ABOUT_DATA } from '../constants';

const About: React.FC = () => {
  const jsonString = JSON.stringify(ABOUT_DATA, null, 2);
  const lines = jsonString.split('\n');

  return (
    <div className="flex w-full h-full overflow-auto bg-vscode-bg">
      <LineNumbers lines={lines.length + 5} />
      <div className="flex-1 p-4 font-mono text-sm sm:text-base">
        <pre>
          <code className="language-json">
            <span className="text-vscode-yellow">&#123;</span>
            {lines.slice(1, -1).map((line, idx) => {
               // Simple manual syntax highlighting logic
               const [key, value] = line.split(':');
               return (
                 <div key={idx} className="leading-6">
                   <span className="text-vscode-variable">{key}</span>:
                   <span className={line.includes('[') || line.includes(']') ? 'text-vscode-yellow' : 'text-vscode-string'}>
                     {value}
                   </span>
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

export default About;
