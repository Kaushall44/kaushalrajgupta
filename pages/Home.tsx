import React from 'react';
import LineNumbers from '../components/LineNumbers';
import { ABOUT_DATA } from '../constants';
import { Download } from 'lucide-react';

const Home: React.FC = () => {
  const handleDownload = () => {
      const link = document.createElement('a');
      link.href = '/Kaushal_Raj_Gupta.pdf';
      link.download = 'Kaushal_Raj_Gupta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="flex w-full h-full overflow-auto bg-vscode-bg">
      <LineNumbers lines={25} />
      <article className="flex-1 p-4 font-mono text-sm sm:text-base selection:bg-vscode-highlight">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-vscode-text">
          <span className="text-vscode-blue">#</span> Hi, I'm {ABOUT_DATA.name} <span className="animate-pulse">👋</span>
        </h1>
        
        <div className="space-y-4 text-vscode-text opacity-90">
          <p className="leading-7">
            <span className="text-vscode-comment">// {ABOUT_DATA.role} based in {ABOUT_DATA.location}</span>
          </p>
          
          <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-vscode-text">
            <span className="text-vscode-blue">##</span> About Me
          </h2>
          <p className="max-w-3xl leading-relaxed">
            I specialize in securing digital infrastructure and identifying critical vulnerabilities. Currently, I'm focused on Application Security (AppSec) and ethical hacking, working to bridge the gap between complex software engineering and robust cyber defense.
          </p>
          
          <div className="mt-8">
            <p className="text-vscode-keyword">const</p> 
            <span className="text-vscode-variable">workflow</span> 
            <span className="text-vscode-text"> = </span>
            <span className="text-vscode-yellow">()</span> 
            <span className="text-vscode-blue"> =&gt; </span> 
            <span className="text-vscode-yellow">&#123;</span>
          </div>
          
          <div className="pl-4 sm:pl-8 space-y-1">
            <p>
              <span className="text-vscode-keyword">while</span>
              <span className="text-vscode-yellow">(</span>
              <span className="text-vscode-variable">alive</span>
              <span className="text-vscode-yellow">)</span> 
              <span className="text-vscode-yellow">&#123;</span>
            </p>
            <div className="pl-4">
              <p><span className="text-vscode-function">eat</span>();</p>
              <p><span className="text-vscode-function">sleep</span>();</p>
              <p><span className="text-vscode-function">code</span>();</p>
              <p><span className="text-vscode-function">repeat</span>();</p>
            </div>
            <p className="text-vscode-yellow">&#125;</p>
          </div>
          <div className="text-vscode-yellow">&#125;;</div>

          <div className="mt-8 p-4 bg-vscode-tabInactive/30 border-l-4 border-vscode-blue rounded-r flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-vscode-text italic">
              "Check out <span className="text-vscode-orange">projects.ts</span> to see my work or <span className="text-vscode-orange">contact.css</span> to get in touch!"
            </p>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-1.5 bg-vscode-activity hover:bg-vscode-highlight rounded text-xs transition-colors whitespace-nowrap"
            >
               <Download size={14} /> Download Resume
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Home;