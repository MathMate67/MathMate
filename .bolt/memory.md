# Project memory

## Product intent & audience

- MathMate: educational website making maths practical for everyday life.
- Tagline: "Learn Maths. Use Maths. Make Life Easier."
- Audience: general learners wanting to apply maths in daily situations (shopping, percentages, measuring, time planning).
- Scope: homepage only for now; advanced features deferred.

## Brand personality & voice

- Professional yet colourful and playful.
- Friendly, welcoming, approachable; polished and production-worthy.
- Original illustrations and designs — no stock/cookie-cutter look.

## Visual design & UX direction

- White background with soft blue, purple, and yellow accents.
- Rounded cards, subtle animations (hover lift, fade-in on scroll).
- Typography: Baloo 2 (display) + Nunito (body), loaded via HTML `<head>` not CSS `@import`.
- Original SVG illustrations (calculator, floating maths symbols, feature/use-case art).
- Layout patterns: fixed navbar with mobile slide-down menu; hero with stats; 3 feature cards; sticky-intro + card grid section; gradient CTA banner; dark footer.
- Responsive across phones, Android tablets, desktops.

## Decisions, constraints & rationale

- Stack: Vite + React, Tailwind CSS, Lucide React icons, `@/` path alias for `src/`.
- No external UI/icon/theme packages beyond template defaults.
- No fake AI functionality; no user registration/auth.
- All nav links must be functional (anchor/section navigation on homepage).
- Font `@import` moved to `index.html` head to resolve CSS import-order warning.
- `useRef` removed when unused to keep clean build.

## Open questions & assumptions

- Content pages for Daily Life Maths, Learning Zone, Challenges not yet built — nav currently routes to homepage sections.
- Detailed content for each feature/use-case section to be defined when advanced features are requested.