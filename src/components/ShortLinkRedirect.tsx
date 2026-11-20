"use client";

import { useEffect } from "react";
import { OFFER_API } from "@/lib/site";
import { shortLinkCode, shortLinkTarget, type ShortLink } from "@/lib/shortLinks";

/**
 * On the 404 page: a short link saved on the health dashboard after the site's last build has no
 * server redirect yet (scripts/short-links.mjs adds them at build time). If the missing path is one
 * of the product's short links, open the home page tagged with its source and campaign.
 */
export function ShortLinkRedirect() {
  useEffect(() => {
    const path = window.location.pathname;
    if (!shortLinkCode(path)) return;
    let gone = false;
    fetch(OFFER_API)
      .then((r) => (r.ok ? r.json() : null))
      .then((offer: { short_links?: ShortLink[] } | null) => {
        const target = shortLinkTarget(path, offer?.short_links);
        if (!gone && target) window.location.replace(target);
      })
      .catch(() => {
        /* a real missing page: the 404 stays */
      });
    return () => {
      gone = true;
    };
  }, []);
  return null;
}
