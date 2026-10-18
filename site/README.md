# Curated Collections product website

A fully static Astro website built from `Curated Collections.fig` (exported 13 October 2026). The research collections themselves remain in Omeka S.

## Run locally

Use Node.js 22.12 or later. The `.nvmrc` selects Node 22.

```sh
cd site # from the repository root; in the MAMP working project, use its root instead
nvm use
npm ci
npm run dev
```

Open the local URL printed by Astro. For a production check:

```sh
npm run check
npm run build
npm test
npm run preview
```

Astro 7 may detach its development server. Stop it with `npx astro dev stop` when finished.

## Content maintenance

Every project is an individual Markdown file in `src/content/projects/`. Its front matter drives gallery cards, filters, related projects and the detail page; the Markdown body supplies the detail-page content. Update a file and rebuild to publish a change. No database or content service is involved in generating these pages.

```yaml
---
title: "Example collection"
summary: "A short, factual description."
institution: "University or project team"
tags: ["History", "Heritage"]
image: "/images/example.webp"
imageAlt: "A description of the collection preview"
order: 17
featured: false
status: "available"
links:
  - label: "Explore collection"
    url: "https://example.org/"
---

The longer project description goes here.
```

Use `status: "coming-soon"` and `links: []` when the collection is not available. `featured: true` includes it in the homepage carousel. The optional `managementUrl` preserves the existing catalogue's administration link for maintainers; it is deliberately never rendered into the product website. The schema in `src/content.config.ts` validates required fields at build time.

Project images live in `public/images/`. Use descriptive filenames and compressed images, ideally around 1200 pixels wide. The shared brand mark can be used for a forthcoming collection. Do not put research datasets or collection records in this repository.

Feature descriptions live in `src/content/features/`. About, Getting Started, Services, Developers and information pages live in `src/content/pages/`. Shared navigation and public contact settings are in `src/lib/site.ts`. Homepage introductory copy is in `src/pages/index.astro`.

There are 30 Markdown files: 16 projects, 8 pages (including Contact) and 6 feature descriptions. Contact page text lives in `src/content/pages/contact.md`: edit its front matter for headings, button labels and notices, and its Markdown body for the introductory paragraph and list. `src/pages/contact.astro` supplies the layout and chooses the configured enquiry method.

The homepage, gallery, features overview and 404 page still contain introductory text in their `.astro` templates under `src/pages/`. Astro combines templates with Markdown content to generate HTML in `dist/`. Edit the source files, then rebuild; edits to generated HTML are overwritten by the next build.

## Design and source material

- `src/styles/global.css` contains the design tokens, layouts and responsive rules.
- Native Astro components live in `src/components/`; the shared document shell is `src/layouts/BaseLayout.astro`.
- Host Grotesk is self-hosted in `src/assets/fonts/`, with its OFL licence in `public/fonts/OFL.txt`.
- The teal `#5FB2B2`, orange `#FF990A`, warm page backgrounds, 1280px content width, card shapes and desktop type scale come from the supplied Figma style guide.
- The brand mark, wordmark and ARDC vector paths were extracted from the supplied Figma file. Partner images and the first eight project descriptions/tags also came from that file. Existing catalogue URLs and the remaining projects came from the original `omeka-demo/docs/index.html` catalogue.
- Dark text replaces the wireframe's low-contrast white text on teal and orange. Small teal labels use a darker text token. Mobile layouts stack, navigation collapses and the carousel supports horizontal scrolling, keyboard focus and reduced motion.
- Additional navigation destinations use the Figma basic text-page template. Figma placeholder text and an accidental pasted sentence were removed. Introductory copy for pages without supplied prose is an editorial draft for the project team to review.

The archived HTML catalogue remains in the repository's `docs/` directory. The Figma source is not duplicated in the published website.

## Registration and contact

Copy `.env.example` to `.env` if needed. Set **one approved registration destination** with `PUBLIC_SIGNUP_URL` (an HTTPS hosted form), or set `PUBLIC_CONTACT_EMAIL` for email enquiries. Rebuild after any setting changes. These values are public configuration, never API keys.

