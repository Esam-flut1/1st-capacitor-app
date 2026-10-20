---
name: Executive Horizon
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#3755c3'
  on-secondary: '#ffffff'
  secondary-container: '#708cfd'
  on-secondary-container: '#00217a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001f27'
  on-tertiary-container: '#0090ad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c4ff'
  on-secondary-fixed: '#001453'
  on-secondary-fixed-variant: '#173bab'
  tertiary-fixed: '#b3ebff'
  tertiary-fixed-dim: '#4cd6fb'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5f'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Tajawal
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
  display-lg-mobile:
    fontFamily: Tajawal
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-xl:
    fontFamily: Tajawal
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Tajawal
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Tajawal
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Tajawal
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-sm:
    fontFamily: Tajawal
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
  body-lg:
    fontFamily: Tajawal
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Tajawal
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Tajawal
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Tajawal
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Tajawal
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Tajawal
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative, reliable, and sophisticated digital environment engineered for commercial directory and recruitment platforms. The visual tone balances enterprise-level prestige with frictionless utility, instilling immediate confidence in job seekers, enterprise recruiters, and corporate partners.

The visual direction combines **Corporate / Modern** precision with architectural clarity:
- **Authority without Stagnation:** Anchored in deep navy and architectural slate, accented with high-energy cyan to denote dynamism and active discovery.
- **Bi-directional Bilingual Parity:** Built around native support for both Arabic and Latin scripts, maintaining visual weight, vertical cadence, and typographic optical harmony across both LTR and RTL orientations.
- **Institutional Reliability:** Surfaces are clean, uncluttered, and purpose-built for data density, search filtering, and clear organizational hierarchy.

## Colors

The palette is engineered to communicate executive trust, structural rigor, and technological capability:

- **Primary (`#0A192F` - Deep Navy):** The core anchor. Used for primary typography, brand headers, high-emphasis navigation surfaces, and high-impact structural framing.
- **Secondary (`#1E40AF` - Royal Blue):** The operational driver. Applied to interactive elements, primary action triggers, validated states, and structural focus elements.
- **Tertiary (`#00B4D8` - Vibrant Cyan):** The energetic accent. Reserved strictly for attention-critical moments: live status badges, verified employer seals, notification pills, key search highlights, and metric indicators.
- **Neutral (`#64748B` - Slate):** The informational balance. Used for secondary metadata, structural borders, subtle table lines, and supporting text.

### Background and Surface Tokens
- **Canvas Base:** `#F8FAFC` (Clean Slate 50) delivers low-fatigue contrast against white surfaces.
- **Surface Elevation 01 (Cards/Sheets):** `#FFFFFF` (Pure White).
- **Surface Elevation 02 (Sub-sections/Filters):** `#F1F5F9` (Slate 100).
- **Surface Inverted (Tooltips/Banners):** `#0A192F` with `#F8FAFC` text.

### Semantics
- **Success:** `#059669` (Emerald 600) for application sent, verification complete.
- **Warning:** `#D97706` (Amber 600) for expiring listings, pending reviews.
- **Destructive:** `#DC2626` (Red 600) for rejections, profile removal, critical alerts.

## Typography

Tajawal serves as the universal typeface for this design system, chosen for its contemporary geometric balance, exceptional legibility in Arabic letterforms, and matching aesthetic integration with Latin alphanumeric characters.

### Typesetting Rules
- **Bi-Directional Dynamics:** Tajawal provides balanced baseline heights between Arabic script and Latin glyphs. Ensure line-height values remain generous (minimum 1.4x–1.5x) to accommodate extended ascenders and descenders common in Arabic calligraphy.
- **Weight Pairing:** Reserve `800` (ExtraBold) strictly for top-tier directory headers and metrics, `700` (Bold) for semantic card titles and table column groupings, `500` (Medium) for active inputs and navigational labels, and `400` (Regular) for descriptions and extended body copy.
- **Letter Spacing:** Do not apply positive letter spacing (`tracking`) to Arabic text, as it interrupts character cursive connections. For Latin-only UI labels or uppercase acronyms, limit letter spacing to `+0.02em`.

## Layout & Spacing

The design system employs a structured 12-column responsive grid built to present dense corporate directories, structured multi-field recruitment profiles, and complex analytical dashboards without visual clutter.

### Breakpoints & Canvas Bounds
- **Desktop (1280px and above):** 12-column grid, max canvas width 1280px (or 1440px wide-screen), `margin-desktop` (48px), `gutter` (24px).
- **Tablet (768px – 1279px):** 8-column grid, full-bleed canvas, `margin` (32px), `gutter` (24px).
- **Mobile (320px – 767px):** 4-column grid, full-bleed canvas, `margin-mobile` (16px), `gutter-mobile` (16px).

### Architectural Rules
- **Asymmetric Directory Split:** Desktop directories favor an asymmetric 4:8 split (4 columns for sticky filter criteria/taxonomy trees, 8 columns for candidate/company result feeds).
- **RTL Fluidity:** Grid column indexing, padding directions, and content streams flip along the horizontal axis in RTL modes; gutters, margins, and inner spacing tokens remain strictly identical to preserve spatial harmony.

