// Site logo. Reads company.logo, company.name and company.shortName.
// Shows the light-theme or dark-theme image depending on the theme; falls back to a text wordmark.
import { company } from "@/data/company";

export default function Logo({ variant = "full", className = "" }) {
  const { forLightTheme = "", forDarkTheme = "", mark = "" } = company.logo || {};
  // className controls the image size; default is a 36px-high logo.
  const sizeClass = className || "h-9 w-auto";

  const wordmark = (
    <span className="font-heading text-2xl font-bold text-ink">
      {company.shortName || company.name}
    </span>
  );

  if (variant === "mark") {
    if (!mark) return wordmark;
    return <img src={mark} alt={company.name} className={sizeClass} />;
  }

  // Full logo: only one image supplied, use it in both themes.
  if (forLightTheme && !forDarkTheme) {
    return <img src={forLightTheme} alt={company.name} className={sizeClass} />;
  }
  if (forDarkTheme && !forLightTheme) {
    return <img src={forDarkTheme} alt={company.name} className={sizeClass} />;
  }
  if (!forLightTheme && !forDarkTheme) return wordmark;

  return (
    <>
      <img src={forLightTheme} alt={company.name} className={`${sizeClass} dark:hidden`} />
      <img src={forDarkTheme} alt={company.name} className={`hidden ${sizeClass} dark:block`} />
    </>
  );
}