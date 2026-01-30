# Recordwell Marketing Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static Astro marketing site for Recordwell with dual themes (light/dark) switchable via config for A/B testing.

**Architecture:** Pure Astro static site with CSS custom properties for theming. Theme selected at build time via `THEME` env variable. Self-hosted fonts, CSS-only animations. No JavaScript frameworks.

**Tech Stack:** Astro 4.x, CSS custom properties, GitHub Actions, S3/CloudFront

---

## Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`

**Step 1: Initialize Astro project**

Run:
```bash
npm create astro@latest . -- --template minimal --no-install --no-git
```

Expected: Astro scaffolds minimal project files

**Step 2: Install dependencies**

Run:
```bash
npm install
```

Expected: Dependencies installed, `node_modules` created

**Step 3: Verify dev server starts**

Run:
```bash
npm run dev
```

Expected: Server starts at `localhost:4321`, no errors

**Step 4: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src/
git commit -m "feat: initialize Astro project"
```

---

## Task 2: Set Up Theme System

**Files:**
- Create: `src/styles/themes/light.css`
- Create: `src/styles/themes/dark.css`
- Create: `src/styles/global.css`
- Modify: `astro.config.mjs`

**Step 1: Create light theme CSS variables**

Create `src/styles/themes/light.css`:

```css
:root[data-theme="light"] {
  /* Background */
  --color-bg-primary: #FDFCFA;
  --color-bg-secondary: #F5F3EF;
  --color-bg-tertiary: #EBE8E2;

  /* Text */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #4A4A4A;
  --color-text-muted: #7A7A7A;

  /* Brand - Deep teal */
  --color-brand-primary: #0D6E6E;
  --color-brand-hover: #0A5555;
  --color-brand-light: #E6F4F4;

  /* Accent - Warm coral */
  --color-accent: #E07A5F;
  --color-accent-hover: #C86A52;

  /* Semantic */
  --color-success: #2D6A4F;
  --color-border: #E0DCD4;

  /* Typography */
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

**Step 2: Create dark theme CSS variables**

Create `src/styles/themes/dark.css`:

```css
:root[data-theme="dark"] {
  /* Background */
  --color-bg-primary: #0A0A0C;
  --color-bg-secondary: #141418;
  --color-bg-tertiary: #1E1E24;

  /* Text */
  --color-text-primary: #F0F0F0;
  --color-text-secondary: #B0B0B0;
  --color-text-muted: #707070;

  /* Brand - Electric cyan */
  --color-brand-primary: #00D4AA;
  --color-brand-hover: #00F5C4;
  --color-brand-light: #0D2420;

  /* Accent - Amber */
  --color-accent: #F5A623;
  --color-accent-hover: #FFBA42;

  /* Semantic */
  --color-success: #00D4AA;
  --color-border: #2A2A32;

  /* Typography - same families, mono for headings */
  --font-heading: 'Space Mono', 'JetBrains Mono', monospace;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing - inherited from light */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows - subtle glow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.5);
}
```

**Step 3: Create global styles**

Create `src/styles/global.css`:

```css
@import './themes/light.css';
@import './themes/dark.css';

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text-primary);
}

h1 { font-size: 3rem; }
h2 { font-size: 2.25rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }

p {
  color: var(--color-text-secondary);
  max-width: 65ch;
}

a {
  color: var(--color-brand-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-brand-hover);
}

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-bg-tertiary);
  padding: 0.2em 0.4em;
  border-radius: var(--radius-sm);
}

/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Button base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-brand-primary);
  color: var(--color-bg-primary);
}

.btn-primary:hover {
  background: var(--color-brand-hover);
  color: var(--color-bg-primary);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-brand-primary);
  color: var(--color-brand-primary);
}

/* Utilities */
.text-center { text-align: center; }
.text-muted { color: var(--color-text-muted); }

/* Dark theme noise texture */
:root[data-theme="dark"] body {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}
```

**Step 4: Update Astro config for env variable**

Modify `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://recordwell.app',
  vite: {
    define: {
      'import.meta.env.THEME': JSON.stringify(process.env.THEME || 'light')
    }
  }
});
```

**Step 5: Commit**

```bash
git add src/styles/ astro.config.mjs
git commit -m "feat: add theme system with light and dark variants"
```

---

## Task 3: Download and Configure Fonts

**Files:**
- Create: `public/fonts/` directory with font files
- Modify: `src/styles/global.css`

**Step 1: Create fonts directory**

```bash
mkdir -p public/fonts
```

**Step 2: Add font-face declarations to global.css**

Add to top of `src/styles/global.css` (before imports):

```css
/* Fraunces - warm serif for light theme headings */
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

/* Source Sans 3 - clean sans for light theme body */
@font-face {
  font-family: 'Source Sans 3';
  src: url('/fonts/SourceSans3-Variable.woff2') format('woff2');
  font-weight: 200 900;
  font-display: swap;
}

/* Space Mono - for dark theme headings */
@font-face {
  font-family: 'Space Mono';
  src: url('/fonts/SpaceMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Space Mono';
  src: url('/fonts/SpaceMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

/* Inter - for dark theme body */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

/* JetBrains Mono - for code in both themes */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Variable.woff2') format('woff2');
  font-weight: 100 800;
  font-display: swap;
}
```

**Step 3: Download fonts**

Download variable font files from Google Fonts (woff2 format) and place in `public/fonts/`:
- Fraunces-Variable.woff2
- SourceSans3-Variable.woff2
- SpaceMono-Regular.woff2
- SpaceMono-Bold.woff2
- Inter-Variable.woff2
- JetBrainsMono-Variable.woff2

Use google-webfonts-helper or fontsource to get self-hosted files.

**Step 4: Verify fonts load**

Run: `npm run dev`
Check: Browser dev tools shows fonts loading from `/fonts/`

**Step 5: Commit**

```bash
git add public/fonts/ src/styles/global.css
git commit -m "feat: add self-hosted web fonts"
```

---

## Task 4: Create Base Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create BaseLayout component**

Create `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Privacy-focused family medical records' } = Astro.props;
const theme = import.meta.env.THEME || 'light';
---

<!DOCTYPE html>
<html lang="en" data-theme={theme}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | Recordwell</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

**Step 2: Update index page to use layout**

Modify `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <main class="container">
    <h1>Recordwell</h1>
    <p>Privacy-focused family medical records.</p>
  </main>
</BaseLayout>
```

**Step 3: Verify page renders with theme**

Run: `npm run dev`
Check: Page shows with correct theme colors and fonts

**Step 4: Commit**

```bash
git add src/layouts/ src/pages/index.astro
git commit -m "feat: add base layout with theme support"
```

---

## Task 5: Create Navigation Component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create Nav component**

Create `src/components/Nav.astro`:

```astro
---
const navItems = [
  { label: 'Features', href: '#features', children: [
    { label: 'Encryption', href: '/encryption/' },
    { label: 'Family Sharing', href: '/sharing/' },
    { label: 'Your Data', href: '/your-data/' },
    { label: 'Architecture', href: '/architecture/' },
  ]},
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support', href: '/support/' },
];
---

<nav class="nav">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <span class="logo-text">Recordwell</span>
    </a>

    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="hamburger"></span>
    </button>

    <div class="nav-menu">
      <ul class="nav-list">
        {navItems.map((item) => (
          <li class="nav-item">
            {item.children ? (
              <div class="nav-dropdown">
                <button class="nav-link nav-dropdown-trigger">
                  {item.label}
                  <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  </svg>
                </button>
                <ul class="nav-dropdown-menu">
                  {item.children.map((child) => (
                    <li><a href={child.href}>{child.label}</a></li>
                  ))}
                </ul>
              </div>
            ) : (
              <a href={item.href} class="nav-link">{item.label}</a>
            )}
          </li>
        ))}
      </ul>

      <a href="https://github.com/recordwell" class="btn btn-secondary nav-cta" target="_blank" rel="noopener">
        GitHub
      </a>
    </div>
  </div>
</nav>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-bg-primary);
    border-bottom: 1px solid var(--color-border);
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-md) var(--space-lg);
  }

  .nav-logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    text-decoration: none;
  }

  .nav-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-sm);
  }

  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-text-primary);
    position: relative;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--color-text-primary);
    left: 0;
  }

  .hamburger::before { top: -8px; }
  .hamburger::after { top: 8px; }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  .nav-list {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    list-style: none;
  }

  .nav-link {
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    padding: var(--space-sm) 0;
    transition: color 0.2s;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .nav-link:hover {
    color: var(--color-brand-primary);
  }

  .nav-dropdown {
    position: relative;
  }

  .nav-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-sm);
    min-width: 180px;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    box-shadow: var(--shadow-lg);
  }

  .nav-dropdown:hover .nav-dropdown-menu,
  .nav-dropdown:focus-within .nav-dropdown-menu {
    opacity: 1;
    visibility: visible;
  }

  .nav-dropdown-menu li a {
    display: block;
    padding: var(--space-sm) var(--space-md);
    color: var(--color-text-secondary);
    border-radius: var(--radius-sm);
    transition: background 0.2s, color 0.2s;
  }

  .nav-dropdown-menu li a:hover {
    background: var(--color-bg-secondary);
    color: var(--color-brand-primary);
  }

  .dropdown-arrow {
    transition: transform 0.2s;
  }

  .nav-dropdown:hover .dropdown-arrow {
    transform: rotate(180deg);
  }

  .nav-cta {
    padding: var(--space-sm) var(--space-md);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .nav-toggle {
      display: block;
    }

    .nav-menu {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-bg-primary);
      flex-direction: column;
      align-items: stretch;
      padding: var(--space-lg);
      gap: var(--space-md);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }

    .nav-menu.open {
      transform: translateX(0);
    }

    .nav-list {
      flex-direction: column;
      align-items: stretch;
    }

    .nav-dropdown-menu {
      position: static;
      transform: none;
      opacity: 1;
      visibility: visible;
      box-shadow: none;
      border: none;
      padding-left: var(--space-md);
    }
  }
