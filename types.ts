import { ReactNode } from 'react';

export enum FileType {
  MARKDOWN = 'markdown',
  JSON = 'json',
  TYPESCRIPT = 'typescript',
  CSS = 'css',
  REACT = 'react',
}

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  content?: ReactNode; // Component to render
  description?: string; // For SEO
}

export interface FolderNode {
  id: string;
  name: string;
  files: FileNode[];
  isOpen: boolean;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
