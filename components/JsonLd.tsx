import React, { useEffect } from 'react';
import { ABOUT_DATA, SEO_KEYWORDS } from '../constants';

const JsonLd: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": ABOUT_DATA.name,
    "givenName": "Kaushal",
    "familyName": "Gupta",
    "jobTitle": ABOUT_DATA.role,
    "url": "https://kaushalraj.dev",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Siksha 'O' Anusandhan University" 
    },
    "sameAs": [
      "https://github.com/kaushall44",
      "https://linkedin.com/in/kaushalrajgupta",
      "https://twitter.com/kaushall44"
    ],
    "knowsAbout": [
      ...ABOUT_DATA.skills,
      ...SEO_KEYWORDS.slice(9, 21) // Add technical skills from SEO keywords to knowledge graph
    ],
    "keywords": SEO_KEYWORDS.join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default JsonLd;