// Sets the browser tab title and the meta description for a page. The page passes in text from data/pages.js.
import { useEffect } from "react";

export default function PageMeta({ title = "", description = "" }) {
  useEffect(() => {
    if (title) document.title = title;

    if (!description) return;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [title, description]);

  return null;
}