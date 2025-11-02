# UniChoice – University Discovery Platform

A web application that helps students discover and compare universities across Ethiopia. Built with React, TypeScript, and TailwindCSS.

**🌐 Live Site:** [uni-choice.vercel.app](https://uni-choice.vercel.app)

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **TailwindCSS** (styling)
- **React Router** (routing)
- **i18next** (multilingual support - 6 languages)
- **React I18next** (React integration for i18n)
- **Framer Motion** (animations)

## ✨ Features

- **University Discovery**: Search, filter, and browse universities across Ethiopia
- **Comparison Tool**: Side-by-side comparison of up to 3 universities
- **Detailed Profiles**: Comprehensive university pages with programs, facilities, admissions info, and reviews
- **User Accounts**: Create profiles, save favorites, and write reviews
- **Multilingual Support**: Available in English, Amharic, Tigrinya, Afaan Oromo, Somali, and Afar
- **University Management**: University representatives can edit and manage their institution profiles
- **Resources Section**: Access guides, scholarship information, and helpful resources
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📁 Project Structure

```
uni-choice/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── UniversityCard.tsx
│   │   ├── UniversityProfileView.tsx
│   │   ├── PageTransition.tsx
│   │   └── ScrollReveal.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Universities.tsx
│   │   ├── UniversityProfile.tsx
│   │   ├── Compare.tsx
│   │   ├── Profile.tsx
│   │   ├── About.tsx
│   │   ├── Resources.tsx
│   │   ├── Contact.tsx
│   │   ├── Help.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.json
│   │       ├── am.json
│   │       ├── ti.json
│   │       ├── om.json
│   │       ├── so.json
│   │       └── aa.json
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── translateUniversityData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── style.css
├── public/
│   ├── data/
│   │   ├── universities.json
│   │   └── reviews.json
│   └── img/
└── tailwind.config.js
```


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

Output in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📄 Pages

1. **Home** (`/`) - Landing page with search functionality and featured universities
2. **Universities** (`/universities`) - Browse and search all universities
3. **University Profile** (`/university/:id`) - Detailed university view with programs, facilities, and reviews
4. **Compare** (`/compare`) - Side-by-side comparison of universities
5. **Profile** (`/profile`) - User profile page with favorites and settings
6. **About** (`/about`) - Information about the platform
7. **Resources** (`/resources`) - Guides, scholarships, and educational resources
8. **Contact** (`/contact`) - Contact form and information
9. **Help** (`/help`) - FAQ and support center

## 🌍 Multilingual Support

The platform supports 6 languages:
- English (en)
- Amharic (am)
- Tigrinya (ti)
- Afaan Oromo (om)
- Somali (so)
- Afar (aa)

Language preference is automatically detected and saved for future visits.

## 💡 How It Works

### For Students
- Browse and search universities by name, location, or programs
- View detailed information about each university including programs offered, facilities, admission requirements, and student reviews
- Compare up to 3 universities side-by-side
- Save favorite universities for easy access
- Create an account to write reviews and manage your profile

### For University Representatives
- Create an account with university representative role
- Edit and manage your university's profile information
- Update programs, facilities, admission requirements, and other details
- View how your university appears to students

## 🔑 Authentication

The platform uses a simple authentication system:
- Users can sign up with email and password
- Two user roles: students and university representatives
- Session is maintained using localStorage
- User profiles can be customized with personal information

## 🎯 Key Features

- University search and filtering
- Detailed university profiles with multiple information sections
- Side-by-side comparison tool
- User authentication and profiles
- Favorites system
- Review system
- Multilingual interface
- Responsive mobile and desktop design
- Smooth animations and transitions
- University profile management for representatives
