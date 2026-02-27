# Project Context

## Product Summary
A resume-first personal website for Jonas Lim Hong Xiang, deployed on GitHub Pages.

## Information Architecture
Single-page layout with tabbed sections:
- Resume (default/home)
- About
- Writing
- Contact

## Design Direction
- Style: minimal professional
- Visual system:
  - Background: `#F7F8FA`
  - Surface: `#FFFFFF`
  - Primary text: `#111827`
  - Secondary text: `#4B5563`
  - Border: `#E5E7EB`
  - Accent: `#0F766E`

## Resume Requirements
- Home section must include:
  - Email: `jonaslimhx@gmail.com`
  - LinkedIn quick link: `https://www.linkedin.com/in/jonaslimhx`
  - GitHub quick link: `https://github.com/jonaslinhx`
  - Resume PDF download link from `assets/`

## Writing Workflow
- Posts are markdown files in `posts/`.
- `posts/index.json` controls post discovery order and loading.
- Each post should include frontmatter:
  - `title`
  - `date` (YYYY-MM-DD)
  - `summary`
  - `tags`

## Content Maintenance Notes
- Replace placeholder resume bullets with measurable outcomes.
- Keep About section balanced: professional personality without oversharing.
- Prefer short, high-signal writing posts (3-7 minute read).
