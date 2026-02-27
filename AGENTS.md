# AGENTS

## Purpose
This repository hosts Jonas Lim Hong Xiang's resume-first personal website on GitHub Pages.

## Working Rules
- Keep the deployment model simple: static files only unless explicitly asked to add a build step.
- Preserve single-page tabbed navigation (`Resume`, `About`, `Writing`, `Contact`) unless requested otherwise.
- Do not remove contact quick links from the resume hero.
- Keep style direction minimal professional.
- Keep changes mobile-friendly and accessible.

## Content Rules
- Resume content on Home must prioritize concise, impact-first statements.
- Writing content is markdown-driven from `posts/*.md` and indexed by `posts/index.json`.
- Keep post filenames date-prefixed: `YYYY-MM-DD-title.md`.

## Deployment
- GitHub Actions deploys on push to `main` via `.github/workflows/deploy.yml`.
- Ensure links and asset paths work when served from repository root.

## Safety
- Avoid deleting user content without explicit request.
- If uncertain about factual resume details, leave placeholders and ask the user.
