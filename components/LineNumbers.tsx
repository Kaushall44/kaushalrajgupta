import React from 'react';

const LineNumbers: React.FC<{ lines: number }> = ({ lines }) => {
  return (
    <div className="flex flex-col line-numbers font-mono text-sm py-4 bg-vscode-bg select-none" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i} className="leading-6 text-right hover:text-vscode-text transition-colors">
          {i + 1}
        </span>
      ))}
    </div>
  );
};

export default LineNumbers;
