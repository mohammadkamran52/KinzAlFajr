// Home page: hero with tile wall, featured services, about teaser, testimonials, call to action.
// Reads pagesContent.home, pagesContent.sections.services and navCta.
import { useEffect, useState } from "react";
import { pagesContent } from "@/data/pages";
import { navCta } from "@/data/navigation";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CallToAction from "@/components/sections/CallToAction";

// Tile wall: 16 tiles, each a colour token. Full class names are written out so Tailwind can find them.
const tileTones = [
  "bg-primary", "bg-surface-alt border border-line", "bg-line", "bg-accent",
  "bg-surface-alt border border-line", "bg-ink", "bg-primary", "bg-line",
  "bg-line", "bg-primary", "bg-accent", "bg-surface-alt border border-line",
  "bg-accent", "bg-surface-alt border border-line", "bg-primary", "bg-ink",
];
const tileDelays = [
  "delay-0", "delay-[60ms]", "delay-[120ms]", "delay-[180ms]",
  "delay-[240ms]", "delay-[300ms]", "delay-[360ms]", "delay-[420ms]",
  "delay-[480ms]", "delay-[540ms]", "delay-[600ms]", "delay-[660ms]",
  "delay-[720ms]", "delay-[780ms]", "delay-[840ms]", "delay-[900ms]",
];

// Hero buttons are plain strings in pages.js; this also accepts { label } just in case
const ctaLabel = (cta) => (typeof cta === "string" ? cta : cta?.label ?? "");

export default function HomePage() {
  const { title = "", description = "", hero = {}, about = {} } =
    pagesContent.home ?? {};
  const servicesSection = pagesContent.sections?.services ?? {};
  const primaryLabel = ctaLabel(hero.primaryCta);
  const secondaryLabel = ctaLabel(hero.secondaryCta);

  // Tiles start hidden and are laid in one by one, once, when the page loads
  const [laidIn, setLaidIn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLaidIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageMeta title={title} description={description} />

      {/* Hero */}
      <section className="border-b border-line bg-surface py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="font-heading text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
                {hero.headline}
              </h1>
              {hero.subheadline && (
                <p className="mt-5 max-w-xl text-lg text-ink-muted">
                  {hero.subheadline}
                </p>
              )}
              {(primaryLabel || secondaryLabel) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {primaryLabel && (
                    <Button to={navCta.path} size="lg">
                      {primaryLabel}
                    </Button>
                  )}
                  {secondaryLabel && (
                    <Button to="/services" variant="secondary" size="lg">
                      {secondaryLabel}
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div
              aria-hidden="true"
              className="mx-auto grid w-full max-w-sm grid-cols-4 gap-2 sm:gap-3 lg:max-w-md"
            >
              {/* The tile list never changes, so the position is a safe key */}
              {tileTones.map((tone, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-sm transition-all duration-500 ease-out motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${tone} ${tileDelays[index]} ${
                    laidIn ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured services */}
      <section className="border-b border-line bg-surface-alt py-16 lg:py-24">
        <Container>
          <SectionHeading
            title={servicesSection.title ?? ""}
            subtitle={servicesSection.subtitle ?? ""}
          />
          <div className="mt-10">
            <ServicesGrid variant="compact" featuredOnly />
          </div>
          <div className="mt-10">
            <Button to="/services" variant="secondary">
              View all services
            </Button>
          </div>
        </Container>
      </section>

      {/* About teaser */}
      {(about.heading || about.text) && (
        <section className="border-b border-line bg-surface py-16 lg:py-24">
          <Container>
            <SectionHeading title={about.heading ?? ""} subtitle={about.text ?? ""} />
            <div className="mt-8">
              <Button to="/who-we-are" variant="secondary">
                Learn more about us
              </Button>
            </div>
          </Container>
        </section>
      )}

      <TestimonialsSection limit={3} />
    </>
  );
}