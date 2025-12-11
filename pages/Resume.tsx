import React from 'react';
import LineNumbers from '../components/LineNumbers';
import { Download } from 'lucide-react';
import { ABOUT_DATA } from '../constants';

const Resume: React.FC = () => {
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
      <LineNumbers lines={65} />
      <article className="flex-1 p-4 sm:p-10 font-mono text-sm sm:text-base max-w-4xl mx-auto">
        
        {/* Header Action */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-vscode-blue text-white px-4 py-2 rounded shadow-lg hover:bg-opacity-90 transition-all text-sm font-sans"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>

        {/* Markdown Content */}
        <div className="text-vscode-text space-y-6">
          
          <div>
            <h1 className="text-3xl font-bold text-vscode-blue mb-2"># Kaushal Raj Gupta</h1>
            <p className="text-vscode-string text-lg">## Bachelor of Technology (2024-28)</p>
            <div className="opacity-80 mt-2 text-sm flex flex-col gap-1">
              <p>&gt; Institute of Technical Education and Research (SOA), Odisha</p>
              <p>&gt; Phone: +91-1234567890</p>
              <p>&gt; Email: kushh4@proton.me</p>
            </div>
          </div>

          <div className="border-t border-vscode-activity my-6"></div>

          <div>
            <h2 className="text-xl font-bold text-vscode-yellow mb-4">### Education</h2>
            <div>
              <div className="flex justify-between items-start">
                 <h3 className="font-bold text-vscode-variable">Institute of Technical Education and Research (SOA), Odisha</h3>
                 <span className="text-vscode-comment text-xs">2024 - 2028</span>
              </div>
              <p className="opacity-80">Bachelor of Technology</p>
              <p className="text-vscode-green text-sm">CGPA: 8.9</p>
            </div>
          </div>

          <div>
             <h2 className="text-xl font-bold text-vscode-yellow mb-4">### Personal Projects</h2>
             
             <div className="mb-6">
               <h3 className="font-bold text-vscode-blue">1. Portfolio Website</h3>
               <p className="italic text-xs opacity-70 mb-1">HTML, CSS, JavaScript, React</p>
               <ul className="list-disc list-inside space-y-1 opacity-90 pl-2 text-sm">
                 <li>Designed with a clean, responsive UI for both desktop and mobile users.</li>
                 <li>Includes project gallery, downloadable resume, and contact form.</li>
               </ul>
             </div>

             <div className="mb-6">
               <h3 className="font-bold text-vscode-blue">2. Realtime Discord Bot App</h3>
               <p className="italic text-xs opacity-70 mb-1">Python, Discord.py, MongoDB, JSON</p>
               <ul className="list-disc list-inside space-y-1 opacity-90 pl-2 text-sm">
                 <li>Automated server management and enhanced community engagement.</li>
                 <li>Supports custom commands, role assignment, and moderation tools.</li>
                 <li>Integrated APIs to fetch dynamic content (memes, weather, news).</li>
               </ul>
             </div>

             <div className="mb-6">
               <h3 className="font-bold text-vscode-blue">3. Cortex</h3>
               <p className="italic text-xs opacity-70 mb-1">React.js, Firebase, Tailwind CSS, Web Speech API</p>
               <ul className="list-disc list-inside space-y-1 opacity-90 pl-2 text-sm">
                 <li>Web platform designed to support neurodiverse individuals with task management.</li>
                 <li>Features distraction-free interface, visual schedules, and timers.</li>
                 <li>Includes text-to-speech, font customization, and accessibility themes.</li>
               </ul>
             </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-vscode-yellow mb-4">### Experience</h2>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="font-bold text-vscode-variable">Cyber Security Internship <span className="text-vscode-text font-normal">@ The Red Users</span></h3>
                <span className="text-vscode-comment text-xs sm:text-sm">March - May 2025</span>
              </div>
              <ul className="list-disc list-inside space-y-1 opacity-90 pl-2">
                <li>Assisted in threat analysis and vulnerability assessments.</li>
                <li>Developed and implemented security protocols to safeguard information.</li>
                <li>Collaborated with IT team to enhance network security measures.</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="font-bold text-vscode-variable">Senior Moderator <span className="text-vscode-text font-normal">@ Brainly</span></h3>
                <span className="text-vscode-comment text-xs sm:text-sm">Feb 2020 - Jan 2022</span>
              </div>
              <ul className="list-disc list-inside space-y-1 opacity-90 pl-2">
                <li>Managed community interaction and engagement across platforms.</li>
                <li>Implemented effective moderation strategies for a safe environment.</li>
              </ul>
            </div>
          </div>

          <div>
             <h2 className="text-xl font-bold text-vscode-yellow mb-4">### Technical Skills & Interests</h2>
             <div className="grid grid-cols-1 gap-2 text-sm">
               <div><span className="font-bold text-vscode-blue">Languages:</span> C/C++, Python, MySQL, Java, Javascript, HTML+CSS</div>
               <div><span className="font-bold text-vscode-blue">Libraries:</span> C++ STL, Python Libraries, ReactJs</div>
               <div><span className="font-bold text-vscode-blue">Web Dev Tools:</span> Nodejs, VScode, Git, Github</div>
               <div><span className="font-bold text-vscode-blue">Frameworks:</span> ReactJs</div>
               <div><span className="font-bold text-vscode-blue">Cloud/DB:</span> MongoDb, Firebase, MySQL</div>
               <div><span className="font-bold text-vscode-blue">Interests:</span> Web Design and Development, Cyber Security</div>
               <div><span className="font-bold text-vscode-blue">Soft Skills:</span> Problem Solving, Self-learning, Presentation</div>
             </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-vscode-yellow mb-4">### Positions of Responsibility</h2>
            <div>
              <div className="flex justify-between">
                <h3 className="font-bold text-vscode-variable">Technical Core Team - IEC, SOA</h3>
                <span className="text-vscode-comment text-xs">Oct - Dec 2022</span>
              </div>
              <ul className="list-disc list-inside space-y-1 opacity-90 pl-2 mt-2">
                 <li>Organized tech-driven events and workshops promoting innovation.</li>
                 <li>Led technical development of internal tools and registration platforms.</li>
                 <li>Mentored peers on project building and pitching technical ideas.</li>
              </ul>
            </div>
          </div>

        </div>
        
        <div className="h-20"></div>
      </article>
    </div>
  );
};

export default Resume;