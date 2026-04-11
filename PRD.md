# Planning Guide

A neuromorphic edge perception platform website that turns camera feeds into reliable autonomous agents for unmanned retail, inspection, and robotics.

**Experience Qualities**: 
1. **Professional** — Clean, technical presentation that inspires confidence in enterprise customers and developers
2. **Modern** — Dark cinematic UI with subtle animations that feel cutting-edge without being distracting
3. **Informative** — Clear value propositions and technical depth without overwhelming the user

**Complexity Level**: Light Application (multiple features with basic state)
- Single-page application with client-side routing between multiple information pages
- Persistent navigation state to remember user's last visited page
- Multiple interconnected sections (Products, Solutions, Technology, Resources, Community, About, Careers, Auth)
- Focused on content presentation with dropdown menus and clear navigation patterns

## Essential Features

### Navigation System
- **Functionality**: Multi-level dropdown navigation with Products, Solutions, Technology, Resources, Community, and About sections
- **Purpose**: Organize complex information architecture into digestible categories
- **Trigger**: User clicks on navigation items or hovers over dropdowns
- **Progression**: Click nav item → Dropdown opens (if applicable) → Select option → Navigate to page → Content loads
- **Success criteria**: Users can find any section within 2 clicks from the homepage

### Homepage Hero
- **Functionality**: Full-viewport cinematic experience with background video, animated brand arrival (AuraSense → line → NEPA → descriptor), no scrollable content
- **Purpose**: Create an immersive, premium first impression that immediately establishes brand identity and technological sophistication
- **Trigger**: Page load
- **Progression**: Page loads → Video autoplays → "AuraSense" fades in (0-0.8s) → Teal line expands (0.8s-1.6s) → "NEPA" fades in (1.6s-2.4s) → Descriptor fades in (2.4s-3.2s) → Full brand identity visible
- **Success criteria**: Smooth sequential animation with no jank, video loads and plays immediately, text is highly legible over video with dark overlay

### Problem/Value Sections
- **Functionality**: Three-column layout explaining value for different audiences (unmanned operations, AI agents, edge deployments)
- **Purpose**: Address different user personas and their specific needs
- **Trigger**: User scrolls down from hero
- **Progression**: User scrolls → Sections come into view → User reads relevant column → Understands value for their use case
- **Success criteria**: Each persona can quickly identify their relevant value proposition

### How It Works
- **Functionality**: Three-step process visualization (Ingest → Understand → Act)
- **Purpose**: Simplify complex technical architecture into understandable workflow
- **Trigger**: User scrolls to section
- **Progression**: User scrolls → Cards appear → User reads steps left to right → Grasps system flow
- **Success criteria**: Users understand the basic operational flow without technical jargon

### Use Cases Grid
- **Functionality**: Clickable cards showcasing primary applications (retail, inspection, robotics)
- **Purpose**: Help users envision specific applications of the platform
- **Trigger**: User scrolls or clicks from navigation
- **Progression**: User views cards → Clicks relevant use case → Navigates to solutions page → Learns details
- **Success criteria**: Users can identify their industry and click through for more information

### Interactive Playground
- **Functionality**: Live demo environment where users can query NEPA world model with natural language and see real-time responses
- **Purpose**: Allow developers and potential customers to experience the platform's AI capabilities hands-on
- **Trigger**: User navigates to playground or clicks "Try Demo" CTA
- **Progression**: User enters query → Selects context (retail/inspection/robotics) → Submits → AI generates response → Response displays with syntax highlighting → User can save/copy queries
- **Success criteria**: Users can experiment with queries, understand response format, and see value in under 30 seconds

### Protected Dashboard Routes
- **Functionality**: Authentication-gated dashboard routes that require login with JWT token management
- **Purpose**: Secure access to NEPA console features (facade inspection, robot tasks, audit logs, live intelligence)
- **Trigger**: User attempts to access `/dashboard/*` routes
- **Progression**: Unauthenticated access → Redirect to `/login` (with return URL saved) → User enters credentials → API validates → Tokens stored → Redirect to original destination → Dashboard accessible
- **Success criteria**: Unauthorized users cannot access dashboard, login flow is seamless with automatic redirect-after-login, sessions persist across page refreshes

## Edge Case Handling
- **Missing/Future Content** — Placeholder pages with clear messaging and back navigation for sections under construction
- **Deep Linking** — Persistent state ensures users can refresh and stay on the same page
- **Navigation State** — UseKV persists last visited page between sessions for smoother return visits
- **Empty Dropdown Hover** — Dropdowns require click, not hover, to prevent accidental triggers

## Design Direction
The design should evoke a sense of **technical sophistication**, **reliability**, and **innovation**. The homepage uses a full-viewport cinematic approach with a looping background video and sequential brand animation to create an immersive, premium experience. The dark overlay ensures text legibility while maintaining the cinematic atmosphere. The rest of the site maintains the dark, technical aesthetic with glowing accents creates a futuristic yet grounded feeling—appropriate for edge AI and neuromorphic computing. The interface should feel like a premium SaaS platform: clean, purposeful, and confidence-inspiring.

## Color Selection

Primary Color: `oklch(0.72 0.19 195)` — A vibrant cyan-blue that represents cutting-edge technology and intelligence
- Communicates: Innovation, precision, technical excellence
- Used for: Primary CTAs, accents, hover states, active navigation

