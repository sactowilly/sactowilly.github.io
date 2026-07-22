# Will Zrnchik — AI Systems Builder

Public portfolio source for **https://sactowilly.github.io/** and the source brief for a ChatGPT Sites version.

## Positioning

Will combines business leadership, sales, operations, organizational development, and AI-assisted development to turn real-world problems into practical tools and workflows.

The portfolio presents three kinds of public work with explicit labels:

- **Original prototype** — built or directed as Will's own project.
- **Open-source adaptation** — third-party open-source work retained with attribution and used for study, implementation, or customization.
- **Research library** — public reference material used to study prompt systems, security, agents, or image-generation workflows.

## Public-content boundary

This repository and website must not contain:

- Employer-confidential information
- Customer or prospect names
- Customer lists
- Internal pricing, costs, margins, quotes, or sales figures
- Proprietary processes, training, documents, or specifications
- Private repositories or screenshots from private systems
- Personal family, health, financial, recovery, or benefits information
- API keys, tokens, passwords, or private contact information

Public examples are limited to approved public GitHub repositories and general professional capabilities.

## Files

- `index.html` — page structure, content, SEO metadata, and structured data
- `styles.css` — responsive design system, dark/light themes, accessibility, and layout
- `script.js` — navigation, theme preference, scroll effects, and allowlisted public GitHub metadata
- `SITES_BUILD_PROMPT.md` — source prompt for recreating or importing the portfolio into ChatGPT Sites
- `robots.txt` and `sitemap.xml` — basic search-engine discovery

## Local preview

No build step is required. Run a local server from the repository directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The repository name follows GitHub Pages' user-site convention. In repository settings, configure Pages to deploy from the `master` branch root if it is not already active.

For ChatGPT Sites, open ChatGPT Work or Codex, reference this repository, and use `SITES_BUILD_PROMPT.md` as the governing build brief. Review the private preview before enabling public access.

## Content updates

Before adding a project:

1. Confirm the repository is public and approved for promotion.
2. Check for employer names, customer data, internal branding, private screenshots, secrets, and proprietary workflows.
3. Identify whether the work is original, adapted open source, or a research reference.
4. Credit upstream authors and licenses where applicable.
5. Add the repository only to the explicit allowlist in `index.html`.

## Contact

Public profile: https://github.com/sactowilly
