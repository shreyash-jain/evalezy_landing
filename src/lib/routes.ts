/** Every public URL on the site, in one list: feeds sitemap.xml and llms-full.txt. */
import { PAGES } from "./site";
import { AUDIENCES } from "@/content/audiences";
import { COMPARISONS } from "@/content/comparisons";
import { POSTS, postPath } from "@/content/posts";

export interface Route {
  path: string;
  priority: number;
  lastModified?: string;
}

export function allRoutes(): Route[] {
  return [
    { path: "/", priority: 1 },
    ...PAGES.map((p) => ({ path: p.path, priority: p.group === "product" ? 0.9 : 0.8 })),
    ...AUDIENCES.map((a) => ({ path: `/for/${a.slug}/`, priority: 0.8 })),
    ...COMPARISONS.map((c) => ({ path: `/compare/${c.slug}/`, priority: 0.7 })),
    ...POSTS.map((p) => ({ path: postPath(p.slug), priority: 0.7, lastModified: p.updated ?? p.published })),
  ];
}
