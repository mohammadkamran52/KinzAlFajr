// Sticky top navigation. Reads navLinks and navCta from data/navigation.js.
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { navLinks, navCta } from "@/data/navigation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// NavLink passes isActive, so the current page gets the active style.
const desktopLinkClass = ({ isActive }) =>
  `inline-flex min-h-11 items-center border-b-2 px-1 text-base font-semibold transition-colors ${focusRing} ${
    isActive
      ? "border-primary text-primary"
      : "border-transparent text-ink-muted hover:text-ink"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex min-h-11 items-center border-s-4 ps-3 text-lg font-semibold transition-colors ${focusRing} ${
    isActive
      ? "border-primary text-primary"
      : "border-transparent text-ink hover:text-primary"
  }`;

export default function Navbar() {
  const { pathname } = useLocation();
  const buttonRef = useRef(null);

  // We remember WHICH page the menu was opened on. When the page changes,
  // "open" becomes false by itself, so the panel closes on every route change.
  const [openedOn, setOpenedOn] = useState(null);
  const open = openedOn === pathname;

  const toggleMenu = () => setOpenedOn(open ? null : pathname);

  // Escape closes the panel and puts focus back on the menu button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenedOn(null);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className={`inline-flex items-center ${focusRing}`}>
          <Logo className="h-9 w-auto" />
        </Link>

        {/* Desktop: links, theme toggle, call to action */}
        <nav aria-label="Main" className="ms-auto hidden md:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={desktopLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {navCta?.label && <Button to={navCta.path}>{navCta.label}</Button>}
        </div>

        {/* Mobile: theme toggle and menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex size-11 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:bg-surface-alt ${focusRing}`}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-surface md:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          {navCta?.label && (
            <Button to={navCta.path} className="mt-4 w-full">
              {navCta.label}
            </Button>
          )}
        </Container>
      </div>
    </header>
  );
}