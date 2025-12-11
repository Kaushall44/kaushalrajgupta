import React from 'react';
import { 
  FileCode, 
  FileJson, 
  FileText, 
  FileType as FileTypeIcon, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  Box,
  FileUser
} from 'lucide-react';
import { FileType } from '../types';

export const getFileIcon = (type: FileType, className: string = "w-4 h-4") => {
  switch (type) {
    case FileType.TYPESCRIPT:
      return <FileCode className={`${className} text-blue-400`} />;
    case FileType.REACT:
      return <FileCode className={`${className} text-cyan-400`} />;
    case FileType.JSON:
      return <FileJson className={`${className} text-yellow-400`} />;
    case FileType.CSS:
      return <FileTypeIcon className={`${className} text-blue-300`} />;
    case FileType.MARKDOWN:
      // Special check for Resume in App logic, but here generalized
      return <FileText className={`${className} text-gray-400`} />;
    default:
      return <FileText className={`${className} text-gray-400`} />;
  }
};

export const getSocialIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case 'github': return <Github className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'twitter': return <Twitter className={className} />;
    case 'mail': return <Mail className={className} />;
    default: return <Box className={className} />;
  }
};