## Elevation & Depth

This design system avoids heavy drop shadows, instead utilizing layered surface planes, crisp borders, and subtle slate-tinted ambient depth.

### Depth Hierarchy
1. **Level 0 (Base Canvas):** `#F8FAFC` — Floor background for entire page layouts.
2. **Level 1 (Card & Section Containers):** `#FFFFFF` paired with a 1px solid border of `#E2E8F0` (Slate 200). Zero shadow at rest.
3. **Level 2 (Interactive State / Active Cards):** Surface elevated using an ambient shadow: `0 4px 16px -2px rgba(10, 25, 47, 0.06), 0 2px 6px -1px rgba(10, 25, 47, 0.04)`, bordered by `#CBD5E1`.
4. **Level 3 (Dropdown Menus, Popovers, Modals):** Surface elevated using an architectural shadow: `0 12px 32px -4px rgba(10, 25, 47, 0.12), 0 4px 12px -2px rgba(10, 25, 47, 0.06)`, framed with a 1px border of `#94A3B8` (Slate 400).
5. **Level 4 (Sticky Navigation / App Header):** `#0A192F` (Deep Navy) background or white frosted surface with `backdrop-filter: blur(8px)`, framed by a bottom hairline border (`#1E293B` or `#E2E8F0`).

### Accent Glows
Interactive items carrying primary focus or verified badges use a hairline cyan glow: `0 0 0 3px rgba(0, 180, 216, 0.25)`.

## Shapes

The design system adopts a **Soft (Level 1)** geometric standard. This communicates corporate discipline, stability, and structured order while avoiding harsh, sharp brutalism or informal, bubble-like rounding.

### Corner Radius System
- **Base (0.25rem / 4px):** Form inputs, inline badges, table cells, filter checkboxes, and micro-chips.
- **Large (0.5rem / 8px):** Directory listing cards, action buttons, modals, dropdown containers, and recruitment stat tiles.
- **Extra Large (0.75rem / 12px):** Primary hero cards, commercial feature panels, and large dialog wrappers.
- **Circular / Fully Rounded (9999px):** Status indicators, verified profile avatars, and icon-only utility buttons.

## Components

### Buttons
- **Primary:** Background `#1E40AF`, text `#FFFFFF`, 8px border radius, medium font weight (`500`). Hover transitions to `#172554` with subtle elevation. Active state deepens to `#0A192F`.
- **Secondary / Directory Action:** Background `#FFFFFF`, text `#0A192F`, 1px border of `#CBD5E1`. Hover changes background to `#F1F5F9` and border to `#94A3B8`.
- **Accent / High Value:** Background `#00B4D8`, text `#0A192F` (for contrast compliance), font weight `700`. Used exclusively for key CTAs (e.g., "Hire Candidate", "Claim Profile").
- **Destructive:** Background `#FEE2E2`, text `#DC2626`, border `#FECACA`. Hover changes background to `#DC2626` and text to `#FFFFFF`.

### Input Fields & Search Filters
- **Form Controls:** 4px radius, `#FFFFFF` background, 1px border in `#CBD5E1`. Placeholder styled in `#94A3B8`. Text colored `#0A192F`. Focus applies a 1px border in `#1E40AF` with a cyan outline ring: `0 0 0 3px rgba(0, 180, 216, 0.20)`.
- **Search Bar (Directory Hub):** Large container (48px–56px height) using an 8px radius, embedded secondary icons (search lens, location pin, industry selector), separated by light vertical dividers `#E2E8F0`.

### Cards (Recruitment & Company Profiles)
- **Directory Tile:** `#FFFFFF` background, 8px radius, 1px border `#E2E8F0`. Includes company logo container (48x48px, rounded 4px), title row using `headline-sm`, metadata flexline (salary, location, industry tag) using `body-sm` in slate `#64748B`.
- **Hover State:** Border shifts to `#1E40AF` (Royal Blue) hairline with Level 2 ambient elevation.

### Badges, Tags & Chips
- **Taxonomy Chips (Skills / Industry):** Light Slate fill `#F1F5F9`, `#334155` text, 4px radius, `label-md`.
- **Verified Organization Seal:** Subdued cyan pill (`rgba(0, 180, 216, 0.12)`), text `#0369A1` (Cyan 800), accompanied by a solid cyan checkmark icon.
- **Availability / Urgent Recruitment Badge:** `#DCFCE7` background, `#15803D` text, dot status indicator.

### Checkboxes & Radio Buttons
- **Checkbox:** 4px radius, border 1.5px `#94A3B8`. Checked state fills `#1E40AF` with crisp white checkmark.
- **Radio:** Full circle, 1.5px border `#94A3B8`. Selected state renders an inner royal blue dot surrounded by pure white margin.

### Data Tables & Candidate Lists
- **Header:** Background `#F8FAFC`, uppercase `label-md` tracking in `#475569`, bottom border 1.5px `#E2E8F0`.
- **Rows:** Alternating rows preserve `#FFFFFF` with hover state in `#F8FAFC`. Bottom border 1px `#F1F5F9`.
- **Cell Content:** Arabic and Latin data remain vertically centered; numerical figures adopt tabular figures formatting for strict vertical alignment.