The contact page links to the external form if configured, otherwise to the configured email address. With neither configured, it shows the fallback information and link from `src/content/pages/contact.md`, initially the ARDC Community Data Lab. The same Markdown file contains the copy for all three states and the email subject. Keep `template: "contact"` so it uses the contact layout. It does not simulate submissions or store personal information. An embedded form or custom endpoint should only be added after its provider, fields and privacy wording are agreed.

Privacy, copyright and accessibility copy describes this implementation and should be checked by the site owner before a public institutional launch. Some inherited collection links point to staging websites; confirm their preferred public URLs before that launch.

## Build and deployment

The only production deliverable is `dist/`: ordinary HTML, CSS, images, fonts and small browser scripts. Node is required only for development/building. Any static web host can serve the output, with `404.html` configured as its not-found page.

```sh
npm ci
npm run check
npm run build
npm test
# Upload the contents of dist/ to the web host.
```

Set `SITE_URL` to the final origin to include canonical metadata. For subdirectory hosting, also set `BASE_PATH` (for example `/omeka-demo/`) for both building and `npm test`. Internal routes, scripts and images respect that base. All Markdown changes require a new build.

The website has no authentication service or editing toolbar. Serve the contents of `dist/` directly from a static host.

### GitHub Pages

The public website is <https://systemik-solutions.github.io/omeka-demo/>. Repository Settings → Pages uses **GitHub Actions** as its source. `.github/workflows/website.yml` builds the `site/` project and deploys its `dist/` output after successful checks whenever changes under `site/` are pushed or merged into `main`. Pull requests run checks without publishing; the workflow can also be run manually from the Actions tab.

Editors can change the Markdown files through GitHub's web interface. Committing to `main`, or merging an approved pull request, starts a new build. Changes appear after the deployment completes; no local MAMP build is needed for GitHub edits.

The workflow uses Node 22 and supplies `SITE_URL=https://systemik-solutions.github.io` and `BASE_PATH=/omeka-demo/`. Optional repository Actions variables `PUBLIC_SIGNUP_URL` and `PUBLIC_CONTACT_EMAIL` configure the enquiry destination. Change the workflow's origin/base settings if a custom domain is introduced. No deployment secret or personal access token is stored in the repository: GitHub's built-in workflow identity publishes the static artifact.

For a local build matching GitHub Pages:

```sh
SITE_URL=https://systemik-solutions.github.io BASE_PATH=/omeka-demo/ npm run build
BASE_PATH=/omeka-demo/ npm test
```

For changes made in the standalone MAMP working project, copy the edited source files into the repository's `site/` directory before committing and pushing. Exclude `node_modules/`, `.astro/`, `dist/` and private `.env` files. GitHub edits are separate from the local MAMP copy until those source changes are brought back locally.

### Local MAMP hosting

The local installation is available at <http://localhost:8888/> while MAMP's Apache server is running. The editable project is `/Applications/MAMP/htdocs/curated-collections/`. MAMP's document root is its `dist/` subdirectory, so it serves only the generated website.

To rebuild and update the website after editing Markdown, run from this directory with Node 22.12 or later:

```sh
SITE_URL=http://localhost:8888 npm run build
npm test
```

Refresh the browser after the build succeeds. No copy or Apache restart is needed for content updates. MAMP serves `dist/` directly, without a Node server or database. `npm run dev` is an optional separate development preview; it does not update the MAMP-served build.

`deploy/mamp.conf` is copied to `/Applications/MAMP/conf/apache/extra/curated-collections.conf` and included by MAMP's `httpd.conf`. It limits access to this computer, protects the source directory, provides the custom 404 page and retains the earlier `/curated-collections/` URL as an alias. If MAMP regenerates its Apache configuration, set its document root to `/Applications/MAMP/htdocs/curated-collections/dist`, restore that include and restart Apache.

## Handover and upgrades

Keep the repository, domain, hosting and registration-provider accounts under the maintaining organisation. The committed lockfile makes `npm ci` reproducible. Schedule deliberate dependency reviews; review Astro migration notes before major upgrades. After an upgrade, run the type/content checks, static build, link test and a browser check of navigation, filters, project links and the homepage carousel at desktop and mobile widths.

There are no React/Vue components, server adapters, API endpoints, database connections or runtime Omeka requests. Adding these would be an architectural change, not a requirement for editing content or connecting a hosted signup form.