Secondary Colors:
- Background: `oklch(0.05 0 0)` — Deep charcoal black for cinematic depth
- Foreground: `oklch(0.98 0 0)` — Near-white for maximum readability
- Card: `oklch(0.08 0 0)` — Slightly lighter than background for layering

Accent Color: `oklch(0.68 0.21 175)` — Slightly desaturated teal for badges and highlights
- Communicates: Secondary actions, categorization, informational elements
- Used for: Badges, secondary highlights, category tags

**Foreground/Background Pairings**:
- Primary (Cyan #00D4FF): White text (#FAFAFA) - Ratio 8.2:1 ✓
- Background (Deep Black #0D0F14): White text (#FAFAFA) - Ratio 18.5:1 ✓
- Card (Dark Gray #141821): White text (#FAFAFA) - Ratio 16.2:1 ✓
- Accent (Teal #00D4AA): Black text (#0D0F14) - Ratio 7.1:1 ✓

## Font Selection
Typography should convey modern technical sophistication with excellent readability across all sizes. The homepage uses Inter for the cinematic brand arrival sequence, while the rest of the site uses Space Grotesk for body content and JetBrains Mono for technical elements.

- **Homepage Primary**: Inter — A clean, highly legible geometric sans-serif perfect for the cinematic brand presentation
- **Site Primary**: Space Grotesk — A geometric sans-serif with technical character and modern proportions
- **Monospace**: JetBrains Mono — For code snippets, technical labels, and badges

**Typographic Hierarchy**:
- Homepage H1 (AuraSense): Inter Light / clamp(2rem, 5vw, 4.5rem) / 0.3em letter-spacing / weight 300
- Homepage H2 (NEPA): Inter Medium / clamp(1.5rem, 3vw, 2.5rem) / 0.4em letter-spacing / weight 500 / color #00C9A7
- Homepage Descriptor: Inter Regular / clamp(0.75rem, 1.5vw, 1rem) / 0.2em letter-spacing / weight 400 / uppercase / color #CCCCCC
- H1 (Site Hero): Space Grotesk Bold / clamp(42px, 6vw, 80px) / -0.02em letter-spacing / line-height 1.1
- H2 (Section): Space Grotesk Bold / 48-60px / -0.01em letter-spacing / line-height 1.2
- H3 (Card Title): Space Grotesk Bold / 20-24px / normal letter-spacing / line-height 1.3
- Body: Space Grotesk Regular / 16-18px / normal letter-spacing / line-height 1.6
- Small/Labels: JetBrains Mono Medium / 12-13px / 0.05em letter-spacing / uppercase

## Animations
Animations should be subtle and purposeful, enhancing the premium feel without causing distraction or delay.

**Homepage brand arrival**: Sequential fade-in animations for brand elements (0.8s each step with ease-out timing). The teal divider line expands from center. Total sequence runs 0s-3.2s on page load.

**Ambient animations**: Gentle breathing glow orbs in the background provide life and depth without demanding attention. These run continuously at 8-10 second cycles.

**Interaction animations**: Hover states use 200-300ms transitions for color and scale changes. Cards lift slightly and show border glow on hover.

**Scroll-triggered**: Floating node cards and scope lines animate with subtle float animations, creating a sense of live data and active systems.

**Navigation**: Dropdown menus fade in over 150ms with subtle scale transform. Navigation state changes are immediate with color transitions.

## Component Selection

**Components**: 
- Navigation: Custom component with shadcn DropdownMenu for multi-level menus
- Hero: Custom layout with shadcn Badge for tags and Button for CTAs
- Cards: Custom glassmorphism cards with backdrop-filter blur
- Footer: Simple link grid with shadcn Button components
- Placeholders: Custom centered layout with navigation back button

**Customizations**:
- Cinematic Background: Custom component with animated glow orbs, dot grid overlay, floating node cards
- Glassmorphism effect: Custom CSS with backdrop-filter blur and subtle borders
- Scope lines and scroll HUD: Custom decorative elements for technical aesthetic

**States**:
- Buttons: Default (primary bg), Hover (slightly lighter), Active (pressed), Ghost (outline only)
- Cards: Default (subtle border), Hover (glow border + lift), Active (navigation to new page)
- Dropdowns: Closed (caret down), Open (caret up + content visible), Hover (highlight item)
- Navigation: Default (muted), Active page (primary color), Hover (primary color)

**Icon Selection**:
- Phosphor Icons (duotone weight) for visual interest
- VideoCamera, Robot, Cube for "How it works"
- ShoppingCart, Drone, Package for use cases
- ArrowRight for CTAs and navigation

**Spacing**:
- Section padding: py-32 (128px vertical)
- Card padding: p-8 (32px all sides)
- Grid gaps: gap-6 (24px) for tight grids, gap-12 (48px) for looser layouts
- Container: max-w-6xl to max-w-7xl depending on content density

**Mobile**:
- Navigation collapses to hamburger menu (future enhancement, currently scales down)
- Hero text: clamp() function scales from 42px to 80px based on viewport
- Grid columns: 1 column on mobile, 2-3 on tablet, 3-4 on desktop
- Card padding reduces to p-6 on mobile
- Buttons stack vertically on very small screens
