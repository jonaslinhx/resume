# Jonas Lim - Personal Writing Site

Writing-first personal website hosted on GitHub Pages.

## How To Publish A New Post
1. Create a new markdown file in `posts/`.
2. Add frontmatter (template below).
3. Add the filename into `content/site.json` under `posts`.
4. Push to `main` to trigger GitHub Pages deployment.

## Filename Format
Use:
- `YYYY-MM-DD-short-title.md`

Example:
- `2026-03-01-my-new-post.md`

## Site Structure
- Home: profile links + writing feed + in-page article reader
- About: personal/non-professional context

## Single Config File
This project uses one config file:
- `content/site.json`

It controls:
- Profile name + links
- Which posts are loaded into the Home feed

## Repository Layout
- `index.html`: page shell and section containers (`Home`, `About`)
- `styles/`: visual design
  - `tokens.css`: color/type/spacing tokens
  - `base.css`: global typography and base elements
  - `components.css`: nav, cards, chips, footer CTA
  - `sections.css`: home reader layout and article/post styles
- `scripts/`: client-side behavior
  - `main.js`: tab switching
  - `markdown.js`: markdown/frontmatter parsing helpers
  - `posts.js`: post feed loading + in-page article rendering
  - `resume.js`: profile header + footer CTA links from `content/site.json`
- `posts/`: markdown articles
- `content/`: site configuration (`site.json`)
- `assets/`: static files like the downloadable resume PDF
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow
- `AGENTS.md`, `PROJECT_CONTEXT.md`: agent/project guidance documents

## Frontmatter Template
```md
---
title: My Post Title
date: 2026-03-01
category: project-reflection
summary: One sentence summary shown on the post card.
tags: ml, systems, reflection
linkedin_url: https://www.linkedin.com/posts/your-post-link (optional)
---

# My Post Title

Write your article content here.
```

## Important Post Behavior
- A post only appears if it is listed in `content/site.json` under `posts`.
- Final display order is sorted by `date` (newest first) in `scripts/posts.js`.
- `site.json` list order does not control final display order.
- Keep `date` as `YYYY-MM-DD`.
- If `category` is missing, it defaults to `general`.

## Configure Resume PDF Download
The download target is controlled in `content/site.json`.

Edit this field:
```json
{
  "profile": {
    "contacts": {
      "resumePdf": "assets/IMDA-SG-Digital-Scholar-Resume-Jonas-Lim-Hong-Xiang.pdf"
    }
  }
}
```

To switch PDF:
1. Put the new PDF file inside `assets/`.
2. Update `profile.contacts.resumePdf` in `content/site.json` to that file path.
3. Push to `main`.
