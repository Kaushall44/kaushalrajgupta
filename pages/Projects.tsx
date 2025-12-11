import React from 'react';
import LineNumbers from '../components/LineNumbers';
import { PROJECTS, SOCIAL_LINKS } from '../constants';
import { Star, GitFork, ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const githubLink = SOCIAL_LINKS.find(link => link.name === 'GitHub')?.url || 'https://github.com';

  return (
    <div className="flex w-full h-full overflow-auto bg-vscode-bg">
      <LineNumbers lines={40} />
      <main className="flex-1 p-4 md:p-10">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-vscode-text flex flex-wrap items-center gap-2">
          <span className="text-vscode-keyword">export const</span> 
          <span className="text-vscode-variable">projects</span>
          <span className="text-vscode-text"> = </span>
          <span className="text-vscode-yellow">[</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2 sm:pl-4">
          {PROJECTS.map((project, index) => (
            <article 
              key={index}
              className="group bg-vscode-sidebar border border-vscode-activity rounded-md p-4 hover:border-vscode-text transition-all duration-200 flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-vscode-blue group-hover:underline cursor-pointer flex items-center gap-2">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {project.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </h2>
                <span className="text-xs border border-vscode-activity rounded-full px-2 py-0.5 text-vscode-text">
                  {project.language}
                </span>
              </div>
              
              <p className="text-vscode-text opacity-80 text-sm mb-4 h-12 line-clamp-2 flex-grow">
                {project.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-vscode-text opacity-60 mt-auto pt-2">
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={14} />
                  <span>{project.forks}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs text-vscode-blue bg-vscode-activity/50 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <h1 className="text-2xl font-bold mt-6 text-vscode-text mb-8">
          <span className="text-vscode-yellow">];</span>
        </h1>

        <div className="pl-4">
          <a 
            href={`${githubLink}?tab=repositories`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-vscode-blue text-white rounded-md hover:bg-opacity-90 transition-all shadow-lg hover:shadow-vscode-blue/20 font-medium text-sm group"
          >
            <Github className="w-4 h-4" />
            <span>github.viewAllProjects()</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="h-20"></div> {/* Spacing for scroll */}
      </main>
    </div>
  );
};

export default Projects;