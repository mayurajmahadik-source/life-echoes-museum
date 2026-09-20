# LIFE//RECEIPTS — Initial Experience

## Goal
Build a frontend-only opening experience that introduces LIFE//RECEIPTS as an interactive digital museum, with a strong responsive foundation for future receipt exploration.

## What will be built
- A cinematic first screen with the LIFE//RECEIPTS identity, tagline, minimal museum-style navigation, and a clear invitation to enter the archive.
- An interactive constellation preview built from fictional receipt moments, with distinct category colors, connecting lines, hover/focus details, and a selected-moment story panel.
- An editorial “signals in the noise” section that demonstrates relationships across music, purchases, places, transactions, and events without becoming a dashboard.
- A concise museum-index footer and responsive mobile navigation.
- Static typed mock data and reusable components for receipt moments, category legends, navigation, and narrative sections.

## Visual direction
- Near-black ink background, warm paper surfaces, restrained signal colors, fine rules, and receipt-inspired typography details.
- Large editorial display typography paired with a clean grotesk body face.
- Sparse, asymmetric composition with constellation lines, grain, and subtle cinematic movement.
- Motion will be purposeful and reduced automatically for visitors who prefer reduced motion.

## Interaction and accessibility
- Keyboard-accessible constellation points and navigation.
- Clear focus states, semantic landmarks, readable contrast, and reduced-motion support.
- Constellation selection updates the featured receipt story entirely in the browser.
- Responsive layouts will preserve the experience on phones without hiding essential content.

## Technical approach
- Keep the existing TanStack Start/Vite React structure and implement the experience at `/`.
- Use React state and static TypeScript data only; no authentication, database, API, or backend.
- Use CSS/SVG for the constellation rather than adding a visualization dependency.
- Define all colors, typography, shadows, and motion as semantic tokens in the global design system.
- Add unique page metadata and verify rendering, interaction, responsiveness, and the preview build.
