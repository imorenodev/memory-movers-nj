# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a real estate website for Thomas Larson Group, built as a static HTML/CSS/JS site with a focus on modern design and responsive layout. The site features property listings, open houses, client testimonials, and contact information.

## Development Commands

Since this is a static HTML site, standard web server commands apply:

```bash
# Serve locally (if using Python)
python -m http.server 8000

# Or with Node.js live-server
npx live-server

# Or with PHP
php -S localhost:8000
```

## Design System & Architecture

### Design Tokens (CSS Variables)
All colors, typography, and spacing follow a strict design token system:

**Colors (Bronze/Beige/Ash/Charcoal palette):**
- `--ivory: #F5F2ED` (page background)
- `--bronze: #9A6A55` (primary brand)
- `--charcoal: #1E1E1E` (dark sections)
- `--ash: #7A7774` (body copy)
- Full token list defined in styles.css :root

**Typography:**
- Display serif: "Cormorant Garamond" for headings
- Sans body: "Inter" for body text
- Specific scale: H1(64/72), H2(44/52), H3(28/36), body(16/28)

**Layout System:**
- Desktop canvas: 1440px width
- Max content: 1200px centered
- Baseline grid: 8px
- Container: `.container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }`

### Component Architecture

**Cards:** Consistent image-on-top structure with 4:3 ratio images, white background, drop shadows
**Buttons:** Three variants - outline, ghost, light (for dark backgrounds)
**Sections:** Alternating light/dark backgrounds with specific padding (96px/80px/72px/48px)

### Section Layout Pattern

1. **Hero:** Split layout (55% copy / 45% image), 560px height
2. **Value Prop:** Centered content, 760px max width
3. **Feature Property:** Split with beige panel and floor plan
4. **Featured Listings:** Dark section, 3-card grid
5. **Open Houses:** Light section, 3-card grid  
6. **Property Appraisal:** Image banner with overlay card
7. **Client Reviews:** Left title column, right 3-column testimonials
8. **Footer:** Photo strip + contact grid

### Image Requirements

All images use Lorem Picsum service (https://picsum.photos) with specific dimensions:
- Hero: `https://picsum.photos/800/600` (bedroom scene)
- Feature split: `https://picsum.photos/700/520` (living room)
- Cards: `https://picsum.photos/400/300` (various exterior shots)
- Banner: `https://picsum.photos/1440/520` (patio/pergola)

### Responsive Breakpoints

- 1200px: Reduce container, adjust heading sizes
- 992px: Stack hero, convert grids to 2-column
- 640px: Single column, center headings, full-width buttons

### Exact Content & Copy

All text content is specified exactly in the design spec, including:
- Brand: "THOMAS LARSON GROUP"
- Headlines with specific line breaks
- Property details: "14 Milena Grove", "234 Talensville Lane", etc.
- Meta information: bed/bath counts, accessibility notes
- Contact: "123 Avondure St, Any City, ST 12345"

### Key Implementation Notes

- Use semantic HTML5 structure (header, section, article, footer)
- CSS Grid for layouts, Flexbox for component alignment
- 160ms ease transitions for hover states
- Focus rings: 2px outline in bronze
- Accessibility: AA contrast compliance on dark backgrounds
- Minimal JS: card hover states, smooth scroll only

### File Structure

```
/
├── index.html          # Main page
├── styles.css          # All CSS including tokens and responsive
├── app.js             # Minimal JavaScript
└── assets/            # SVG icons, if any local images needed
```

### Brand Guidelines

The site uses a sophisticated, minimal aesthetic with:
- Warm, earthy color palette
- Elegant serif headings paired with clean sans-serif body text
- Generous whitespace and breathing room
- Subtle shadows and refined button styles
- Professional real estate photography aesthetic