---
name: Wazaef Ibb Design System
colors:
  surface: '#f1fdf1'
  surface-dim: '#d1ddd2'
  surface-bright: '#f1fdf1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf7eb'
  surface-container: '#e5f1e5'
  surface-container-high: '#dfebe0'
  surface-container-highest: '#dae6da'
  on-surface: '#141e17'
  on-surface-variant: '#404942'
  inverse-surface: '#28332b'
  inverse-on-surface: '#e8f4e8'
  outline: '#707971'
  outline-variant: '#c0c9c0'
  surface-tint: '#2d6a48'
  primary: '#003820'
  on-primary: '#ffffff'
  primary-container: '#0f5132'
  on-primary-container: '#84c39b'
  inverse-primary: '#95d4ac'
  secondary: '#006d41'
  on-secondary: '#ffffff'
  secondary-container: '#90f4b7'
  on-secondary-container: '#007144'
  tertiary: '#4d2600'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e3900'
  on-tertiary-container: '#ff9e47'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f1c7'
  primary-fixed-dim: '#95d4ac'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#0f5132'
  secondary-fixed: '#93f7ba'
  secondary-fixed-dim: '#77da9f'
  on-secondary-fixed: '#002110'
  on-secondary-fixed-variant: '#00522f'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f1fdf1'
  on-background: '#141e17'
  surface-variant: '#dae6da'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

The design system establishes a trustworthy, modern, and regionally resonant digital marketplace and recruitment platform for Ibb Governorate ("The Green Province"). 

### Brand Personality & Core Audience
- **Target Audience:** Job seekers, local enterprises, craftsmen, agricultural and commercial traders, and service providers across Ibb and diaspora communities looking to hire or trade locally.
- **Brand Voice:** Trustworthy, uplifting, communal, and pragmatic. It avoids bureaucratic rigidity while maintaining the institutional authority expected from a serious employment and commercial hub.
- **Emotional Response:** Inspires dignity in labor, local pride, economic optimism, and frictionless communication.

### Design Movement: Modern Organic Tactility
The visual language blends modern Scandinavian utility with warm Levantine and Southern Arabian hospitality. It relies on:
- High contrast, pristine card architectures set against soft botanical undertones.
- Tactile, friendly micro-affordances (pill-shaped status tags, tactile primary buttons).
- Deep integration of regional communication patterns, treating direct instant messaging (WhatsApp) and verified phone channels as first-class UI primitives.
- First-class Right-to-Left (RTL) ergonomics, ensuring iconographies, transitions, progressive disclosures, and visual weights align naturally with Arabic script flow.

## Colors

The palette directly honors Ibb's heritage as the agricultural and scenic green heartland of Yemen, balancing deep canopy greens with bright harvest ambers and crisp functional neutrals.

### Palette Architecture
- **Primary Emerald (`#0f5132`):** Grounded, authoritative forest green. Used for high-emphasis containers, top app bars, primary identity headers, and main interactive calls to action.
- **Secondary Mint Foliage (`#198754`):** Active interactive green. Applied to verified badges, interactive switches, affirmative toasts, and secondary accents.
- **Tertiary Harvest Amber (`#d97706` / `#f59e0b`):** Radiates value, urgency, and premium status. Reserved for urgent vacancies, featured market listings, VIP employer badges, and promotional star ratings.
- **Surface & Canvas Tint (`#f0fdf4` to `#f8fafc`):** An airy, high-luminance canvas tinted with cool botanical mint rather than sterile gray, reducing eye fatigue under bright outdoor sunlight.
- **Direct Messaging Accent (`#25D366`):** Standard WhatsApp brand green is preserved strictly for direct candidate-to-recruiter chat actions to maximize immediate recognition.
- **Neutral Dark (`#141e17`):** An organic charcoal-green slate ensuring maximum WCAG AAA contrast for body typography without the harshness of pure black (`#000000`).

## Typography

The type system prioritizes fluid legibility across both Arabic script (Cairo / Tajawal styling) and Latin scripts.

### Font Allocation & Pairing Rules
- In dual-script environments, font stacks map to system-level Arabic typefaces prioritizing **Cairo** or **Tajawal** for Arabic glyphs, paired harmoniously with **Plus Jakarta Sans** for alphanumeric characters, pricing, and international identifiers.
- Line heights in Arabic body scripts are intentionally expanded (1.5x–1.65x) to accommodate sweeping ascenders and baseline calligraphic loops without vertical clipping.
- Numeric displays (salaries, telephone numbers, dates) utilize standard Eastern Arabic or Western Arabic numerals consistently per locale preference, maintained with tabular figure alignment (`font-variant-numeric: tabular-nums`).

## Layout & Spacing

The layout is built for native mobile operating systems, optimized for single-thumb ergonomics and rapid vertical scrolling.