</style>

<script>
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('open');
  });
</script>
```

**Step 2: Add Nav to BaseLayout**

Modify `src/layouts/BaseLayout.astro` to include Nav:

```astro
---
import Nav from '../components/Nav.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Privacy-focused family medical records' } = Astro.props;
const theme = import.meta.env.THEME || 'light';
---

<!DOCTYPE html>
<html lang="en" data-theme={theme}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | Recordwell</title>
  </head>
  <body>
    <Nav />
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

**Step 3: Verify navigation renders**

Run: `npm run dev`
Check: Nav appears with logo, links, dropdown, and hamburger on mobile

**Step 4: Commit**

```bash
git add src/components/Nav.astro src/layouts/BaseLayout.astro
git commit -m "feat: add responsive navigation with dropdown"
```

---

## Task 6: Create Footer Component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
const currentYear = new Date().getFullYear();

const footerLinks = [
  {
    title: 'Features',
    links: [
      { label: 'Encryption', href: '/encryption/' },
      { label: 'Family Sharing', href: '/sharing/' },
      { label: 'Your Data', href: '/your-data/' },
      { label: 'Architecture', href: '/architecture/' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Support', href: '/support/' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'GitHub', href: 'https://github.com/recordwell', external: true },
    ]
  }
];
---

<footer class="footer">
  <div class="footer-container">
    <div class="footer-brand">
      <a href="/" class="footer-logo">Recordwell</a>
      <p class="footer-tagline">Privacy-focused family medical records.</p>
    </div>

    <div class="footer-links">
      {footerLinks.map((section) => (
        <div class="footer-section">
          <h4>{section.title}</h4>
          <ul>
            {section.links.map((link) => (
              <li>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div class="footer-bottom">
      <p>&copy; {currentYear} Recordwell. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-2xl);
    padding: var(--space-xl) 0 var(--space-lg);
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .footer-brand {
    margin-bottom: var(--space-xl);
  }

  .footer-logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    text-decoration: none;
  }

  .footer-tagline {
    margin-top: var(--space-sm);
    color: var(--color-text-muted);
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-xl);
    margin-bottom: var(--space-xl);
  }

  .footer-section h4 {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    margin-bottom: var(--space-md);
  }

  .footer-section ul {
    list-style: none;
  }

  .footer-section li {
    margin-bottom: var(--space-sm);
  }

  .footer-section a {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-section a:hover {
    color: var(--color-brand-primary);
  }

  .footer-bottom {
    border-top: 1px solid var(--color-border);
    padding-top: var(--space-lg);
  }

  .footer-bottom p {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
</style>
```

**Step 2: Add Footer to BaseLayout**

Modify `src/layouts/BaseLayout.astro`:

```astro
---
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Privacy-focused family medical records' } = Astro.props;
const theme = import.meta.env.THEME || 'light';
---

<!DOCTYPE html>
<html lang="en" data-theme={theme}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | Recordwell</title>
  </head>
  <body>
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

**Step 3: Verify footer renders**

Run: `npm run dev`
Check: Footer shows at bottom with links and copyright

**Step 4: Commit**

```bash
git add src/components/Footer.astro src/layouts/BaseLayout.astro
git commit -m "feat: add footer component"
```

---

## Task 7: Create Hero Component

**Files:**
- Create: `src/components/Hero.astro`

**Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---
interface Props {
  title: string;
  subtitle: string;
  showCtas?: boolean;
}

const { title, subtitle, showCtas = true } = Astro.props;
---

<section class="hero">
  <div class="hero-container">
    <h1 class="hero-title">{title}</h1>
    <p class="hero-subtitle">{subtitle}</p>

    {showCtas && (
      <div class="hero-ctas">
        <a href="#" class="btn btn-primary app-store-btn">
          <svg class="app-store-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
          </svg>
          <span class="app-store-text">
            <span class="app-store-small">Coming Soon on</span>
            <span class="app-store-large">App Store</span>
          </span>
        </a>

        <a href="https://github.com/recordwell" class="btn btn-secondary" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    )}
  </div>
</section>

<style>
  .hero {
    padding: var(--space-2xl) 0;
    text-align: center;
  }

  .hero-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: var(--space-lg);
    background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-brand-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto var(--space-xl);
  }

  .hero-ctas {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    flex-wrap: wrap;
  }

  .app-store-btn {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-lg);
  }

  .app-store-icon {
    width: 28px;
    height: 28px;
  }

  .app-store-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;
  }

  .app-store-small {
    font-size: 0.7rem;
    font-weight: 400;
    opacity: 0.9;
  }

  .app-store-large {
    font-size: 1.1rem;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .hero-ctas {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }
  }
</style>
```

**Step 2: Verify hero renders**

Run: `npm run dev`
Check: Hero section displays with gradient title, subtitle, and CTA buttons

**Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add hero component with CTAs"
```

---

## Task 8: Create Feature Card Component

**Files:**
- Create: `src/components/FeatureCard.astro`

**Step 1: Create FeatureCard component**

Create `src/components/FeatureCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  href: string;
  icon: string;
}

const { title, description, href, icon } = Astro.props;

const icons: Record<string, string> = {
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
  server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`,
};
---

<a href={href} class="feature-card">
  <div class="feature-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <Fragment set:html={icons[icon] || icons.shield} />
    </svg>
  </div>
  <h3 class="feature-title">{title}</h3>
  <p class="feature-description">{description}</p>
  <span class="feature-link">
    Learn more
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  </span>
</a>

<style>
  .feature-card {
    display: flex;
    flex-direction: column;
    padding: var(--space-lg);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-brand-primary);
  }

  .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--color-brand-light);
    color: var(--color-brand-primary);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-md);
  }

  .feature-title {
    font-size: 1.25rem;
    margin-bottom: var(--space-sm);
    color: var(--color-text-primary);
  }

  .feature-description {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    flex-grow: 1;
    margin-bottom: var(--space-md);
  }

  .feature-link {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-weight: 600;
    color: var(--color-brand-primary);
    font-size: 0.9rem;
  }

  .feature-link svg {
    transition: transform 0.2s;
  }

  .feature-card:hover .feature-link svg {
    transform: translateX(4px);
  }
