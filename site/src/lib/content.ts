import { getEntry } from "astro:content";

/** Shared editable copy, loaded only while Astro builds the static pages. */
export async function getSiteContent() {
  const entry = await getEntry("site", "settings");
  if (!entry) throw new Error("Missing src/content/site/settings.md");
  return entry.data;
}
