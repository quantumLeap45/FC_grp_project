# Exploring Singapore's Green Gems - Educational Nature Website

## Overview

This is an educational website showcasing Singapore's six premier nature reserves and parks. The application provides comprehensive information about trails, accessibility, scenic highlights, safety guidelines, and directions for each location. Built as a static educational resource with a React-based frontend, it prioritizes information clarity, accessibility, and responsive design using Material Design principles adapted for nature/education content.

The featured parks include:
- MacRitchie Reservoir
- Bukit Timah Nature Reserve
- Rail Corridor (Central)
- Coney Island
- Sungei Buloh Wetland Reserve
- Labrador Nature Reserve

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for data fetching and caching

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Design system based on Material Design principles adapted for nature/education content

**Design Tokens & Theming**
- Custom color palette: Light green (#A8D5A2), Beige (#F5E8D0), Accent dark green (#2E7D32), Text (#1F2937)
- Typography: Arial/Helvetica sans-serif for legibility with defined scale (Hero 48px, H2 32px, H3 24px, Body 18px)
- Spacing system using Tailwind primitives (2, 4, 6, 8, 12, 16, 20)
- Responsive breakpoints with mobile-first approach

**State Management**
- React Query for server state management and caching
- Local component state with React hooks
- Toast notifications for user feedback

**Routing Structure**
- Single-page application with client-side routing
- Routes: `/` (Home), `/finder`, `/directions`, `/scenic`, `/safety`, `/credits`
- 404 handling for undefined routes

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Separate development and production entry points for environment-specific configuration
- Custom logging middleware with formatted timestamps

**Development vs Production**
- Development: Vite dev server middleware integration with HMR support
- Production: Serves pre-built static assets from dist/public directory
- Build process: Client-side Vite build + Server-side esbuild bundling

**Data Storage Strategy**
- Static JSON data files for park information stored in `/client/public/data/`
- In-memory storage implementation (MemStorage class) for potential future user data
- No active database usage (Drizzle ORM configured but not currently utilized)

**API Architecture**
- Currently minimal backend API surface (routes.ts placeholder)
- Designed for future expansion with RESTful endpoints under `/api` prefix
- Static content served directly from JSON files via frontend fetch

### Database Schema (Configured but Unused)

**Drizzle ORM Configuration**
- PostgreSQL dialect configured with Neon serverless driver
- Schema defines a basic users table with id, username, password fields
- Zod schema validation for type-safe inserts
- Migration support configured via drizzle-kit
- **Note**: Application currently operates without database persistence

### Component Architecture

**Layout System**
- Shared `Layout` component wrapping all pages with consistent header and footer
- Header: Sticky navigation with active link highlighting and skip-to-content accessibility
- Footer: Team attribution and contact link

**Page Components**
- Home: Hero section with gradient overlay and purpose statement
- Finder: Park cards with difficulty badges, duration, amenities
- Directions: Transport options (MRT, bus, car) with map placeholders
- Scenic: Highlight attractions for each park
- Safety: Guidelines, weather tips, packing checklist
- Credits: Source attribution, team info, contact form

**Data Flow**
- Pages fetch JSON data via `useEffect` and native `fetch()`
- Error handling with console logging
- Placeholder SVG images for parks and maps

### Accessibility Features

- Skip-to-content link for keyboard navigation
- Semantic HTML with proper heading hierarchy
- ARIA labels on navigation elements
- Color contrast compliance with WCAG standards
- Responsive design supporting mobile and desktop viewports

### Content Strategy

- All content paraphrased from official NParks sources to respect copyright
- Google Maps integration for directions
- Placeholder images to be replaced with open-licensed photography
- Comprehensive source attribution on Credits page

### Build & Deployment

**Development Workflow**
- `npm run dev`: Starts Vite dev server with Express backend
- `npm run check`: TypeScript type checking
- `npm run db:push`: Drizzle schema push (if database needed)

**Production Build**
- `npm run build`: Builds client (Vite) and server (esbuild) for production
- `npm start`: Runs production Express server serving static assets
- Client output: `dist/public/`
- Server output: `dist/index.js`

**Environment Configuration**
- NODE_ENV determines development vs production mode
- DATABASE_URL required for Drizzle (not currently used)
- Replit-specific plugins for development experience

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Headless component primitives (@radix-ui/react-*)
- **Shadcn/ui**: Pre-built accessible components configured via components.json
- **Lucide React**: Icon library for UI elements
- **Embla Carousel**: Carousel/slider component primitives

### Styling & Utilities
- **Tailwind CSS**: Utility-first CSS framework with custom config
- **clsx & tailwind-merge**: Conditional className utilities
- **class-variance-authority**: Component variant management
- **PostCSS**: CSS processing with autoprefixer

### Data & Forms
- **React Hook Form**: Form state management (@hookform/resolvers)
- **Zod**: Schema validation (drizzle-zod integration)
- **date-fns**: Date formatting and manipulation

### Database & Backend (Configured but Unused)
- **Drizzle ORM**: TypeScript ORM with PostgreSQL support
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **Vite**: Build tool and dev server
- **esbuild**: Server-side bundling
- **tsx**: TypeScript execution for Node.js
- **TypeScript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development plugins

### Mapping & External Services
- **Google Maps**: Embedded map links for park directions
- **NParks**: Primary data source for all park information

### Font & Typography
- Web-safe font stack: Arial, Helvetica, sans-serif (no external font loading)