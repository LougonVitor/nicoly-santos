# 🐆 Nicoly Santos — Portfolio

> **"A missão está dada."**
> A political and institutional portfolio for Nicoly Santos, built with a cinematic scroll-driven hero animation, full sections for biography, initiatives, projects, volunteering, and contact — all in one single-page React app.

---

## 📋 Table of Contents

- [About](#about)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Components](#components)
- [Contact & Forms](#contact--forms)
- [Contributing](#contributing)
- [License](#license)

---

## About

This is the official front-end repository for **Nicoly Santos**, featuring a visually rich single-page application (SPA) with:

- A fullscreen intro zoom animation (with audio) that plays on load
- A scroll-driven hero banner that dynamically shrinks and morphs from fullscreen to a portrait card
- Sections covering her biography, political initiatives, community projects, volunteer opportunities, and a direct contact form
- A floating donation button for ongoing support

---

## WebSite deployed

> _[Nicoly Santos](https://nicolysantos.com)_

---

## ✨ Features

- 🎬 **Intro Animation** — Fullscreen zoom-in animation with audio (jaguar sound) on first load
- 🖼️ **Scroll-Driven Hero** — Hero banner smoothly shrinks and transitions as the user scrolls, swapping between two images using CSS custom properties
- 📱 **Responsive Design** — Adapts layout for mobile and desktop breakpoints
- 📬 **Contact Form** — Direct contact form integrated with Google Sheets for message capture
- 🙋 **Volunteer Form** — Sign-up form for volunteers, also backed by Google Sheets
- 💸 **Floating Donate Button** — A persistent floating action button for donations
- ⚡ **Vite Build** — Blazing-fast development and optimized production builds

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | ^19.2.5 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ~6.0.2 | Type safety |
| [Vite](https://vitejs.dev/) | ^8.0.12 | Build tool & dev server |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | ^6.0.1 | React fast refresh |
| [ESLint](https://eslint.org/) | ^10.2.1 | Linting |
| [typescript-eslint](https://typescript-eslint.io/) | ^8.58.2 | TypeScript ESLint rules |

---

## 📁 Project Structure

```
nicoly-santos/
└── front-end/
    ├── public/
    │   ├── nicoly-bandeira.png       # Public hero image (flag)
    │   ├── jaguar.svg                # Jaguar SVG asset
    │   └── favicon.svg
    ├── src/
    │   ├── assets/
    │   │   ├── capa-quem-e-nicoly.png
    │   │   ├── nicoly-bandeira.png
    │   │   ├── nicoly.jpeg
    │   │   └── quem-e-nicoly.png
    │   ├── components/
    │   │   ├── AboutMeSection/       # Bio & "Who is Nicoly" section
    │   │   ├── AnimationZoom/        # Intro zoom animation + audio
    │   │   ├── ContactSection/       # Contact form
    │   │   ├── DonateFloat/          # Floating donate button
    │   │   ├── HeroBanner/           # Scroll-driven hero image
    │   │   ├── InitiativesSection/   # Political initiatives
    │   │   ├── PresentationSection/  # Tagline / presentation text
    │   │   ├── ProjectsSection/      # Community projects
    │   │   └── VolunteerSection/     # Volunteer sign-up
    │   ├── hooks/
    │   │   ├── useContactForm.ts     # Contact form logic
    │   │   └── useVolunteerForm.ts   # Volunteer form logic
    │   ├── pages/
    │   │   └── HomePage/             # Main page, orchestrates all sections
    │   ├── services/
    │   │   └── googleSheets.ts       # Google Sheets API integration
    │   ├── App.tsx
    │   ├── App.css
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or your preferred package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/nicoly-santos.git
   cd nicoly-santos/front-end
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Type-check and build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🧩 Components

### `AnimationZoom`
Fullscreen intro animation that plays once on load. Includes a jaguar audio effect and a zoom transition before revealing the main content. Accepts an `onComplete` callback to signal the parent when the animation finishes.

### `HeroBanner`
The hero image component. Its width, height, border-radius, and box-shadow are all driven by scroll position via inline styles passed from `HomePage`.

### `PresentationSection`
A sticky background layer that fades in as the hero banner shrinks, revealing Nicoly's tagline.

### `AboutMe`
"Quem é Nicoly" — A full biography section with images and text describing her background and mission.

### `InitiativesSection`
Cards or blocks highlighting Nicoly's political initiatives and causes.

### `ProjectsSection`
Showcases community projects she leads or supports.

### `VolunteerSection`
A sign-up area for people who want to volunteer. Backed by a Google Sheets form hook (`useVolunteerForm`).

### `ContactSection`
A contact form allowing visitors to reach Nicoly directly. Backed by Google Sheets via `useContactForm`.

### `DonateFloat`
A floating button anchored to the viewport that links to a donation page or triggers a donation flow.

---

## 📬 Contact & Forms

Both the **Contact** and **Volunteer** forms submit data to a Google Sheets spreadsheet via the `src/services/googleSheets.ts` service. To configure your own sheet:

1. Create a Google Sheet and set up a Google Apps Script Web App to accept POST requests.
2. Update the endpoint URL in `src/services/googleSheets.ts`.
3. Redeploy.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or issue.

1. Fork the project
2. Create your feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a pull request

---

## 📄 License

This project is private. All rights reserved © Nicoly Santos.

---

<p align="center">
  Made with ❤️ for <strong>Nicoly Santos</strong>
</p>
