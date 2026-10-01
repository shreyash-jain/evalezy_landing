/**
 * Blog registry: drives /blog/, the sitemap, llms-full.txt and the "From the blog" block on
 * any page listed in a post's `pages`. Each post is src/app/blog/<slug>/page.tsx using BlogShell.
 */
export interface Post {
  slug: string;
  title: string;
  description: string;
  category: "Guides" | "Assessment" | "AI checking" | "For developers";
  published: string; // YYYY-MM-DD
  updated?: string;
  readMins: number;
  keywords: string[];
  /** Site pages that should link to this post. */
  pages?: string[];
}

export const POSTS: Post[] = [];

export const postPath = (slug: string) => `/blog/${slug}/`;
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
