// App shell: skip link, navbar, the current page (Outlet), footer. Reads no data itself.
import { Outlet } from "react-router";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      {/* Appears only when a keyboard user presses Tab on page load */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-3 focus:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}