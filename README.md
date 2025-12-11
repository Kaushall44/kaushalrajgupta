<div align="center">
  <h1>🖥️ Kaushal Raj Gupta - Portfolio</h1>
  <p><strong>A Modern, Interactive VS Code-Themed Portfolio Website</strong></p>
  <br/>
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Portfolio-blue?style=for-the-badge)](https://kaushalrajgupta.vercel.app/)
  [![React](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)](https://react.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
</div>

---

## 📋 Overview

A sleek, interactive personal portfolio website designed with a **VS Code terminal aesthetic**. This project showcases my work as a **Cybersecurity Engineer** and **Full-Stack Developer**, featuring a file explorer interface, syntax-highlighted code displays, and an immersive user experience.

### ✨ Key Features

- **VS Code Theme UI** - Authentic dark mode interface inspired by Visual Studio Code
- **Interactive File Explorer** - Browse projects like a code editor
- **Syntax Highlighting** - Beautiful code displays with proper language highlighting
- **Responsive Design** - Seamless experience on desktop, tablet, and mobile
- **Project Showcase** - Display of personal projects with GitHub links and statistics
- **Contact Form** - Integrated email submission with validation
- **Resume Download** - One-click PDF resume download
- **Dark Mode by Default** - Eye-friendly design for extended browsing
- **SEO Optimized** - Metadata and structured data for better search engine visibility

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kaushall44/kaushalrajgupta.git
   cd kaushalrajgupta
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, CSS Modules |
| **Icons** | Lucide React |
| **Build Tool** | Vite |
| **Package Manager** | npm |
| **Code Quality** | ESLint, TypeScript |

---

## 📁 Project Structure

```
kaushal-portfolio/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── CommandPalette.tsx
│   │   ├── IconHelper.tsx
│   │   ├── JsonLd.tsx
│   │   ├── LineNumbers.tsx
│   │   └── Terminal.tsx
│   ├── context/             # React Context providers
│   │   └── ThemeContext.tsx
│   ├── pages/               # Page components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   └── Settings.tsx
│   ├── App.tsx              # Main app component
│   ├── constants.tsx        # Global constants and data
│   ├── index.tsx            # React DOM entry point
│   ├── types.ts             # TypeScript type definitions
│   └── vite-env.d.ts        # Vite environment types
├── public/                  # Static assets
│   └── Kaushal_Raj_Gupta.pdf
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📖 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module reloading.

### Build for Production
```bash
npm run build
```
Builds the project for production with optimizations.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build before deployment.

### Lint Code
```bash
npm run lint
```
Check code quality and style consistency.

---

## 🎯 Pages & Features

### 🏠 **Home**
- Welcome section with greeting
- Personal bio and role
- Quick call-to-action links
- Download resume button
- Workflow code snippet display

### 👤 **About**
- JSON-formatted profile information
- Skills and expertise highlights
- Role and location details
- Interactive code-style presentation

### 💼 **Resume**
- Complete CV/Resume display
- Education and certifications
- Work experience timeline
- Technical skills breakdown
- Projects and achievements
- PDF download option

### 🚀 **Projects**
- Showcase of personal projects
- GitHub repository links
- Project descriptions and technologies
- Star and fork counts
- Interactive project cards

### 📧 **Contact**
- Professional contact form
- Email validation
- Success feedback
- Social media links (GitHub, LinkedIn, Twitter, Email)
- Fallback mailto integration

### ⚙️ **Settings**
- Theme toggle (Light/Dark mode)
- Customizable UI preferences
- User configuration panel

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory (optional for advanced features):

```env
VITE_CONTACT_ENDPOINT=https://your-api.com/contact
VITE_API_KEY=your_api_key_here
```

### Customization

Edit `src/constants.tsx` to update:
- Personal information (name, role, location)
- Social media links
- Project list
- Skills and expertise
- SEO keywords

---

## 📱 Responsive Design

The portfolio is fully responsive:
- **Desktop** (1024px+) - Full layout with sidebar
- **Tablet** (768px - 1023px) - Optimized touch interface
- **Mobile** (< 768px) - Compact view with collapsible navigation

---

## 🎨 Customization Guide

### Update Personal Information
Edit `src/constants.tsx`:
```typescript
export const ABOUT_DATA = {
  name: "Your Name",
  role: "Your Role",
  location: "Your Location",
  bio: "Your bio here...",
  skills: ["Skill 1", "Skill 2", ...]
};
```

### Add New Projects
Add entries to the `PROJECTS` array in `src/constants.tsx`:
```typescript
{
  name: 'project-name',
  description: 'Project description',
  tags: ['Tech1', 'Tech2'],
  stars: 100,
  forks: 20,
  language: 'JavaScript',
  url: 'https://github.com/...'
}
```

### Update Social Links
Modify `SOCIAL_LINKS` in `src/constants.tsx`:
```typescript
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/...', icon: 'github' },
  // Add more links
];
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy!

### Deploy to GitHub Pages

```bash
npm run build
# Push the 'dist' folder to gh-pages branch
```

### Deploy to Netlify

1. Connect GitHub repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `dist`
4. Deploy!

---

## 📊 Performance Optimizations

- ✅ Code splitting with Vite
- ✅ Lazy loading of components
- ✅ Optimized image formats
- ✅ CSS tree-shaking with Tailwind
- ✅ Minified production builds
- ✅ SEO meta tags and structured data

---

## 🔒 Security

- No sensitive data in repository
- Environment variables for configuration
- Safe dependency versions in package-lock.json
- Regular dependency updates

---

## 📝 License

This project is open source and available under the **MIT License** - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests for any improvements.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact & Social

- **Email:** [kushh4@proton.me](mailto:kushh4@proton.me)
- **GitHub:** [@kaushall44](https://github.com/kaushall44)
- **LinkedIn:** [Kaushal Raj Gupta](https://linkedin.com/in/kaushalrajgupta)
- **Twitter:** [@kaushall44](https://twitter.com/kaushall44)

---

## 🙏 Acknowledgments

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **VS Code** - Inspiration for the UI design

---

<div align="center">
  <p>Made with ❤️ by <strong>Kaushal Raj Gupta</strong></p>
  <p>© 2025 All rights reserved.</p>
</div>
