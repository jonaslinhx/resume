# Project Context

## Product Summary
This website is a writing-first personal platform for Jonas Lim Hong Xiang.

Its purpose is to publish thoughtful long-form posts and keep a lightweight personal profile.  
It is not meant to duplicate LinkedIn or replace technical repository README files.

## Primary Goals
1. Publish markdown articles across multiple categories (for example: project reflections, trend thoughts, and other themes).
2. Keep key profile and contact links accessible from the first page.
3. Use article links in LinkedIn posts to direct readers to deeper writeups here.
4. Maintain a low-overhead publishing workflow.

## Positioning
- LinkedIn is the distribution and discovery channel.
- This site is the long-form reading destination.
- Project READMEs remain the deep technical source of truth.
- Posts here are insight-focused and outcome-oriented, not full implementation manuals.

## Information Architecture
Single-page navigation:
- Home (profile + writing feed + in-page article reader)
- About (non-professional/personal side)

No dedicated Contact tab.

## Home Requirements
Home must always provide:
- Email: `jonaslimhx@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/jonaslimhx`
- GitHub: `https://github.com/jonaslinhx`
- Resume PDF download from `assets/`

Contact links should be available in both:
- Home header quick links
- Footer CTA links

## Home Content Model
Content is markdown-driven:
- Posts are stored in `posts/`
- Discovery list is controlled by `posts/index.json`

Recommended frontmatter for each post:
- `title`
- `date` (YYYY-MM-DD)
- `category` (e.g. `project-reflection`, `trend-thoughts`, `career`, `learning-notes`)
- `summary`
- `tags`
- Optional: `linkedin_url`

Post expectations:
- State context, viewpoint, and takeaway clearly.
- Be readable for both technical and non-technical audiences.
- Link to project repositories for technical deep dives where relevant.

## Home UX Pattern
- Home merges profile and writing (no separate Writing tab).
- User selects a post card and reads the full article within the same page context.
- Desktop: two-column reader flow (post list + article pane).
- Mobile: list view with in-page article view and back action.

## About Section
The About section is for personal, non-professional context:
- Interests, hobbies, values, and motivations.
- Keep tone authentic and concise.
- Avoid duplicating resume bullets.

## Design System
### Aesthetic Direction
- Minimal, professional, editorial style inspired by Medium-like reading experiences.
- Prioritize clarity, whitespace, and readability over decorative UI effects.
- Keep interactions subtle and predictable.

### Color Style
Use the current neutral palette:
- Background: `#FAFAF8`
- Surface: `#FFFFFF`
- Primary text: `#1F2328`
- Secondary text: `#5F6670`
- Border/line: `#E6E8EB`
- Accent: `#2B6CB0`
- Accent soft state: `#E9F2FF`

### Typography
- Heading font: `Space Grotesk`
- UI/body font: `IBM Plex Sans`
- Article content font: `Source Serif 4`
- Prioritize comfortable long-form reading line height and spacing.

### Layout
- Single-page structure with clear section boundaries.
- Home supports feed + article reading flow in one place.
- Keep spacing generous and scannable.
- Preserve responsive behavior across desktop and mobile.

### UI Behavior
- Tab state should be clear and stable.
- Active selections (post card, section tab) should be visually obvious.
- Interactions should remain lightweight and non-distracting.
- Key profile/contact links must remain consistently discoverable.

## Maintenance Principles
- Keep implementation static/simple unless explicitly asked to add a build system.
- Prefer structured content updates (`posts/*.md`, JSON content) over hardcoded edits.
- Optimize for consistent publishing cadence with minimal friction.
