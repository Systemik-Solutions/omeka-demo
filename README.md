# Curated Collections

The public website is built with Astro and published to **https://systemik-solutions.github.io/omeka-demo/** using GitHub Pages.

## Edit website content

Open the relevant Markdown file on GitHub, select **Edit**, make your changes, and commit to `main` or open a pull request for review.

| Content | Files |
| --- | --- |
| Project titles, descriptions, tags and links | [`site/src/content/projects/`](site/src/content/projects/) |
| About, Services, Getting Started and information pages | [`site/src/content/pages/`](site/src/content/pages/) |
| Feature descriptions | [`site/src/content/features/`](site/src/content/features/) |
| Project images | [`site/public/images/`](site/public/images/) |
| Homepage, gallery and contact templates | [`site/src/pages/`](site/src/pages/) |

Keep the existing Markdown front matter fields and quote text where needed. To add a project, copy an existing project file, choose a unique filename, update its fields and upload its image. Image paths in Markdown start with `/images/`; the build adds the correct website prefix.

Every change under `site/` committed or merged into `main` triggers the **Build and deploy website** workflow. It validates the content, builds the pages, checks links and publishes the result. Follow progress in the [Actions tab](https://github.com/Systemik-Solutions/omeka-demo/actions/workflows/website.yml). The live website changes when deployment succeeds. If a check fails, the previous published version stays available.

Pull requests run the same checks without deploying. Visitors can read the website without signing in; content editors need GitHub repository access.

## Development

Use Node.js 22.12 or later:

```sh
cd site
npm ci
npm run dev
```

See the [developer guide](site/README.md) for local MAMP setup, content fields, design details and deployment configuration. `docs/` retains the original catalogue as an archive; GitHub Pages publishes the Astro build from `site/dist/`.