</style>
```

**Step 2: Verify component renders**

Create test usage in index.astro temporarily, then check dev server.

**Step 3: Commit**

```bash
git add src/components/FeatureCard.astro
git commit -m "feat: add feature card component"
```

---

## Task 9: Create Pricing Table Component

**Files:**
- Create: `src/components/PricingTable.astro`

**Step 1: Create PricingTable component**

Create `src/components/PricingTable.astro`:

```astro
---
const commonFeatures = [
  'End-to-end encryption',
  'Offline-first - works without internet',
  'Vaccines, medications, allergies, conditions',
  'Custom record types',
  'Attachments (photos, PDFs)',
  'Data export',
];

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need for personal use',
    features: commonFeatures,
    cta: { label: 'Download Free', href: '#' },
    highlighted: false,
  },
  {
    name: 'Sync',
    price: 'TBD',
    period: '/month',
    description: 'Never lose your records, share with family',
    features: [
      ...commonFeatures,
      'Multi-device sync',
      'Family sharing',
      'Cloud backup',
      'Secure recovery',
    ],
    cta: { label: 'Coming Soon', href: '#' },
    highlighted: true,
  },
  {
    name: 'Self-Hosted',
    price: '$0',
    period: '+ your infrastructure',
    description: 'Full control over your data',
    features: [
      ...commonFeatures,
      'Multi-device sync',
      'Family sharing',
      'Cloud backup',
      'Secure recovery',
      'Run your own backend',
    ],
    cta: { label: 'View Docs', href: '/architecture/' },
    highlighted: false,
  },
];
---

