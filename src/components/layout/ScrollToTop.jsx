// On every page change, scrolls to the top. If the URL has a #hash, scrolls smoothly to that element instead.
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduceMotion ? "auto" : "smooth";
    const pageChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    let target = null;
    if (hash) {
      try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        target = null;
      }
    }

    if (target) {
      // Jump to the top first when arriving from another page, then glide to the section.
      if (pageChanged) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      target.scrollIntoView({ behavior, block: "start" });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}