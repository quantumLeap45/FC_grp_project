# Design Guidelines: Exploring Singapore's Green Gems

## Design Approach

**Selected Approach**: Design System (Material Design principles adapted for nature/education)

**Rationale**: This educational resource prioritizes information clarity, accessibility, and consistent navigation patterns. The content-dense structure (6 parks × 3 detail pages) requires systematic organization over visual experimentation.

**Key Principles**:
- Information hierarchy through typography and spacing
- Nature-inspired warmth within structured layouts
- Accessibility-first component design
- Scannable content organization

---

## Typography System

**Font Stack**: Arial, Helvetica, sans-serif (web-safe, highly legible)

**Scale**:
- Hero/H1: 48px (mobile: 32px) - bold, park names, page titles
- H2: 32px (mobile: 24px) - medium, section headers
- H3: 24px (mobile: 20px) - medium, park subsections  
- Body: 18px (mobile: 16px) - regular, all content text
- Small: 14px - captions, metadata (difficulty, duration)
- Navigation: 16px - medium weight

**Line Height**: 1.6 for body text, 1.3 for headings

---

## Layout System

**Spacing Primitives**: Tailwind units 2, 4, 6, 8, 12, 16, 20
- Component padding: p-4, p-6, p-8
- Section margins: my-12, my-16, my-20
- Element gaps: gap-4, gap-6, gap-8

**Grid Structure**:
- Container: max-w-6xl mx-auto px-4 (desktop), px-6 (mobile)
- Two-column layouts: grid grid-cols-1 lg:grid-cols-2 gap-8
- Cards/Sections: Single column stack with generous whitespace

**Viewport Strategy**:
- Header: Fixed height (not full viewport)
- Content sections: Natural height based on content
- No forced 100vh constraints except hero if implemented

---

## Component Library

### Header Navigation
- Horizontal box-style navigation (6 equal-width boxes)
- Desktop: flex justify-between items-center
- Mobile: Stacked vertical menu (hamburger icon)
- Active state: Subtle background treatment
- Skip-to-content link (screen reader accessible)

### Footer
- Simple centered layout
- "Made by Team" + "Contact us" link to Credits
- Padding: py-8

### Park Information Cards
Each park section contains:
- Park name (H3)
- 1-2 sentence overview (body text)
- Metadata row: Difficulty badge, Duration, Amenities icons
- Grid layout: grid gap-4
- Border or subtle background to separate sections
- "Back to top" link at section end

### Direction Blocks (per park)
- MRT/Bus/Car information (structured list)
- Static map image (16:9 aspect ratio, max-w-lg)
- Google Maps link button
- Vertical stack with gap-6

### Scenic Highlights
- 1-2 key features per park (bulleted or numbered list)
- Optional: YouTube embed (16:9, responsive iframe)
- Trail link button if applicable

### Safety Page Layout
- Two-column grid: `grid grid-cols-1 lg:grid-cols-2 gap-12`
- Left column: Safety bullets, weather notice, packing checklist (ul/li)
- Right column: Illustrative image (aspect-ratio-square or 4:3)

### Contact Form (Credits page)
- Single column: max-w-md
- Fields: Name, Email (text inputs), Message (textarea)
- Labels above inputs
- Submit button (non-functional, action="#")
- Input padding: p-3, text-lg

### Buttons
- Primary: Solid background, rounded corners (rounded-lg), px-6 py-3
- Text buttons: Underline on hover
- Focus: 2px outline for keyboard navigation

---

## Images

**Hero Section (Home page)**:
- Large nature background image (full-width, height: 60vh on desktop, 40vh mobile)
- Overlay: Semi-transparent dark layer for text legibility
- Centered content: Purpose statement + tagline
- Image alt: "Singapore nature trails and green spaces"

**Park Section Images**:
- Finder page: Small thumbnail per park (optional, 200×150px)
- Directions: Static route map (16:9 ratio, max-width 600px)
- Scenic: Park highlight photo (landscape 3:2 ratio, max-width 800px)
- Safety: Illustrative gear/trail image (square or 4:3, max-width 500px)

**Image Treatment**:
- Rounded corners: rounded-lg on all images
- Box shadow: subtle elevation
- Alt text: Descriptive (e.g., "Route from Kranji MRT to Sungei Buloh entrance")

---

## Accessibility Features

- **Contrast**: All text meets WCAG AA standards against backgrounds
- **Focus indicators**: 2px solid outline on all interactive elements
- **Skip link**: "Skip to main content" (position: absolute, visible on focus)
- **Semantic HTML**: nav, main, section, article elements
- **Landmarks**: Proper heading hierarchy (h1 → h2 → h3)
- **Form labels**: Associated with inputs via for/id
- **Image alt text**: Comprehensive descriptions for all images

---

## Navigation Patterns

**Anchor Links (Finder/Directions/Scenic)**:
- Section IDs: `#macritchie`, `#bukittimah`, `#railcorridor`, `#coneyisland`, `#sungeibuloh`, `#labrador`
- Smooth scroll behavior
- "Back to top" links at each section end
- Optional: Sticky sidebar TOC on desktop (display: none on mobile)

**Responsive Behavior**:
- Desktop (≥1024px): Multi-column grids, horizontal nav
- Tablet (768-1023px): 2-column where applicable
- Mobile (<768px): Single column stack, hamburger menu

---

## Animation Philosophy

**Minimal, purposeful motion**:
- Smooth scroll for anchor links (scroll-behavior: smooth)
- Subtle hover states on buttons/links (transition: 200ms)
- No autoplay videos/audio
- No parallax or scroll-triggered animations