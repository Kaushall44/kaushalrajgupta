import React from 'react';
import { Project, SocialLink } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/kaushall44', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/kaushalrajgupta', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/kaushall44', icon: 'twitter' },
  { name: 'Email', url: 'mailto:kushh4@proton.me', icon: 'mail' },
];

export const RESUME_URL = "/resume.pdf"; // Placeholder for actual resume file

export const PROJECTS: Project[] = [
  {
    name: 'connect-app',
    description: 'A full-stack app for real-time team collaboration with chat, file sharing, self attendence, and task management features.',
    tags: ['Next.js', 'HTML', 'CSS', 'Tailwind'],
    stars: 124,
    forks: 35,
    language: 'Javascript',
    url: 'https://github.com/kaushall44/connect'
  },
  {
    name: 'kaushal-iter',
    description: 'A backend service that generates tailored coding interview questions and solutions using AI.',
    tags: ['React', 'Javascript', 'Code Generation'],
    stars: 89,
    forks: 12,
    language: 'JavaScript',
    url: 'https://github.com/kaushall44/kaushal-iter'
  },
  {
    name: 'email-style-adjuster',
    description: 'A email style adjuster tool that reformats and optimizes email HTML for better compatibility across email clients.',
    tags: ['Javascript', 'AI', 'HTML', 'React'],
    stars: 256,
    forks: 42,
    language: 'JavaScript',
    url: 'https://github.com/kaushalraj/email-style-adjuster'
  },
  {
    name: 'hacker-terminal-portfolio',
    description: 'A terminal-themed personal portfolio website that mimics a hacker\'s terminal interface.',
    tags: ['HTML', 'CSS', 'Javascript',],
    stars: 440,
    forks: 88,
    language: 'Web Dev',
    url: 'https://github.com/kaushall44/kaushall44.github.io'
  }
];

export const ABOUT_DATA = {
  name: "Kaushal Raj Gupta",
  role: "Cybersecurity Engineer",
  location: "India",
  bio: "Security-focused developer and ethical hacker. Passionate about Application Security (AppSec), vulnerability assessment, and building secure, resilient infrastructure. Bridging the gap between software engineering and cyber defense.",
  // Updated Skills: Mix of Dev + Security (Crucial for a modern Security Engineer)",
  skills: [
    "Network Security",
    "Penetration Testing",
    "Python / Scripting",
    "Linux / Bash",
    "React / Next.js", // Keep this: Shows you understand what you are protecting
    "Cryptography"
  ]
};

export const SEO_KEYWORDS = [
  "Kaushal Raj Gupta", "Kaushal Raj Gupta Portfolio", "Software Engineer Portfolio", "Cybersecuirity Expert", "Cybersecurity Analyst", "Full Stack Developer", "Web Developer", "React Developer", "Next.js Developer", "Frontend Engineer", "Creative Technologist",
  "React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Git", "GitHub", "Visual Studio Code Theme", "Responsive Web Design", "UI/UX Engineering", "Web Performance Optimization", "SEO Friendly Web Development",
  "Interactive Portfolio", "Siksha 'O' Anusandhan", "Developer Portfolio", "Coding Themed Website", "VS Code Portfolio Theme", "Dark Mode UI", "Clean Code", "Modern Web Architecture"
];

export const CONTACT_CSS = `
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
  border: 1px solid #424242;
}

/* 
 * Feel free to reach out via email 
 * or check my social profiles!
 */
`;

export const EXPLORER_DATA = {
  nodeModules: [
    '@types',
    'framer-motion',
    'lucide-react',
    'next',
    'react',
    'react-dom',
    'tailwindcss',
    'typescript',
    'zod'
  ],
  git: [
    'hooks',
    'info',
    'objects',
    'refs',
    'config',
    'HEAD',
    'description'
  ]
};