<section class="pricing" id="pricing">
  <div class="pricing-container">
    <h2 class="pricing-title">Simple, transparent pricing</h2>
    <p class="pricing-subtitle">Start free. Upgrade when you need sync and sharing.</p>

    <div class="pricing-grid">
      {tiers.map((tier) => (
        <div class={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}>
          {tier.highlighted && <span class="pricing-badge">Most Popular</span>}
          <h3 class="tier-name">{tier.name}</h3>
          <div class="tier-price">
            <span class="price">{tier.price}</span>
            <span class="period">{tier.period}</span>
          </div>
          <p class="tier-description">{tier.description}</p>

          <ul class="tier-features">
            {tier.features.map((feature) => (
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href={tier.cta.href}
            class={`btn ${tier.highlighted ? 'btn-primary' : 'btn-secondary'} tier-cta`}
          >
            {tier.cta.label}
          </a>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .pricing {
    padding: var(--space-2xl) 0;
  }

  .pricing-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .pricing-title {
    text-align: center;
    margin-bottom: var(--space-sm);
  }

  .pricing-subtitle {
    text-align: center;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xl);
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-lg);
    align-items: start;
  }

  .pricing-card {
    position: relative;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
  }

  .pricing-card.highlighted {
    border-color: var(--color-brand-primary);
    box-shadow: 0 0 0 1px var(--color-brand-primary);
  }

  .pricing-badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-brand-primary);
    color: var(--color-bg-primary);
    font-size: 0.75rem;
    font-weight: 600;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-full);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tier-name {
    font-size: 1.25rem;
    margin-bottom: var(--space-sm);
  }

  .tier-price {
    margin-bottom: var(--space-md);
  }

  .price {
    font-size: 2.5rem;
    font-weight: 700;
    font-family: var(--font-heading);
  }

  .period {
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .tier-description {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-lg);
    border-bottom: 1px solid var(--color-border);
  }

  .tier-features {
    list-style: none;
    margin-bottom: var(--space-lg);
    flex-grow: 1;
  }

  .tier-features li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }

  .tier-features svg {
    color: var(--color-success);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .tier-cta {
    width: 100%;
    justify-content: center;
  }
</style>
```

**Step 2: Verify pricing renders**

Run: `npm run dev`
Check: Pricing grid shows three tiers with features and CTAs

**Step 3: Commit**

```bash
git add src/components/PricingTable.astro
git commit -m "feat: add pricing table component"
```

---

## Task 10: Build Complete Landing Page

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/Features.astro`

**Step 1: Create Features section component**

Create `src/components/Features.astro`:

```astro
---
import FeatureCard from './FeatureCard.astro';

const features = [
  {
    title: 'Zero-Knowledge Encryption',
    description: 'Your data is encrypted before it leaves your device. Even we cannot read your medical records.',
    href: '/encryption/',
    icon: 'shield',
  },
  {
    title: 'Family Sharing',
    description: 'Share specific records with family members. Grandma sees vaccine records, not everything.',
    href: '/sharing/',
    icon: 'users',
  },
  {
    title: 'Your Data, Your Control',
    description: 'Export anytime in standard formats. No lock-in. Your health records belong to you.',
    href: '/your-data/',
    icon: 'download',
  },
  {
    title: 'Self-Host Option',
    description: 'Run your own backend with Docker and S3. Complete control for the privacy-conscious.',
    href: '/architecture/',
    icon: 'server',
  },
];
---

<section class="features" id="features">
  <div class="features-container">
    <h2 class="features-title">Built for privacy from the ground up</h2>
    <p class="features-subtitle">Not just encrypted - architecturally private. Your medical records, truly yours.</p>

    <div class="features-grid">
      {features.map((feature) => (
        <FeatureCard {...feature} />
      ))}
    </div>
  </div>
</section>

<style>
  .features {
    padding: var(--space-2xl) 0;
    background: var(--color-bg-primary);
  }

  .features-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .features-title {
    text-align: center;
    margin-bottom: var(--space-sm);
  }

  .features-subtitle {
    text-align: center;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xl);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--space-lg);
  }
</style>
```

**Step 2: Update landing page with all sections**

Modify `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Features from '../components/Features.astro';
import PricingTable from '../components/PricingTable.astro';
---

<BaseLayout
  title="Home"
  description="Privacy-focused family medical records. End-to-end encrypted, offline-first, and truly yours."
>
  <Hero
    title="Your family's health records. Private by design."
    subtitle="End-to-end encrypted medical records that even we can't read. Track vaccines, medications, allergies, and more - securely."
  />

  <Features />

  <PricingTable />

  <section class="final-cta">
    <div class="cta-container">
      <h2>Ready to take control of your health records?</h2>
      <p>Start with the free app. Upgrade when you need sync and sharing.</p>
      <div class="cta-buttons">
        <a href="#" class="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
          </svg>
          Coming Soon
        </a>
        <a href="https://github.com/recordwell" class="btn btn-secondary" target="_blank" rel="noopener">
          View on GitHub
        </a>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .final-cta {
    padding: var(--space-2xl) 0;
    text-align: center;
    background: var(--color-bg-secondary);
  }

  .cta-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .cta-container h2 {
    margin-bottom: var(--space-sm);
  }

  .cta-container p {
    color: var(--color-text-secondary);
    margin-bottom: var(--space-lg);
    max-width: none;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    flex-wrap: wrap;
  }
</style>
```

**Step 3: Verify complete landing page**

Run: `npm run dev`
Check: All sections render - Hero, Features, Pricing, Final CTA

**Step 4: Commit**

```bash
git add src/components/Features.astro src/pages/index.astro
git commit -m "feat: complete landing page with all sections"
```

---

## Task 11: Create Feature Page Layout

**Files:**
- Create: `src/layouts/FeatureLayout.astro`

**Step 1: Create FeatureLayout component**

Create `src/layouts/FeatureLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
}

const { title, description, heroTitle, heroSubtitle } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <article class="feature-page">
    <header class="feature-header">
      <div class="header-container">
        <h1>{heroTitle}</h1>
        <p class="lead">{heroSubtitle}</p>
      </div>
    </header>

    <div class="feature-content">
      <slot />
    </div>

    <aside class="feature-cta">
      <div class="cta-container">
        <h3>Ready to try Recordwell?</h3>
        <div class="cta-buttons">
          <a href="/" class="btn btn-primary">Learn More</a>
          <a href="https://github.com/recordwell" class="btn btn-secondary" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </div>
      </div>
    </aside>
  </article>
</BaseLayout>

<style>
  .feature-page {
    min-height: 100vh;
  }

  .feature-header {
    padding: var(--space-2xl) 0;
    background: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
  }

  .header-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .feature-header h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: var(--space-md);
  }

  .lead {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    max-width: 600px;
  }

  .feature-content {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-xl) var(--space-lg);
  }

  .feature-content :global(h2) {
    margin-top: var(--space-xl);
    margin-bottom: var(--space-md);
  }

  .feature-content :global(h3) {
    margin-top: var(--space-lg);
    margin-bottom: var(--space-sm);
  }

  .feature-content :global(p) {
    margin-bottom: var(--space-md);
    max-width: none;
  }

  .feature-content :global(ul),
  .feature-content :global(ol) {
    margin-bottom: var(--space-md);
    padding-left: var(--space-lg);
  }

  .feature-content :global(li) {
    margin-bottom: var(--space-sm);
    color: var(--color-text-secondary);
  }

  .feature-content :global(pre) {
    background: var(--color-bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin-bottom: var(--space-md);
  }

  .feature-content :global(blockquote) {
    border-left: 3px solid var(--color-brand-primary);
    padding-left: var(--space-md);
    margin: var(--space-lg) 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }

  .feature-cta {
    padding: var(--space-xl) 0;
    background: var(--color-bg-secondary);
    text-align: center;
  }

  .cta-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .cta-container h3 {
    margin-bottom: var(--space-md);
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    flex-wrap: wrap;
  }
</style>
```

**Step 2: Commit**

```bash
git add src/layouts/FeatureLayout.astro
git commit -m "feat: add feature page layout"
```

---

## Task 12: Create Encryption Page

**Files:**
- Create: `src/pages/encryption.astro`

**Step 1: Create encryption page**

Create `src/pages/encryption.astro`:

```astro
---
import FeatureLayout from '../layouts/FeatureLayout.astro';
---

<FeatureLayout
  title="Zero-Knowledge Encryption"
  description="Learn how Recordwell uses end-to-end encryption to keep your medical records private - even from us."
  heroTitle="Zero-Knowledge Encryption"
  heroSubtitle="Your medical records are encrypted before they leave your device. We literally cannot read your data - and that's by design."
>
  <h2>What does "zero-knowledge" mean?</h2>
  <p>
    When we say zero-knowledge, we mean it architecturally. Your data is encrypted on your device using keys that only you control. When your encrypted data reaches our servers, it's just meaningless bytes to us.
  </p>
  <p>
    This isn't marketing language - it's a fundamental design choice. Even if someone compromised our servers, they'd get nothing useful. No medical records, no family member names, no attachment contents.
  </p>

  <h2>How it works</h2>
  <p>
    Recordwell uses a layered encryption approach:
  </p>
  <ul>
    <li><strong>Your Primary Key</strong> - Derived from your password using Argon2id, a modern algorithm designed to resist attacks. This key never leaves your device.</li>
    <li><strong>Family Member Keys</strong> - Each person in your family has their own encryption key. Emma's records are encrypted separately from Liam's.</li>
    <li><strong>AES-256-GCM</strong> - Industry-standard encryption for all your medical records. The same encryption used by banks and governments.</li>
  </ul>

  <h2>What we can see</h2>
  <p>
    We believe in being honest about privacy trade-offs. Our server can see:
  </p>
  <ul>
    <li>That you have an account</li>
    <li>When you sync (timestamps)</li>
    <li>How much encrypted data you store (blob sizes)</li>
    <li>Who you share with (email addresses for invitations)</li>
  </ul>
  <p>
    Our server cannot see:
  </p>
  <ul>
    <li>Any medical record content</li>
    <li>Family member names</li>
    <li>Attachment contents or filenames</li>
    <li>Your password or encryption keys</li>
  </ul>

  <h2>Verify it yourself</h2>
  <p>
    Recordwell is open source. You can audit the encryption implementation, review our architecture decisions, and verify our claims. We encourage security researchers to examine our code.
  </p>
  <p>
    <a href="https://github.com/recordwell" target="_blank" rel="noopener">View the source code on GitHub</a>
  </p>
</FeatureLayout>
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `localhost:4321/encryption/`
Check: Page renders with header, content, and CTA

**Step 3: Commit**

```bash
git add src/pages/encryption.astro
git commit -m "feat: add encryption feature page"
```

---

## Task 13: Create Sharing Page

**Files:**
- Create: `src/pages/sharing.astro`

**Step 1: Create sharing page**

Create `src/pages/sharing.astro`:

```astro
---
import FeatureLayout from '../layouts/FeatureLayout.astro';
---

<FeatureLayout
  title="Family Sharing"
  description="Share specific medical records with family members while keeping everything else private."
  heroTitle="Family Sharing"
  heroSubtitle="Share Emma's vaccine records with Grandma without giving access to everything. Granular, cryptographic access control."
>
  <h2>Sharing that makes sense for families</h2>
  <p>
    Medical records are personal, but families need to share. A grandparent watching the kids needs to know about allergies. A spouse should have access in emergencies. But that doesn't mean everyone needs to see everything.
  </p>
  <p>
    Recordwell lets you share per-person. Share your child's records with their other parent. Share your own records with your spouse. Keep your teenager's mental health notes private.
  </p>

  <h2>How sharing works</h2>
  <p>
    When you invite someone to view records, Recordwell:
  </p>
  <ul>
    <li>Generates a cryptographic key specifically for that sharing relationship</li>
    <li>Encrypts only the records you choose to share</li>
    <li>Sends an invitation with the encrypted key material</li>
    <li>The recipient can only decrypt what you've explicitly shared</li>
  </ul>
  <p>
    This isn't permission flags in a database - it's mathematics. Someone you haven't shared with literally cannot decrypt the data, even if they somehow accessed our servers.
  </p>

  <h2>Revoking access</h2>
  <p>
    Life changes. Divorces happen. Relationships evolve. When you revoke someone's access:
  </p>
  <ul>
    <li>We generate new encryption keys for the affected records</li>
    <li>All data is re-encrypted with the new keys</li>
    <li>The revoked person's old keys become useless</li>
  </ul>
  <p>
    This is real revocation, not just hiding records in the UI. The old keys mathematically cannot decrypt the new data.
  </p>

  <h2>Trust, but verify</h2>
  <p>
    For high-security scenarios, Recordwell supports optional verification codes. When you share with someone, you can verify their identity out-of-band (in person, over the phone) using a short code. This prevents man-in-the-middle attacks on the sharing process.
  </p>
</FeatureLayout>
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `localhost:4321/sharing/`

**Step 3: Commit**

```bash
git add src/pages/sharing.astro
git commit -m "feat: add family sharing feature page"
```

---

## Task 14: Create Your Data Page

**Files:**
- Create: `src/pages/your-data.astro`

**Step 1: Create your-data page**

Create `src/pages/your-data.astro`:

```astro
---
import FeatureLayout from '../layouts/FeatureLayout.astro';
---

<FeatureLayout
  title="Your Data, Your Control"
  description="Export your medical records anytime in standard formats. No lock-in, no vendor dependency."
  heroTitle="Your Data, Your Control"
  heroSubtitle="Your health records belong to you. Export anytime, in formats any developer can read. No lock-in. No tricks."
>
  <h2>Data portability is a feature</h2>
  <p>
    Too many apps trap your data. They make it easy to import, hard to export. We think that's wrong - especially for something as important as medical records.
  </p>
  <p>
    Recordwell exports your data in standard JSON format with clear documentation. Any competent developer can build an importer. You're never stuck with us.
  </p>

  <h2>Export options</h2>
  <p>
    You can export your data in multiple ways:
  </p>
  <ul>
    <li><strong>Encrypted backup</strong> - Your data stays encrypted, protected by your password. Useful for secure storage or transfer to a new device.</li>
    <li><strong>Decrypted export</strong> - Plain JSON you can read, process, or import elsewhere. Human-readable and machine-parseable.</li>
    <li><strong>Per-person export</strong> - Export just one family member's records, useful for sharing with healthcare providers.</li>
  </ul>

  <h2>No subscription hostage</h2>
  <p>
    If you stop paying for Sync, you don't lose your data. The free app works completely offline with local storage. Your records stay on your device, fully functional.
  </p>
  <p>
    The paid Sync service adds convenience - multi-device access, cloud backup, family sharing. But it's never required to access what's already yours.
  </p>

  <h2>Open format</h2>
  <p>
    Our export format is documented and versioned. It includes:
  </p>
  <ul>
    <li>All record types (vaccines, medications, conditions, allergies, notes)</li>
    <li>Custom record schemas you've created</li>
    <li>Attachments (with checksums for verification)</li>
    <li>Metadata about encryption if applicable</li>
  </ul>
  <p>
    We publish the format specification so others can build compatible tools.
  </p>
</FeatureLayout>
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `localhost:4321/your-data/`

**Step 3: Commit**

```bash
git add src/pages/your-data.astro
git commit -m "feat: add your data feature page"
```

---

## Task 15: Create Architecture Page

**Files:**
- Create: `src/pages/architecture.astro`

**Step 1: Create architecture page**

Create `src/pages/architecture.astro`:

```astro
---
import FeatureLayout from '../layouts/FeatureLayout.astro';
---

<FeatureLayout
  title="Technical Architecture"
  description="Self-host Recordwell with Docker and S3-compatible storage. Full technical documentation for the privacy-conscious."
  heroTitle="Technical Architecture"
  heroSubtitle="For developers and self-hosters. Understand how Recordwell works under the hood, and run your own backend."
>
  <h2>Architecture overview</h2>
  <p>
    Recordwell follows a "dumb server" design. The server stores encrypted blobs and handles authentication - nothing more. All the intelligence lives in the client.
  </p>
  <ul>
    <li><strong>iOS Client</strong> - SwiftUI app with local Core Data storage, CryptoKit for encryption</li>
    <li><strong>Auth Server</strong> - Rust-based OPAQUE authentication (RFC 9807), runs on Cloudflare Workers or Docker</li>
    <li><strong>Storage</strong> - Any S3-compatible backend (AWS S3, MinIO, Cloudflare R2)</li>
  </ul>

  <h2>Self-hosting requirements</h2>
  <p>
    To run your own Recordwell backend:
  </p>
  <ul>
    <li>Docker host (any Linux server, Raspberry Pi, etc.)</li>
    <li>S3-compatible storage (MinIO works great for home use)</li>
    <li>Domain with TLS certificate (Let's Encrypt works fine)</li>
  </ul>
  <p>
    The auth server is a single Docker container. Storage is just a bucket. No database required for the minimal setup.
  </p>

  <h2>Why OPAQUE?</h2>
  <p>
    Most apps send your password (or a hash of it) to the server during login. OPAQUE is different - it's a Password-Authenticated Key Exchange that never reveals your password to the server.
  </p>
  <p>
    Even if our auth server is compromised, attackers can't extract passwords. They can only attempt online brute-force attacks, which we rate-limit aggressively.
  </p>

  <h2>Open source</h2>
  <p>
    Everything is open source:
  </p>
  <ul>
    <li>iOS app - Swift, SwiftUI, CryptoKit</li>
    <li>Auth server - Rust, opaque-ke crate</li>
    <li>Documentation - Architecture Decision Records (ADRs)</li>
  </ul>
  <p>
    We publish detailed ADRs explaining every security decision. No security through obscurity.
  </p>
  <p>
    <a href="https://github.com/recordwell" target="_blank" rel="noopener">Explore the code on GitHub</a>
  </p>

  <h2>Getting started</h2>
  <p>
    Self-hosting documentation is available in the GitHub repository. The basic steps:
  </p>
  <ol>
    <li>Set up S3-compatible storage (MinIO recommended for home use)</li>
    <li>Deploy the auth container with your configuration</li>
    <li>Point the iOS app to your server URL</li>
  </ol>
  <p>
    Detailed setup guides are in the docs folder.
  </p>
</FeatureLayout>
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `localhost:4321/architecture/`

**Step 3: Commit**

```bash
git add src/pages/architecture.astro
git commit -m "feat: add technical architecture page"
```

---

## Task 16: Create Support Page

**Files:**
- Create: `src/pages/support.astro`

**Step 1: Create support page**

Create `src/pages/support.astro`:

```astro
---
import FeatureLayout from '../layouts/FeatureLayout.astro';

const faqs = [
  {
    question: "Is my data really private?",
    answer: "Yes. Your data is encrypted on your device before it ever reaches our servers. We use AES-256-GCM encryption with keys derived from your password. We literally cannot read your medical records - and that's intentional."
  },
  {
    question: "What happens if I forget my password?",
    answer: "With the Sync service, you'll have a recovery code (like a 24-word phrase) that can restore your account. Store this somewhere safe - without it, a forgotten password means lost data. This is the trade-off for true privacy."
  },
  {
    question: "Can I use Recordwell without an internet connection?",
    answer: "Absolutely. The free version works completely offline. All your data is stored locally on your device. The Sync service adds cloud backup and multi-device access, but it's never required."
  },
  {
    question: "Is Recordwell HIPAA compliant?",
    answer: "Recordwell is a personal project, not enterprise healthcare software. We've designed it with strong privacy in mind, but we don't make HIPAA compliance claims. Use it for personal and family health tracking, not clinical practice."
  },
  {
    question: "How do I export my data?",
    answer: "In the app settings, you'll find export options. You can export encrypted backups (password-protected) or decrypted JSON files. The format is documented so you can process it however you like."
  },
  {
    question: "Can I self-host the backend?",
    answer: "Yes! The backend is open source and designed for self-hosting. You'll need Docker and S3-compatible storage (MinIO works great). See the Architecture page for details."
  },
];
---

<FeatureLayout
  title="Support"
  description="Get help with Recordwell. FAQs, bug reports, and contact information."
  heroTitle="Support"
  heroSubtitle="Questions? We've got answers. For bug reports and feature requests, head to GitHub."
>
  <h2>Frequently Asked Questions</h2>

  <div class="faq-list">
    {faqs.map((faq) => (
      <details class="faq-item">
        <summary class="faq-question">{faq.question}</summary>
        <p class="faq-answer">{faq.answer}</p>
      </details>
    ))}
  </div>

  <h2>Bug Reports & Feature Requests</h2>
  <p>
    Found a bug? Have an idea for a feature? We track everything on GitHub:
  </p>
  <p>
    <a href="https://github.com/recordwell/issues" target="_blank" rel="noopener">Open an issue on GitHub</a>
  </p>
  <p>
    Please search existing issues before creating a new one - someone might have already reported it.
  </p>

  <h2>Security Issues</h2>
  <p>
    If you've found a security vulnerability, please don't post it publicly. Email us directly at <a href="mailto:security@recordwell.app">security@recordwell.app</a> and we'll address it promptly.
  </p>

  <h2>General Questions</h2>
  <p>
    For general questions not covered in the FAQ, you can reach us at <a href="mailto:hello@recordwell.app">hello@recordwell.app</a>.
  </p>
</FeatureLayout>

<style>
  .faq-list {
    margin: var(--space-lg) 0;
  }

  .faq-item {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-md);
    overflow: hidden;
  }

  .faq-question {
    padding: var(--space-md);
    cursor: pointer;
    font-weight: 600;
    color: var(--color-text-primary);
    background: var(--color-bg-secondary);
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faq-question::after {
    content: '+';
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--color-text-muted);
    transition: transform 0.2s;
  }

  .faq-item[open] .faq-question::after {
    transform: rotate(45deg);
  }

  .faq-question::-webkit-details-marker {
    display: none;
  }

  .faq-answer {
    padding: var(--space-md);
    border-top: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    margin: 0;
  }
</style>
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `localhost:4321/support/`

**Step 3: Commit**

```bash
git add src/pages/support.astro
git commit -m "feat: add support page with FAQ"
```

---

## Task 17: Create Privacy Policy Page

**Files:**
- Create: `src/pages/privacy.astro`

**Step 1: Create privacy policy page**

Create `src/pages/privacy.astro`:

```astro
---
import FeatureLayout from '../layouts/FeatureLayout.astro';

const lastUpdated = "January 2026";
---

<FeatureLayout
  title="Privacy Policy"
  description="Recordwell privacy policy. How we handle (and don't handle) your data."
  heroTitle="Privacy Policy"
  heroSubtitle={`Last updated: ${lastUpdated}`}
>
  <h2>The Short Version</h2>
  <p>
    Your medical records are end-to-end encrypted. We cannot read them. We collect minimal data needed to operate the service. We don't sell your information to anyone.
  </p>

  <h2>What We Collect</h2>

  <h3>Account Information</h3>
  <p>
    When you create a Sync account, we collect:
  </p>
  <ul>
    <li>Email address (for account recovery and service communications)</li>
    <li>Authentication credentials (stored using OPAQUE - we never see your password)</li>
  </ul>

  <h3>Usage Data</h3>
  <p>
    We collect minimal technical data:
  </p>
  <ul>
    <li>Sync timestamps (when you last synced)</li>
    <li>Storage usage (how much encrypted data you store)</li>
    <li>Error logs (to fix bugs - no personal data included)</li>
  </ul>

  <h3>What We Cannot See</h3>
  <p>
    Due to end-to-end encryption, we cannot see:
  </p>
  <ul>
    <li>Medical record contents</li>
    <li>Family member names</li>
    <li>Attachment contents or file names</li>
    <li>Your encryption keys or password</li>
  </ul>

  <h2>How We Use Your Data</h2>
  <ul>
    <li>Provide the Sync service (store and transmit your encrypted data)</li>
    <li>Send service emails (password reset, important updates)</li>
    <li>Fix bugs and improve the service</li>
  </ul>

  <h2>Data Sharing</h2>
  <p>
    We don't sell your data. Period.
  </p>
  <p>
    We may share data with:
  </p>
  <ul>
    <li>Infrastructure providers (cloud hosting, storage) - they only see encrypted blobs</li>
    <li>Law enforcement - if legally required, but we can only provide encrypted data we cannot read</li>
  </ul>

  <h2>Data Retention</h2>
  <p>
    Your encrypted data is retained as long as you have an account. If you delete your account, we delete your data within 30 days.
  </p>

  <h2>Your Rights</h2>
  <p>
    You can:
  </p>
  <ul>
    <li>Export your data at any time (in-app export feature)</li>
    <li>Delete your account and all associated data</li>
    <li>Request information about what we store</li>
  </ul>

  <h2>Children's Privacy</h2>
  <p>
    Recordwell is designed for families, including records for children. Parents/guardians manage their children's data. We don't knowingly collect data directly from children under 13.
  </p>

  <h2>Changes to This Policy</h2>
  <p>
    We'll notify you of significant changes via email or in-app notification. Continued use after changes constitutes acceptance.
  </p>

  <h2>Contact</h2>
  <p>
    Questions about privacy? Email us at <a href="mailto:privacy@recordwell.app">privacy@recordwell.app</a>.
  </p>
</FeatureLayout>
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `localhost:4321/privacy/`

**Step 3: Commit**

```bash
git add src/pages/privacy.astro
git commit -m "feat: add privacy policy page"
```

---

## Task 18: Add Favicon and Meta Tags

**Files:**
- Create: `public/favicon.svg`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0D6E6E"/>
  <path d="M16 6L8 10v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12v-6l-8-4z" fill="none" stroke="#fff" stroke-width="2"/>
  <path d="M12 15l3 3 5-5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Step 2: Add Open Graph meta tags**

Modify `src/layouts/BaseLayout.astro` head section:

```astro
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content={`${title} | Recordwell`} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={Astro.url} />
  <meta property="og:image" content={new URL('/og-image.png', Astro.site)} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${title} | Recordwell`} />
  <meta name="twitter:description" content={description} />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>{title} | Recordwell</title>
</head>
```

**Step 3: Commit**

```bash
git add public/favicon.svg src/layouts/BaseLayout.astro
git commit -m "feat: add favicon and Open Graph meta tags"
```

---

## Task 19: Create GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      theme:
        description: 'Theme to build (light or dark)'
        required: false
        default: 'light'

permissions:
  id-token: write
  contents: read

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build
        env:
          THEME: ${{ github.event.inputs.theme || 'light' }}

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1

      - name: Sync to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} \
            --delete \
            --cache-control "public, max-age=31536000, immutable" \
            --exclude "*.html" \
            --exclude "*.xml" \
            --exclude "*.json"

          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} \
            --delete \
            --cache-control "public, max-age=0, must-revalidate" \
            --include "*.html" \
            --include "*.xml" \
            --include "*.json"

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

**Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions deployment workflow"
```

---

## Task 20: Final Verification and Theme Test

**Step 1: Test light theme build**

```bash
THEME=light npm run build && npm run preview
```

Check: Site builds, all pages render correctly in light theme

**Step 2: Test dark theme build**

```bash
THEME=dark npm run build && npm run preview
```

Check: Site builds, all pages render correctly in dark theme

**Step 3: Check all navigation links work**

Manually test:
- All nav dropdown links
- All footer links
- All feature page CTAs
- Anchor links (pricing section)

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup and verification"
```

---

## Summary

This plan creates a complete Astro marketing site with:

- **7 pages**: Landing, Encryption, Sharing, Your Data, Architecture, Support, Privacy
- **Dual themes**: Light (clinical trust) and Dark (tech forward), switchable via `THEME` env variable
- **Components**: Nav, Footer, Hero, FeatureCard, PricingTable, Features
- **Deployment**: GitHub Actions with OIDC to S3/CloudFront

Each task is a focused unit of work with verification steps and commits.
