'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import {
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
  MapPin,
  Copy,
  Check,
  Terminal,
  Globe,
  Layers,
  Coffee,
  ExternalLink,
  Sparkles,
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  Sun,
  Moon,
  Download,
  Calendar,
  Code2,
  Shield,
  Clock,
  BookOpen,
  ChevronLeft,
  ArrowRight,
  Search,
  Share2,
  Menu,
  Link
} from 'lucide-react';


// --- Data & Constants ---
// --- Data & Constants ---
import { PROJECTS, SKILLS_ROW_1, SKILLS_ROW_2, BLOG_POSTS, EXPERIENCE } from './data/constants';
import { getOriginalUrl } from './lib/firebase';
import Card from './components/ui/Card';
import UrlShortener from './components/UrlShortener';



// --- Sub-Components ---

const Badge = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors border-neutral-200 bg-gray-100 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400 ${className}`}>
    {children}
  </span>
);

const SocialButton = ({ icon, label, subLabel, href, ariaLabel }: { icon: React.ReactNode; label: string; subLabel: string; href: string; ariaLabel: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer me"
    aria-label={ariaLabel}
    className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white dark:bg-neutral-950 rounded-lg text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors border border-neutral-200 dark:border-transparent" aria-hidden="true">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{label}</span>
        <span className="text-xs text-neutral-500">{subLabel}</span>
      </div>
    </div>
    <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" aria-hidden="true" />
  </a>
);

const Marquee = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden select-none marquee-container w-full">
      <div
        className={`flex shrink-0 gap-4 py-4 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {/* Render items 4 times to ensure seamless looping on large screens */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="px-6 py-3 bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-300 font-medium transition-all duration-300 cursor-default hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 shadow-sm dark:shadow-none"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const FadeIn = ({
  children,
  className = "",
  delay = 0
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ReadingProgress = ({ progress }: { progress: number }) => (
  <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-neutral-800 z-50">
    <div
      className="h-full bg-blue-500 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const SocialShare = ({ title, url, className = "" }: { title: string; url: string; className?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      icon: <Twitter className="w-4 h-4" />,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Share:</span>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label={`Share on ${link.label}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-gray-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors relative"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

const Toast = ({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
      <div className="bg-neutral-900 text-white dark:bg-white dark:text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm">
        <Check className="w-4 h-4 text-green-500" />
        {message}
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: typeof PROJECTS[0] | null, onClose: () => void }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true"></div>
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#111111] rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} relative shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-white/40" />
          </div>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 id="modal-title" className="text-2xl font-bold text-neutral-900 dark:text-white">{project.title}</h3>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 px-2 py-1 rounded">
              {project.quarter}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <p>{project.description}</p>
            <p>{project.longDescription}</p>

            <div className="bg-gray-50 dark:bg-neutral-900/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Tech Stack Highlights
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {project.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex gap-4">
              <button onClick={() => window.open(project.link, "_blank")} className="flex-1 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                View Live Site <ExternalLink className="w-4 h-4" />
              </button>
              <button onClick={() => window.open(project.repoUrl, "_blank")} className="flex-1 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                Source Code <Github className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <SocialShare
                title={`Check out ${project.title} by Kaushal Raj Gupta`}
                url={project.link === "#" ? window.location.href : project.link}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogModal = ({ post, onClose }: { post: typeof BLOG_POSTS[0] | null, onClose: () => void }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setReadingProgress(Math.min(100, Math.max(0, progress)));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true"></div>
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#111111] rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
      >
        <ReadingProgress progress={readingProgress} />

        {/* Header */}
        <div className="bg-gray-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 px-8 py-6 relative shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 dark:opacity-100"></div>
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-800/50">
                  {post.tags[0]}
                </span>
                <span className="text-xs text-neutral-500">{post.date}</span>
                <span className="text-xs text-neutral-500">•</span>
                <span className="text-xs text-neutral-500">{post.readTime}</span>
              </div>
              <h2 id="blog-modal-title" className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-tight">{post.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors z-10 shrink-0"
              aria-label="Close article"
            >
              <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Table of Contents - Desktop */}
          {post.toc && (
            <div className="hidden lg:block w-64 border-r border-neutral-200 dark:border-neutral-800 p-6 overflow-y-auto shrink-0 bg-gray-50/50 dark:bg-neutral-900/20">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Contents</h3>
              <nav className="space-y-1">
                {post.toc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-sm py-1.5 px-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Content */}
          <div
            className="flex-1 p-8 md:p-12 overflow-y-auto scroll-smooth"
            onScroll={handleScroll}
            ref={contentRef}
          >
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500">
              {post.content}
            </div>

            {/* Mobile TOC */}
            {post.toc && (
              <div className="lg:hidden mt-8 p-4 bg-gray-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">In this article</h3>
                <div className="space-y-2">
                  {post.toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-neutral-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">Kaushal Raj Gupta</span>
                    <span className="text-xs text-neutral-500">Senior Frontend Engineer</span>
                  </div>
                </div>

                <SocialShare
                  title={post.title}
                  url={window.location.href}
                  className="w-full md:w-auto justify-center md:justify-end"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button onClick={onClose} className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full text-sm hover:opacity-90 transition-opacity">
                  Back to Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>(() => {
    const hour = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 18) timeGreeting = "Good afternoon";

    return [
      {
        role: 'model',
        text: `${timeGreeting}! I'm Kaushal's AI assistant. Feel free to ask me about his work on ${PROJECTS[0].title}, his skills in ${PROJECTS[0].tags[0]}, or anything else regarding his portfolio.`
      }
    ];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const initChat = () => {
    if (!chatSessionRef.current) {
      const apiKey = process.env.API_KEY || "";
      if (!apiKey) {
        console.error("API Key is missing!");
        setMessages(prev => [...prev, {
          role: 'model',
          text: "I'm currently undergoing maintenance (API Key missing). Please contact Kaushal directly via email!"
        }]);
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey });
        const context = `
          You are an AI assistant for Kaushal Raj Gupta's portfolio website.
          Your goal is to answer visitor questions professionally and concisely about Kaushal.
          
          Here is Kaushal's Resume Context:
          
          SUMMARY:
          B.Tech student at ITER (SOA), Odisha. CGPA 8.9. Passionate about Web Development and Cyber Security.
          
          SKILLS:
          ${SKILLS_ROW_1.join(', ')}, ${SKILLS_ROW_2.join(', ')}
          
          EXPERIENCE:
          ${JSON.stringify(EXPERIENCE)}
          
          PROJECTS:
          ${JSON.stringify(PROJECTS)}
          
          TONE:
          Professional, enthusiastic, slightly technical but accessible. Keep responses under 3-4 sentences unless asked for detail.
        `;

        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction: context }
        });
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages(prev => [...prev, {
          role: 'model',
          text: "I'm having trouble initializing. Please try again later."
        }]);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      initChat();
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) initChat();

      const result = await chatSessionRef.current.sendMessageStream({ message: userText });

      setMessages(prev => [...prev, { role: 'model', text: "" }]);
      let fullText = "";

      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].text = fullText;
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white dark:bg-neutral-800 text-black dark:text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-neutral-200 dark:border-neutral-700"
        aria-label="Open AI Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        style={{ maxHeight: 'calc(100dvh - 120px)', height: '500px' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-900/50 flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Bot className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Ask AI about Kaushal</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online • Powered by Gemini
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-white dark:bg-[#111111]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black rounded-tr-sm'
                  : 'bg-gray-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-sm border border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-sm border border-neutral-200 dark:border-neutral-700 flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-900/30">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my skills..."
              className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-1.5 bg-neutral-900 dark:bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// --- JSON-LD Schema ---
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kaushal Raj Gupta",
  "jobTitle": "Bachelor of Technology Student",
  "url": "https://kaushalrajgupta.vercel.app",
  "sameAs": [
    "https://github.com/Kaushall44",
    "https://linkedin.com/in/kaushalrajgupta"
  ],
  "knowsAbout": ["C++", "Python", "React.js", "Node.js", "Cyber Security", "Web Design"],
  "worksFor": {
    "@type": "Organization",
    "name": "Institute of Technical Education and Research (SOA)"
  }
};

// --- Page Components ---

export default function App() {
  const [timeGreeting, setTimeGreeting] = useState("");
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<typeof BLOG_POSTS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'blog' | 'tools'>('home');

  const heroBgRef = useRef<HTMLDivElement>(null);

  // HASH & PATH NAVIGATION LOGIC
  const handleRoute = useCallback(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path === '/tools') {
      setCurrentView('tools');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/projects') {
      setCurrentView('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/blog') {
      setCurrentView('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Logic for Home / Hash routes
      if (hash === '#projects') {
        setCurrentView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#tools') {
        setCurrentView('tools');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#articles') {
        setCurrentView('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');

        // Scroll to section
        setTimeout(() => {
          const id = hash.replace('#', '');
          if (id) {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    // Initial check
    handleRoute();

    // Listeners
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, [handleRoute]);

  const navigate = (path: string, hash?: string) => {
    const url = hash ? `${path}${hash}` : path;
    window.history.pushState(null, '', url);
    handleRoute();
  };

  // REDIRECT LOGIC
  useEffect(() => {
    // Check for Short URL pattern: /s/[code]
    const path = window.location.pathname;
    const parts = path.split('/'); // ["", "s", "code"]

    if (parts[1] === 's' && parts[2]) {
      const code = parts[2];
      console.log(`Checking short link: ${code}`);

      getOriginalUrl(code).then(url => {
        if (url) {
          window.location.href = url;
        } else {
          console.error("Link not found");
          setToastMessage("Link not found or expired.");
          setShowToast(true);
          // Redirect home to avoid stuck state
          setTimeout(() => window.history.pushState({}, "", "/"), 2000);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Initialize theme from localStorage on client side
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting("Good Morning");
    else if (hour < 18) setTimeGreeting("Good Afternoon");
    else setTimeGreeting("Good Evening");

    // Parallax scroll handler
    const handleScroll = () => {
      if (heroBgRef.current) {
        const scrolled = window.scrollY;
        // Move background at 40% speed of scroll for parallax effect
        heroBgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("kushh4@proton.me");
    showNotification("Email copied to clipboard!");
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    showNotification("Downloading Resume...");

    // Create a virtual link to trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Kaushal_Raj_Gupta_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      showNotification("Resume Downloaded Successfully");
    }, 1500);
  };

  const updateHash = (hash: string) => {
    window.location.hash = hash;
  };

  const navigateTo = (view: 'home' | 'projects' | 'blog' | 'tools') => {
    setCurrentView(view);
    setSearchQuery(""); // Reset search on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-200 selection:bg-neutral-200 dark:selection:bg-neutral-800 selection:text-black dark:selection:text-white font-sans overflow-x-hidden transition-colors duration-300">

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-25%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Toast message={toastMessage} visible={showToast} onClose={() => setShowToast(false)} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <BlogModal post={selectedBlogPost} onClose={() => setSelectedBlogPost(null)} />

      {/* Parallax Background Container */}
      <div className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden -z-10 pointer-events-none">
        <div
          ref={heroBgRef}
          className="absolute inset-0 w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-30 transition-opacity duration-300"
          aria-hidden="true"
        />
        {/* Gradient Overlay to fade into main background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/60 dark:via-[#0a0a0a]/60 to-gray-50 dark:to-[#0a0a0a] transition-colors duration-300"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <nav
          aria-label="Main Navigation"
          className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800/80 rounded-full px-6 py-3 flex items-center gap-6 shadow-xl dark:shadow-2xl transition-colors duration-300"
        >
          <button onClick={() => navigate('/', '')} className={`text-sm font-semibold transition-colors ${currentView === 'home' && !window.location.hash.includes('work') && !window.location.hash.includes('about') && !window.location.hash.includes('contact') && !window.location.hash.includes('blog') ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}>Home</button>

          <button onClick={() => navigate('/', '#work')} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Work</button>

          <button onClick={() => navigate('/', '#about')} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">About</button>

          <button onClick={() => navigate('/', '#contact')} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Contact</button>

          <button onClick={() => navigate('/tools')} className={`text-sm transition-colors ${currentView === 'tools' ? 'text-neutral-900 dark:text-white font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'}`}>Tools</button>

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-neutral-200 dark:border-neutral-800" role="status">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-neutral-500">{timeGreeting}</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 ml-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-32 pb-20 space-y-20 relative">

        {currentView === 'home' && (
          <div className="space-y-20 animate-fade-in-up">
            {/* Hero Section */}
            <section id="home" aria-label="Introduction" className="space-y-8 py-10 md:py-20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge>Available for hire</Badge>
                  <Badge>Based in India</Badge>
                </div>
                {/* Keyword Rich H1 */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                  Hello, I'm Kaushal. <br />
                  <span className="text-neutral-500 dark:text-neutral-500">Full Stack Developer.</span>
                </h1>
                <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  I build <strong>accessible</strong>, <strong>pixel-perfect</strong>, and <strong>scalable web apps</strong>.
                  Specializing in React, Next.js, and modern UI/UX architecture to turn ideas into digital reality.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => updateHash('contact')}
                  className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-lg dark:shadow-none"
                  aria-label="Connect now"
                >
                  Connect now <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={copyEmail}
                  className="px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                  aria-label="Copy email address"
                >
                  {showToast && toastMessage.includes("copied") ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {showToast && toastMessage.includes("copied") ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </section>

            {/* Bento Grid: Socials & Status */}
            <section aria-label="Social Links" className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <Card className="md:col-span-1 flex flex-col justify-between min-h-[180px] bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-[#0a0a0a]">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <Globe className="w-5 h-5 text-neutral-500 dark:text-neutral-300" aria-hidden="true" />
                  </div>
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Open to Work</h3>
                  <p className="text-neutral-500 text-sm mt-1">Available for Hire</p>
                </div>
              </Card>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SocialButton
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                  subLabel="@Kaushall44"
                  href="https://github.com/Kaushall44?tab=repositories"
                  ariaLabel="GitHub Profile"
                />
                <SocialButton
                  icon={<Twitter className="w-5 h-5" />}
                  label="Twitter/X"
                  subLabel="@Kaushall44"
                  href="https://twitter.com/Kaushall44"
                  ariaLabel="Twitter Profile"
                />
                <SocialButton
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                  subLabel="/in/kaushalrajgupta"
                  href="https://www.linkedin.com/in/kaushalrajgupta/"
                  ariaLabel="LinkedIn Profile"
                />
                <div className="p-4 bg-gray-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-neutral-950 rounded-lg text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors border border-neutral-200 dark:border-transparent">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Odisha, India</span>
                      <span className="text-xs text-neutral-500">Remote Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Selected Work (Limited) */}
            <section id="work" aria-label="Portfolio Projects" className="space-y-8 scroll-mt-32">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                  <Layers className="w-8 h-8 text-neutral-500" aria-hidden="true" /> Selected Work
                </h2>
                <button
                  onClick={() => navigate('/projects')}
                  className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                  aria-label="View all projects"
                >
                  View all projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {PROJECTS.slice(0, 3).map((project, index) => (
                  <React.Fragment key={project.id}>
                    <FadeIn delay={index * 100}>
                      <Card
                        as="article"
                        className="group p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f0f0f] h-full"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex flex-col h-full">
                          {/* Image Area */}
                          <div className={`w-full h-56 md:h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`} role="img" aria-label={`Abstract representation of ${project.title} project`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="absolute inset-0 bg-white/0 dark:bg-black/0 dark:group-hover:bg-black/10 transition-colors duration-500"></div>
                            <Sparkles className="w-12 h-12 text-black/10 dark:text-white/20 group-hover:text-black/20 dark:group-hover:text-white/50 group-hover:scale-110 transition-all duration-500" aria-hidden="true" />
                          </div>

                          {/* Content Area */}
                          <div className="flex-1 p-6 flex flex-col gap-6">
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neutral-200 transition-colors">
                                  {project.title}
                                </h3>
                                <span className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900/50 px-2 py-1 rounded" aria-label={`Project timeline: ${project.quarter}`}>
                                  {project.quarter}
                                </span>
                              </div>
                              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                                {project.description}
                              </p>
                            </div>

                            <div className="flex flex-col gap-4 mt-auto">
                              <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                                {project.tags.map(tag => (
                                  <span key={tag} className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(project);
                                }}
                                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-4 w-fit"
                                aria-label={`View case study for ${project.title}`}
                              >
                                View Case Study <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </FadeIn>
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* Skills / Marquee Section */}
            <section aria-label="Skills and Technologies" className="space-y-6">
              <FadeIn>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                  <Terminal className="w-8 h-8 text-neutral-500" aria-hidden="true" /> The Secret Sauce
                </h2>
              </FadeIn>

              <div className="space-y-4">
                <FadeIn delay={200}>
                  <Marquee items={SKILLS_ROW_1} />
                </FadeIn>
                <FadeIn delay={400}>
                  <Marquee items={SKILLS_ROW_2} reverse />
                </FadeIn>
              </div>
            </section>

            {/* Blog Section (Limited) */}
            <section id="blog" aria-label="From the Blog" className="space-y-8 scroll-mt-32">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                  <Shield className="w-8 h-8 text-neutral-500" aria-hidden="true" /> Security Insights
                </h2>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                  aria-label="Read all articles"
                >
                  Read all articles <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_POSTS.slice(0, 3).map((post, index) => (
                  <React.Fragment key={post.id}>
                    <FadeIn delay={index * 100}>
                      <Card
                        as="article"
                        className="flex flex-col justify-between h-full bg-gray-50 dark:bg-neutral-900/30 group hover:bg-white dark:hover:bg-neutral-900"
                        onClick={() => setSelectedBlogPost(post)}
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                          </div>

                          <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-6 mt-2 flex flex-col gap-4">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                              <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBlogPost(post);
                            }}
                            className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:gap-3 transition-all"
                          >
                            Read Article <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </Card>
                    </FadeIn>
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section id="about" aria-label="About and Experience" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 scroll-mt-32 items-start">
              {/* Left Column: Image */}
              <div className="relative w-full h-full min-h-[400px] md:min-h-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm group">
                <img
                  src="https://i.ibb.co/RkQjqyMZ/IMG-20250807-225109.jpg"
                  alt="Profile"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>

              {/* Right Column: Content */}
              <div className="flex flex-col gap-8">
                {/* About Me Text */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                    <Coffee className="w-8 h-8 text-neutral-500" aria-hidden="true" /> About Me
                  </h2>
                  <div className="prose prose-neutral dark:prose-invert text-neutral-600 dark:text-neutral-400">
                    <p>
                      I am a Bachelor of Technology student at the Institute of Technical Education and Research (SOA), Odisha, with a CGPA of 8.9.
                      I am passionate about <strong>Web Design and Development</strong> and <strong>Cyber Security</strong>.
                    </p>
                    <p>
                      My technical curiosity has led me to work on various projects including a neurodiverse support platform and automated bots.
                      I actively participate in hackathons and technical communities.
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Experience</h3>
                  <div className="space-y-4">
                    {EXPERIENCE.map(exp => (
                      <article key={exp.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-900/50 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-neutral-900 dark:text-white font-medium">{exp.role}</span>
                          <span className="text-sm text-neutral-500">{exp.company}</span>
                        </div>
                        <span className="text-sm font-mono text-neutral-600 dark:text-neutral-600 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Resume Button */}
                <div className="pt-2">
                  <button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Download Resume <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- ALL PROJECTS PAGE --- */}
        {currentView === 'projects' && (
          <div className="animate-fade-in-up space-y-8 min-h-[60vh]">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigate('/', '')}
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">All Projects</h1>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                A complete collection of my open source work, side projects, and experiments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project, index) => (
                <React.Fragment key={project.id}>
                  <FadeIn delay={index * 50}>
                    <Card
                      as="article"
                      className="group p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f0f0f] h-full"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex flex-col h-full">
                        <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                          <Sparkles className="w-12 h-12 text-black/10 dark:text-white/20" />
                        </div>

                        <div className="flex-1 p-6 flex flex-col gap-6">
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                                {project.title}
                              </h3>
                              <span className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900/50 px-2 py-1 rounded">
                                {project.quarter}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-xs text-neutral-400 py-1">+ {project.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* --- ALL ARTICLES PAGE --- */}
        {currentView === 'blog' && (
          <div className="animate-fade-in-up space-y-8 min-h-[60vh]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <button
                onClick={() => navigate('/', '')}
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>

              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-full leading-5 bg-white dark:bg-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors text-neutral-900 dark:text-white"
                  placeholder="Search articles by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Security Insights & Thoughts</h1>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                Deep dives into frontend security, performance architecture, and modern web patterns.
              </p>
            </div>

            {/* Filter Logic */}
            {(() => {
              const filteredPosts = BLOG_POSTS.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              if (filteredPosts.length === 0) {
                return (
                  <div className="py-20 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-gray-50 dark:bg-neutral-900 rounded-full mb-4">
                      <Search className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No articles found</h3>
                    <p className="text-neutral-500 mt-2">We couldn't find any articles matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <FadeIn delay={index * 50}>
                        <Card
                          as="article"
                          className="flex flex-col justify-between h-full bg-gray-50 dark:bg-neutral-900/30 group hover:bg-white dark:hover:bg-neutral-900"
                          onClick={() => setSelectedBlogPost(post)}
                        >
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                            </div>

                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-6 mt-2 flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBlogPost(post);
                              }}
                              className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:gap-3 transition-all"
                            >
                              Read Article <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </Card>
                      </FadeIn>
                    </React.Fragment>
                  ))}
                </div>
              )
            })()}
          </div>
        )}

        {/* --- TOOLS PAGE --- */}
        {currentView === 'tools' && (
          <div className="animate-fade-in-up space-y-8 min-h-[60vh]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <button
                onClick={() => navigate('/', '')}
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>
            </div>

            <UrlShortener />
          </div>
        )}

        {/* Footer */}
        <footer id="contact" className="pt-20 border-t border-neutral-200 dark:border-neutral-900 scroll-mt-32">
          <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 md:p-16 text-center border border-neutral-200 dark:border-neutral-800 relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
              Let's work together.
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-lg mx-auto">
              Have a project in mind? Let's build something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:kushh4@proton.me" className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-lg font-bold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                Send an email
              </a>
              <button onClick={copyEmail} className="px-8 py-4 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-lg font-medium rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                {showToast && toastMessage.includes("copied") ? "Copied!" : "Copy email address"}
              </button>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500 pb-8">
            <p>&copy; {new Date().getFullYear()} Kaushal Raj Gupta. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://twitter.com/Kaushall44" rel="noopener noreferrer me" className="hover:text-black dark:hover:text-white transition-colors">Twitter</a>
              <a href="https://www.linkedin.com/in/kaushalrajgupta/" rel="noopener noreferrer me" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com/Kaushall44" rel="noopener noreferrer me" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </footer>

        <ChatWidget />

      </main>
    </div>
  );
}