# AGENTS

## Purpose
This repository hosts Jonas Lim Hong Xiang's writing-first personal website on GitHub Pages.

## Working Rules
- Keep the deployment model simple: static files only unless explicitly asked to add a build step.
- Preserve single-page tabbed navigation with `Home` and `About` unless requested otherwise.
- Treat `Home` as the primary experience: profile header + writing feed + in-page article reading.
- Do not remove key profile links (email, LinkedIn, GitHub, resume PDF) from the Home header and footer CTA area.
- Preserve a minimal, professional, editorial look (Medium-like) unless the user asks for a visual direction change.
- Keep changes mobile-friendly and accessible.

## Content Rules
- Writing content is markdown-driven from `posts/*.md` and indexed by `posts/index.json`.
- Keep post filenames date-prefixed: `YYYY-MM-DD-title.md`.
- Prefer updating structured content sources (`posts/*.md`, `posts/index.json`, `content/*.json`) over hardcoding content in HTML/JS.
- Keep profile/contact links discoverable during reading (header + footer CTA).

## Deployment
- GitHub Actions deploys on push to `main` via `.github/workflows/deploy.yml`.
- Ensure links and asset paths work when served from repository root.

## Pre-Push Checklist
Before committing and pushing, verify:
- New/edited post files are in `posts/` and intentionally included.
- `content/site.json` is updated for:
  - `posts` entries (if post visibility changed)
  - `profile.contacts.resumePdf` (if resume file changed)
- Frontmatter for new posts includes valid `title`, `date`, `category`, and `summary`.
- Post `date` uses `YYYY-MM-DD` format (display sorting depends on it).
- No stale references to removed config files (`content/resume.json`, `content/profile.json`, `posts/index.json`).
- `git status` reflects only intended changes before commit.

## Safety
- Avoid deleting user content without explicit request.
- If uncertain about factual profile details, pause and ask for clarification.
