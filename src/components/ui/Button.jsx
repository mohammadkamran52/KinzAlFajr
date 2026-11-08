// Button in three styles. Renders a router Link, a normal link, or a real button. Reads no data.
import { Link } from "react-router";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary/90",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-surface",
  ghost: "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  md: "min-h-11 px-5 py-2 text-base",
  lg: "min-h-12 px-7 py-3 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`;

  // Internal page: React Router Link (no full page reload).
  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // External, tel: or mailto: link. Web links open in a new tab.
  if (href) {
    const isWebLink = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isWebLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}