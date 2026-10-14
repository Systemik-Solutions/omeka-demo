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

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eyebrow: z.string(),
    template: z.enum(["text", "about"]).default("text"),
  }),
});

export const collections = { projects, features, pages };
