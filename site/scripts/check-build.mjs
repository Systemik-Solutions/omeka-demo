import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve("dist");
const base = (process.env.BASE_PATH || "/").replace(/\/$/, "");
const origin = "https://static-check.invalid";
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name.endsWith(".html")) files.push(file);
  }
}
await walk(root);
assert(
  files.length >= 27,
  "Expected product pages and all 16 project detail pages.",
);
let references = 0;
const problems = [];
for (const file of files) {
  const html = await readFile(file, "utf8");
  const route = "/" + path.relative(root, file).replace(/index\.html$/, "");
  const contentFile = route.startsWith("/projects/")
    ? `src/content${route.replace(/\/$/, "")}.md`
    : `src/content/pages/${route === "/" ? "home" : route === "/404.html" ? "404" : route.replace(/^\/|\/$/g, "")}.md`;
  assert(
    await stat(contentFile).then(() => true, () => false),
    `${route}: missing editable Markdown content at ${contentFile}`,
  );
  const current = new URL(base + route, origin);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${route}: expected exactly one h1`,
  );
  assert(html.includes('name="description"'), `${route}: missing description`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (/^(data:|mailto:|tel:)/.test(value)) continue;
    const target = new URL(value, current);
    if (target.origin !== origin) continue;
    references++;
    if (base && !target.pathname.startsWith(base + "/")) {
      problems.push(`${route}: URL escapes deployment base: ${value}`);
      continue;
    }
    let destination = path.join(
      root,
      decodeURIComponent(target.pathname.slice(base.length)),
    );
    try {
      const info = await stat(destination);
      if (info.isDirectory())
        destination = path.join(destination, "index.html");
      await stat(destination);
      if (target.hash && destination.endsWith(".html")) {
        const page = await readFile(destination, "utf8");
        if (!page.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`))
          problems.push(`${route}: missing anchor ${value}`);
      }
    } catch {
      problems.push(`${route}: missing target ${value}`);
    }
  }
  assert(
    !/href="[^"]*\/(admin|login)(?:[/?"])/.test(html),
    `${route}: management link exposed in public page`,
  );
}
assert.equal(problems.length, 0, problems.join("\n"));
console.log(
  `Checked ${files.length} static pages and ${references} internal links/assets. No missing targets or public management links.`,
);
