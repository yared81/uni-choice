# UniMerk – Professional University Discovery Platform

A modern, professional web application built with React, TypeScript, and TailwindCSS to help students discover and compare universities across Ethiopia.

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **TailwindCSS** (styling)
- **React Router** (routing)
- **i18next** (multilingual support - 6 languages)
- **React I18next** (React integration for i18n)

## ✨ Features

- **Professional Design**: Multi-billion dollar company aesthetic
- **Hero Section**: Prominent centered search with tagline
- **Comprehensive Navigation**: Fixed header with smooth scrolling
- **University Discovery**: Search, filter, and browse institutions
- **Comparison Tool**: Side-by-side comparison of up to 3 universities
- **Detailed Profiles**: Tabbed university pages with overview, programs, and reviews
- **Multilingual**: Full support for English, Amharic, Tigrinya, Afaan Oromo, Somali, and Afar
- **Responsive Design**: Works beautifully on all devices
- **Professional Footer**: Complete site navigation and links

## 📁 Project Structure

```
unimerk-react/
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Professional fixed header
│   │   ├── Footer.tsx        # Complete footer
│   │   └── UniversityCard.tsx # Enhanced university cards
│   ├── pages/
│   │   ├── Home.tsx          # Landing page with hero
│   │   ├── Universities.tsx  # Browse/search universities
│   │   ├── UniversityProfile.tsx # Detailed university page
│   │   ├── Compare.tsx       # Comparison tool
│   │   ├── About.tsx         # About page
│   │   ├── Resources.tsx     # Resources & guides
│   │   ├── Contact.tsx       # Contact form
│   │   └── Help.tsx          # FAQ & help center
│   ├── i18n/
│   │   ├── config.ts         # i18n configuration
│   │   └── locales/          # Translation files (6 languages)
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── style.css             # Tailwind + custom styles
├── public/
│   └── data/
│       ├── universities.json # Mock data
│       └── reviews.json      # Mock reviews
└── tailwind.config.js        # Tailwind configuration
```

## 🎨 Design System

### Colors
- **Offwhite**: `#FAF8F5` - Background
- **Sand**: `#E7D9C4` - Accent
- **Charcoal**: `#2F2F2F` - Primary text
- **Olive**: `#6B7B4E` - Primary brand
- **Terracotta**: `#C96A50` - Secondary accent

### Typography
- **Headings**: Playfair Display / Merriweather (serif)
- **Body**: Inter / DM Sans (sans-serif)

### Spacing
- 8-12px rhythm
- Generous whitespace
- Consistent padding/margins

## 🛠️ Setup & Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Opens on `http://localhost:5173` (or next available port)

### Build for Production
```bash
npm run build
```

Output in `dist/` folder - ready for deployment to any static host.

### Preview Production Build
```bash
npm run preview
```

## 📄 Pages

1. **Home** (`/`) - Hero section, search, features, CTA
2. **Universities** (`/universities`) - Browse and search all universities
3. **University Profile** (`/university/:id`) - Detailed view with tabs
4. **Compare** (`/compare`) - Side-by-side comparison
5. **About** (`/about`) - Company story and mission
6. **Resources** (`/resources`) - Guides, scholarships, blog
7. **Contact** (`/contact`) - Contact form and information
8. **Help** (`/help`) - FAQ and support

## 🌍 Multilingual Support

All 6 languages are fully integrated:
- English (en)
- Amharic (am)
- Tigrinya (ti)
- Afaan Oromo (om)
- Somali (so)
- Afar (aa)

Language preference is saved in cookies and persists across sessions.

## 🚀 Deployment

### Static Hosting (Recommended)

The app builds to static files - deploy `dist/` to:

- **Vercel**: Push to GitHub → Import → Auto-detects Vite → Deploy
- **Netlify**: Build command: `npm run build`, Publish: `dist`
- **Cloudflare Pages**: Build: `npm run build`, Output: `dist`
- **GitHub Pages**: Build and push `dist` to `gh-pages` branch

### Build Command
```bash
npm run build
```

Output directory: `dist/`

## 📊 Mock Data

- Universities: Addis Ababa University, Bahir Dar University
- Reviews: Sample student reviews
- All data stored in `public/data/` (JSON files)

## ✨ Key Features Implemented

- ✅ Professional fixed header with logo and navigation
- ✅ Stunning hero section with centered search
- ✅ Introduction and features sections
- ✅ Multiple content pages with ready text
- ✅ Professional footer
- ✅ University cards with hover effects
- ✅ Detailed university profiles with tabs
- ✅ Comparison functionality
- ✅ Multilingual support
- ✅ Responsive design
- ✅ Smooth animations and transitions

---

**Ready for client presentation!** 🎉

