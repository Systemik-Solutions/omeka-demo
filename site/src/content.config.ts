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

const internalLink = z.object({ label: z.string(), path: z.string().startsWith("/") });
const banner = z.object({ title: z.string(), summary: z.string() });
const headingLines = z.array(z.string()).min(1);
const homeSection = z.object({
  eyebrow: z.string(),
  heading: headingLines,
  link: internalLink,
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.union([
    pageMetadata.extend({
      template: z.enum(["text", "about"]).default("text"),
    }),
    pageMetadata.extend({
      template: z.literal("contact"),
      banner,
      heading: headingLines,
      guideLink: internalLink,
      panel: z.object({
        title: z.string(),
        signup: contactAction.extend({ note: z.string() }),
        email: contactAction.extend({ subject: z.string() }),
        fallback: contactAction.extend({ note: z.string(), url: z.url() }),
      }),
    }),
    pageMetadata.extend({
      template: z.literal("home"),
      hero: z.object({
        description: z.string(),
        primaryAction: internalLink,
        secondaryAction: internalLink,
      }),
      introduction: z.object({
        title: z.string(),
        description: z.string(),
        principles: z.array(z.object({ heading: headingLines, description: z.string() })),
      }),
      features: homeSection,
      gallery: homeSection,
    }),
    pageMetadata.extend({
      template: z.literal("gallery"),
      banner,
      heading: z.string(),
      introduction: z.string(),
      filters: z.object({ all: z.string(), label: z.string() }),
      search: z.object({ label: z.string(), placeholder: z.string() }),
      results: z.object({
        singular: z.string(),
        plural: z.string(),
        disciplineSuffix: z.string(),
        searchSuffix: z.string(),
      }),
      empty: z.object({ title: z.string(), description: z.string(), resetLabel: z.string() }),
    }),
    pageMetadata.extend({
      template: z.literal("features"),
      banner,
      heading: z.string(),
    }),
    pageMetadata.extend({
      template: z.literal("not-found"),
      heading: z.string(),
      description: z.string(),
      primaryAction: internalLink,
      secondaryAction: internalLink,
    }),
  ]),
});

const site = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/site" }),
  schema: z.object({
    metadata: z.object({ name: z.string(), defaultTitle: z.string(), defaultDescription: z.string() }),
    skipLink: z.string(),
    navigation: z.array(internalLink),
    registration: internalLink,
    header: z.object({
      homeLabel: z.string(), logoAlt: z.string(), menuLabel: z.string(),
      openNavigation: z.string(), closeNavigation: z.string(), navigationLabel: z.string(),
    }),
    footer: z.object({
      logoAlt: z.string(), tagline: z.string(), exploreLabel: z.string(),
      navigationLabel: z.string(), informationLabel: z.string(),
      informationLinks: z.array(internalLink), legalLinks: z.array(internalLink),
    }),
    enquiry: z.object({ title: z.string(), link: internalLink }),
    partners: z.object({
      eyebrow: z.string(), title: z.string(),
      items: z.array(z.object({
        url: z.url(), label: z.string(), image: z.string(), imageAlt: z.string(),
        width: z.number(), height: z.number(),
      })),
    }),
    carousel: z.object({ regionLabel: z.string(), previousLabel: z.string(), nextLabel: z.string(), caption: z.string() }),
    projectCard: z.object({
      researchLabel: z.string(), inDevelopmentLabel: z.string(),
      discoverLabel: z.string(), discoverAriaLabel: z.string(),
    }),
    projectDetail: z.object({
      backLabel: z.string(), researchLabel: z.string(), informationHeading: z.string(),
      institutionLabel: z.string(), disciplinesLabel: z.string(), availabilityLabel: z.string(),
      availableLabel: z.string(), inDevelopmentLabel: z.string(),
      relatedEyebrow: z.string(), relatedHeading: z.string(),
    }),
    textPage: z.object({ homeLabel: z.string(), contentsLabel: z.string() }),
  }),
});

export const collections = { projects, features, pages, site };
