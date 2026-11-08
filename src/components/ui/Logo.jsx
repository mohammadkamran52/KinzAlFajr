// Site logo. Reads company.logo, company.name and company.shortName.
// Shows the light-theme or dark-theme image depending on the theme.
// Falls back to a text wordmark when the paths are empty or an image file is missing.
import { useState } from "react";
import { company } from "@/data/company";

export default function Logo({ variant = "full", className = "" }) {
  const { forLightTheme = "", forDarkTheme = "", mark = "" } = company.logo || {};
  // If a logo file is missing or broken, we switch to the text wordmark instead of a broken image.
  const [failed, setFailed] = useState(false);
  // className controls the image size; default is a 36px-high logo.
  const sizeClass = className || "h-9 w-auto";

  const wordmark = (
    <span className="font-heading text-2xl font-bold text-ink">
      {company.shortName || company.name}
    </span>
  );

  if (failed) return wordmark;
  const onError = () => setFailed(true);

  if (variant === "mark") {
    if (!mark) return wordmark;
    return <img src={mark} alt={company.name} onError={onError} className={sizeClass} />;
  }

  // Full logo: only one image supplied, use it in both themes.
  if (forLightTheme && !forDarkTheme) {
    return <img src={forLightTheme} alt={company.name} onError={onError} className={sizeClass} />;
  }
  if (forDarkTheme && !forLightTheme) {
    return <img src={forDarkTheme} alt={company.name} onError={onError} className={sizeClass} />;
  }
  if (!forLightTheme && !forDarkTheme) return wordmark;

  return (
    <>
      <img src={forLightTheme} alt={company.name} onError={onError} className={`${sizeClass} dark:hidden`} />
      <img src={forDarkTheme} alt={company.name} onError={onError} className={`hidden ${sizeClass} dark:block`} />
    </>
  );
}