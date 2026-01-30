# Recordwell Marketing Site Design

## Overview

Static marketing site for Recordwell, a privacy-focused family medical records app. Built with Astro, deployed to recordwell.app via CloudFront/S3.

## Target Audience

**Primary (revenue):** Privacy-conscious families - parents wanting secure health records for kids (vaccines, allergies, medications). Will pay for Sync service.

**Secondary (evangelists):** Tech-savvy privacy advocates - self-hosters, developers who appreciate the cryptographic architecture. They validate claims and recommend to others.

## Site Structure

```
/                   Landing page
/encryption/        Zero-Knowledge Encryption deep-dive
/sharing/           Family Sharing explained
/your-data/         Data ownership, export, portability
/architecture/      Technical backend, self-hosting guide
/support/           Help, FAQ, contact
/privacy/           Legal privacy policy
```

## Navigation

- Top nav: Logo | Features (dropdown) | Pricing (anchor) | Support | GitHub
- Mobile: Hamburger menu
- Footer: All pages + privacy policy + GitHub link

## Theme System

Two themes, switchable via environment variable for A/B testing:

### Theme A: Clinical Trust (Light)

- Background: Warm off-white
- Primary: Deep teal or sage green
- Accents: Soft coral or amber for CTAs
- Typography: Warm serif headlines, clean sans body
- Feel: Calm, reassuring, family-friendly

### Theme B: Tech Forward (Dark)

- Background: Deep charcoal with subtle texture
- Primary: Electric cyan or mint
- Accents: Amber or orange
- Typography: Mono-influenced headlines, clean sans body
- Feel: Developer-friendly, Signal/1Password aesthetic

### Implementation

- CSS custom properties for all tokens
- `THEME` env variable switches at build time
- `data-theme="light"` or `data-theme="dark"` on root
- Same HTML/content, different visual treatment

## Landing Page

### Hero

- Headline: Warm, family-focused
- Subhead: Zero-knowledge encryption benefit
- CTAs: App Store badge (coming soon) + "View on GitHub"

### Features Section

Four cards linking to deep-dive pages:

1. Zero-Knowledge Encryption
2. Family Sharing
3. Your Data, Your Control
4. Self-Host Option

### Pricing Section

**Common features (all tiers):**

- End-to-end encryption
- Offline-first
- Vaccines, medications, allergies, conditions, notes
- Custom record types
- Attachments (photos, PDFs)
- Data export

**Tier comparison:**

| | Free | Sync | Self-Hosted |
|---|------|------|-------------|
| All common features | Yes | Yes | Yes |
| Multi-device sync | - | Yes | Yes |
| Family sharing | - | Yes | Yes |
| Cloud backup | - | Yes | Yes |
| Secure recovery | - | Yes | Yes |
| Price | $0 | TBD/mo | $0 + infra |

**Positioning:**

- Free: Fully functional standalone app
- Sync: Convenience upsell - never lose records, share with family
- Self-hosted: Same features, you run the backend

### Final CTA

Repeat App Store + GitHub links

## Deep-Dive Pages

### /encryption/ - Zero-Knowledge Encryption

Explains:
- What zero-knowledge means (even we can't see your data)
- AES-256-GCM encryption
- Key hierarchy (without implementation specifics)
- Comparison to "encryption at rest" marketing speak

### /sharing/ - Family Sharing

Explains:
- Granular sharing (share Emma's records with Grandma)
- Not all-or-nothing access
- Cryptographic enforcement of permissions
- Revocation actually works (re-encryption, not UI hiding)

### /your-data/ - Your Data, Your Control

Explains:
- Portable export format (standard JSON)
- No vendor lock-in
- Self-hosting option
- You own your data philosophy

### /architecture/ - Technical Architecture

For the technical crowd:
- Backend architecture overview
- Self-hosting requirements (Docker, S3/MinIO)
- API documentation links (when available)
- Open source transparency

### /support/ - Support

- FAQ section
- GitHub issues for bug reports
- Contact information

### /privacy/ - Privacy Policy

Standard legal privacy policy document.

## Tone & Copy

- **Landing page:** Warm, reassuring, family-focused
- **Detail pages:** Technical credibility, clean and readable
- **Avoid:** AI slop, marketing fluff, unverifiable claims
- **Note:** Copy is placeholder - Bobby will humanize later

## Technical Setup

### Astro Structure

```
src/
  layouts/
    BaseLayout.astro
  components/
    Nav.astro
    Footer.astro
    Hero.astro
    FeatureCard.astro
    PricingTable.astro
  pages/
    index.astro
    encryption.astro
    sharing.astro
    your-data.astro
    architecture.astro
    support.astro
    privacy.astro
  styles/
    global.css
    themes/
      light.css
      dark.css
public/
  fonts/
```

### Key Decisions

- Pure Astro - no React/Vue, static output
- Self-hosted fonts (no Google Fonts)
- CSS-only animations
- Theme via env variable at build time

## Deployment

- GitHub Actions workflow on push to main
- OIDC authentication to AWS
- Build Astro, sync to S3
- CloudFront invalidation
- Domain: recordwell.app

## CTAs

- App Store badge with "Coming Soon" state
- GitHub repository link
- Both appear in hero and footer
