import React, { useState } from 'react';
import LineNumbers from '../components/LineNumbers';
import { CONTACT_CSS, SOCIAL_LINKS } from '../constants';
import { getSocialIcon } from '../components/IconHelper';
import { CheckCircle2, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill all fields.');
      return;
    }

    setIsSubmitting(true);

    // TypeScript in this project may not include Vite's `ImportMetaEnv` types.
    // Cast to `any` to safely read runtime env var set by Vite (VITE_CONTACT_ENDPOINT).
    const endpoint = (import.meta as any).env?.VITE_CONTACT_ENDPOINT as string | undefined;

    // If no endpoint is configured, fallback to opening mail client via mailto
    if (!endpoint) {
      try {
        const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
        const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} <${formData.email}>`);
        const mailtoLink = document.createElement('a');
        mailtoLink.href = `mailto:contact@kaushalraj.dev?subject=${subject}&body=${body}`;
        mailtoLink.click();
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } catch (err) {
        setError('Could not open mail client.');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setIsSuccess(false), 3000);
      }

      return;
    }

    // Send POST to configured endpoint (expects JSON). Useful for Form endpoints or serverless functions.
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full h-full overflow-auto bg-vscode-bg">
      <LineNumbers lines={45} />
      <div className="flex-1 p-6 flex flex-col lg:flex-row gap-10">
        
        {/* CSS Display */}
        <div className="flex-1 font-mono hidden lg:block">
           <pre className="text-sm">
             <code className="language-css">
               {CONTACT_CSS.split('\n').map((line, i) => (
                 <div key={i} className="leading-6">
                   <span className={
                     line.startsWith('/*') ? 'text-vscode-comment' :
                     line.includes('.') ? 'text-vscode-yellow' : 
                     line.includes(':') ? 'text-vscode-variable' : 
                     'text-vscode-text'
                   }>{line}</span>
                 </div>
               ))}
             </code>
           </pre>
        </div>

        {/* Functional Form Styled as UI */}
        <div className="flex-1 max-w-xl">
           <h2 className="text-xl mb-6 text-vscode-blue font-semibold flex items-center gap-2">
             .contact-form <span className="text-vscode-yellow">&#123;</span>
           </h2>
           
           <form onSubmit={handleSubmit} className="space-y-4 pl-4 border-l-2 border-vscode-activity ml-2">
              
              <div className="flex flex-col gap-1">
                <label className="text-vscode-variable text-sm">name:</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="bg-vscode-sidebar border border-vscode-activity p-2 text-vscode-text focus:border-vscode-blue focus:outline-none rounded-sm font-mono text-sm transition-colors"
                  placeholder='"Your Name";'
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-vscode-variable text-sm">email:</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="bg-vscode-sidebar border border-vscode-activity p-2 text-vscode-text focus:border-vscode-blue focus:outline-none rounded-sm font-mono text-sm transition-colors"
                  placeholder='"email@example.com";'
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-vscode-variable text-sm">message:</label>
                <textarea 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="bg-vscode-sidebar border border-vscode-activity p-2 text-vscode-text focus:border-vscode-blue focus:outline-none rounded-sm font-mono text-sm resize-none transition-colors"
                  placeholder='"Write your message here...";'
                  required
                />
              </div>

              <div className="flex items-center gap-4 mt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 rounded-sm
                    ${isSuccess 
                      ? 'bg-vscode-green text-white hover:bg-opacity-90' 
                      : 'bg-vscode-blue text-white hover:bg-[#006bb3] active:bg-[#005a9e]'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isSubmitting ? (
                    'sending...' 
                  ) : isSuccess ? (
                    <>
                      message-sent! <CheckCircle2 size={16} />
                    </>
                  ) : (
                    <>
                      submit-form(); <Send size={14} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <div className="text-sm text-red-400 mt-2 pl-1">{error}</div>
              )}
           </form>

           <h2 className="text-xl mt-6 text-vscode-yellow font-semibold">&#125;</h2>

           {/* Social Links */}
           <div className="mt-8 flex gap-4">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-vscode-text hover:text-vscode-blue transition-colors flex items-center gap-2 text-sm"
                  aria-label={link.name}
                >
                  {getSocialIcon(link.icon)}
                  <span className="hidden sm:inline">{link.name}</span>
                </a>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;