### Grid & Ergonomic Flow
- **Mobile Fluid Grid (4-column):** Screen margins sit at 16px (`1rem`), expanding to 20px on larger phablet devices. Column gutters maintain 16px to prevent visual collision between multi-column listing grids.
- **RTL Fluid Inversion:** Spatial padding and margins automatically flip across the Y-axis. The dominant action trigger sits anchored bottom-left for right-hand dominant users navigating an RTL hierarchy.
- **Vertical Spacing Rhythm:** Strictly adheres to an 8pt layout grid. Tight micro-groupings (e.g., tags, salary indicators) utilize 4px (`space-xs`) and 8px (`space-sm`), while structural module splits use 20px (`space-lg`) and 28px (`space-xl`).
- **Safe Area Insets:** Fixed persistent bottom navigation and floating quick-contact drawers account for native system navigation bars with an additional minimum bottom clearance of 16px.

## Elevation & Depth

Depth in this system conveys real-world paper-over-field layering rather than simulated 3D mass. Shadows mimic natural, high-noon mountain sunlight softened by ambient moisture.

### Depth Tiers
- **Tier 0 (Base Canvas):** Light mint-tinted neutral (`#f0fdf4` / `#f8fafc`). No elevation, serves as the background baseline.
- **Tier 1 (Surface Cards & Job Listings):** Pure crisp white (`#ffffff`) resting on a soft botanical glow: `box-shadow: 0 4px 16px -2px rgba(15, 81, 50, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)`. Border stroke: 1px solid `rgba(15, 81, 50, 0.08)`.
- **Tier 2 (Sticky Headers & Navigation):** `backdrop-filter: blur(12px)` over `rgba(255, 255, 255, 0.88)` with subtle bottom separation stroke: `1px solid rgba(15, 81, 50, 0.06)`.
- **Tier 3 (Floating Direct Contact Bars & Bottom Sheets):** `box-shadow: 0 12px 32px -4px rgba(15, 81, 50, 0.16)`. Adds pronounced separation for high-priority transaction buttons and modals.

## Shapes

The interface embraces organic, softened geometry that mirrors the terraced green hills of Ibb Governorate.

### Corner Radii Guidelines
- **Cards & Surface Modules:** Consistent 16px radius (`rounded-lg`) creates an approachable, modern container for job items and merchant listings.
- **Hero Containers & Bottom Sheets:** Prominent 20px to 24px top radiuses (`rounded-xl`), creating welcoming modal interfaces.
- **Interactive Controls (Buttons, Form Inputs):** 12px radius ensures inputs feel structured and easy to target with fingertips.
- **Badges, Tags & Avatars:** Fully rounded pill geometry (`rounded-full` / 9999px) for taxonomy chips, verified indicators, and quick-filter pills.

## Components

### Buttons
- **Primary Action (Apply / Post Vacancy):** Solid `#0f5132` background with `#ffffff` text, 12px corner radius, height 48px, horizontal padding 20px. Font weight: `600`. Subtle active scale transform (`0.98`).
- **Direct WhatsApp Action:** Solid `#25D366` background with `#ffffff` bold text and native WhatsApp chat glyph aligned to the leading side (right-aligned in RTL). Minimum touch target: 48px height.
- **Secondary / Tertiary:** Tinted surface (`#dcfce7`) with `#0f5132` label; zero border. Ghost buttons use transparent fill with `1.5px` border in `#198754`.

### Job & Marketplace Cards
- Constructed with `#ffffff` fill, 16px radius, and subtle border stroke.
- Header row includes employer/seller logo (44x44px, 10px radius), company title, verified check badge, and listing timestamp.
- Body row contains job role title, salary estimate highlighted in harvest amber (`#d97706`), and geographic badge (e.g., "الظهار", "المشنة", "يريم").
- Footer row hosts categorized metadata chips and one-tap quick-apply or WhatsApp communication links.

### Badges & Chips
- **Contract Type & Timing:** Pill shape, height 26px, padding 4px 10px. Filled with soft tint surfaces (e.g., Mint Tint `#dcfce7` with `#0f5132` text, or Amber Tint `#fef3c7` with `#b45309` text).
- **Featured / Urgent Badge:** High-visibility amber ribbon or pill with shimmering micro-indicator dot.

### Input Fields & Search
- Background: `#ffffff`, 12px radius, border: 1.5px solid `#e2e8f0`.
- Focus State: Border switches to `#198754` with a 3px soft focus ring (`rgba(25, 135, 84, 0.15)`).
- Search Bar: Integrated filter trigger icon on the trailing side, persistent search icon on the leading edge (RTL right-aligned).

### Checkboxes & Segmented Controls
- Checkboxes use a 6px curved square with `#0f5132` active fill and clean white check mark.
- Segmented category selectors (e.g., "All Jobs", "Commercial", "Craftsmen") use a pill-shaped segmented slide rail with smooth animated background transitions.