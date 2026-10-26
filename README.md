# Curated Collections

The public website is built with Astro and published to **https://systemik-solutions.github.io/omeka-demo/** using GitHub Pages.

## Edit website content

Open the relevant Markdown file on GitHub, select **Edit**, make your changes, and commit to `main` or open a pull request for review.

| Content | Files |
| --- | --- |
| Project titles, descriptions, tags and links | [`site/src/content/projects/`](site/src/content/projects/) |
| All main pages, including Home, Gallery, Features and the 404 page | [`site/src/content/pages/`](site/src/content/pages/) |
| Contact page headings, text, button labels and notices | [`site/src/content/pages/contact.md`](site/src/content/pages/contact.md) |
| Feature descriptions | [`site/src/content/features/`](site/src/content/features/) |
| Shared navigation, footer, buttons and interface labels | [`site/src/content/site/settings.md`](site/src/content/site/settings.md) |
| Project images | [`site/public/images/`](site/public/images/) |

Every public page has a Markdown content file. Each uses YAML front matter between `---` lines for structured fields; pages with longer prose also use a Markdown body. The `.astro` files supply the layouts and behaviour, and CSS supplies the styling. You do not need to edit those files to change page text.

Keep the existing front matter fields, `template` values and placeholders such as `{count}` and `{title}`; quote text where needed. To add a project, copy an existing project file, choose a unique filename, update its fields and upload its image. Image paths in Markdown start with `/images/`; the build adds the correct website prefix.

For a project without a picture, leave `image: ""` and `imageAlt: ""`. The site keeps an empty image area until a picture is added.

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
