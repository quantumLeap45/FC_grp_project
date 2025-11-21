# Exploring Singapore's Green Gems

A comprehensive educational website showcasing Singapore's six premier nature reserves and parks, providing detailed information about trails, accessibility, scenic highlights, and safety guidelines for outdoor enthusiasts.

## Featured Parks

1. **MacRitchie Reservoir** - Singapore's oldest reservoir with the iconic TreeTop Walk
2. **Bukit Timah Nature Reserve** - Climb to Singapore's highest peak at 163m
3. **Rail Corridor (Central)** - Heritage trail along the former Malayan Railway
4. **Coney Island** - Coastal island park with rustic beaches and wildlife
5. **Sungei Buloh Wetland Reserve** - International wetland sanctuary for migratory birds
6. **Labrador Nature Reserve** - Coastal trails with WWII heritage sites

## Pages

- **Home** - Welcome page with purpose statement and site overview
- **Finder** - Detailed park information including difficulty, duration, and amenities
- **Directions** - Transport options via MRT, bus, and car with map references
- **Scenic** - Must-see highlights and attractions at each location
- **Safety** - Essential guidelines, weather tips, and packing checklist
- **Credits** - Team information, source attribution, and contact form

## How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5000` (or the port shown in terminal)

The website will automatically reload when you make changes to the source files.

## Content Sourcing

All park information has been paraphrased from official sources to ensure accuracy while respecting copyright:

- **Primary Source**: NParks (National Parks Board) official website - authoritative information on all Singapore parks
- **Maps**: Google Maps links for directions and navigation
- **Images**: Placeholder SVG images used; to be replaced with open-licensed photography

### Sources Used

- MacRitchie Reservoir: https://www.nparks.gov.sg/visit/parks/central-catchment-nature-reserve
- Bukit Timah Nature Reserve: https://www.nparks.gov.sg/visit/parks/bukit-timah-nature-reserve
- Rail Corridor: https://railcorridor.nparks.gov.sg/
- Coney Island Park: https://www.nparks.gov.sg/visit/parks/coney-island-park
- Sungei Buloh Wetland Reserve: https://www.nparks.gov.sg/visit/parks/sungei-buloh-wetland-reserve
- Labrador Nature Reserve: https://www.nparks.gov.sg/visit/parks/labrador-nature-reserve

All information has been synthesized and paraphrased for educational purposes with full attribution provided on the Credits page.

## Design System

**Color Palette**:
- Light Green (#A8D5A2) - Accent color for nature theme
- Beige (#F5E8D0) - Warm secondary background
- Dark Green (#2E7D32) - Primary brand color
- Text (#1F2937) - Main content text

**Typography**:
- Font Family: Arial, Helvetica, sans-serif (web-safe)
- Responsive sizing with mobile-first approach
- Clear hierarchy with H1-H3 headings

**Accessibility**:
- WCAG AA compliant color contrast ratios
- Keyboard navigation support with visible focus indicators
- Skip-to-content link for screen readers
- Comprehensive alt text for all images
- Semantic HTML5 structure
- Smooth scroll behavior for anchor links

## Features

✅ Fully responsive design (mobile, tablet, desktop)  
✅ Six comprehensive park information pages  
✅ Transport directions with visual map placeholders  
✅ Safety guidelines and packing checklist  
✅ Back-to-top navigation on long pages  
✅ Accessible navigation with skip links  
✅ Source attribution and contact form  
✅ Smooth scrolling and polished interactions  

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui component library
- **Routing**: Wouter for client-side navigation
- **Icons**: Lucide React icon set
- **Build Tool**: Vite for fast development and optimized production builds

## Known Limitations (Part-1 Prototype)

1. **Images**: Currently using SVG placeholders - production version would use properly licensed nature photography
2. **Maps**: Static placeholder images instead of embedded interactive maps (Google Maps links provided)
3. **Contact Form**: Non-functional demonstration form (no backend processing)
4. **YouTube Embeds**: Not implemented in Scenic page (can be added in future iteration)
5. **Dark Mode**: Not implemented in this version (could be added as enhancement)

## Project Structure

```
/client
  /public
    /data
      parks.json          # Structured park information
      sources.json        # Attribution and references
  /src
    /components
      Layout.tsx          # Shared header/footer wrapper
      /ui                 # Shadcn component library
    /pages
      Home.tsx            # Landing page
      Finder.tsx          # Park finder with details
      Directions.tsx      # Transport and directions
      Scenic.tsx          # Scenic highlights
      Safety.tsx          # Safety guidelines
      Credits.tsx         # Attribution and contact
    App.tsx               # Main app with routing
    index.css             # Global styles and design tokens
README.md                 # This file
```

## Future Enhancements

- Interactive embedded Google Maps
- User reviews and ratings system
- Trail difficulty calculator based on user fitness
- Weather integration with real-time forecasts
- Downloadable trail guide PDFs
- Photo gallery with user submissions
- Trail condition updates and alerts
- Mobile app version with offline maps

## Change Log

### Initial Release (Part-1 Prototype)
- ✅ Six-page website structure completed
- ✅ Comprehensive park data for all 6 locations
- ✅ Responsive design system with nature-inspired colors
- ✅ Accessibility features (WCAG AA compliant)
- ✅ Navigation header and footer on all pages
- ✅ Transport directions with MRT/Bus/Car options
- ✅ Safety guidelines and packing checklist
- ✅ Source attribution and credits page
- ✅ Contact form interface (non-functional)
- ✅ Back-to-top navigation on content-heavy pages

## License & Attribution

This website was created as an educational resource about Singapore's nature parks. All park information is paraphrased from official NParks sources with full attribution. No copyrighted text or media has been directly copied.

AI assistance was used in website development and content organization. See Credits page for complete source list.

---

**Made with ♥ for nature lovers exploring Singapore's green spaces**
