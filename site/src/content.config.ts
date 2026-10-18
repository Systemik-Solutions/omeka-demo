import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    institution: z.string().default(""),
    tags: z.array(z.string()),
    image: z.string(),
    imageAlt: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    status: z.enum(["available", "coming-soon"]),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
    managementUrl: z.url().optional(),
  }),
});

const features = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/features" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

const pageMetadata = z.object({
  title: z.string(),
  summary: z.string(),
  eyebrow: z.string(),
});

const contactAction = z.object({
  description: z.string(),
  label: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.union([
    pageMetadata.extend({
      template: z.enum(["text", "about"]).default("text"),
    }),
    pageMetadata.extend({
      template: z.literal("contact"),
      banner: z.object({ title: z.string(), summary: z.string() }),
      heading: z.array(z.string()).min(1),
      guideLink: z.object({ label: z.string(), path: z.string().startsWith("/") }),
      panel: z.object({
        title: z.string(),
        signup: contactAction.extend({ note: z.string() }),
        email: contactAction.extend({ subject: z.string() }),
        fallback: contactAction.extend({ note: z.string(), url: z.url() }),
      }),
    }),
  ]),
});

export const collections = { projects, features, pages };
