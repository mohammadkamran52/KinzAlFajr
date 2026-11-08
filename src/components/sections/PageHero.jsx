// Top banner of inner pages. Renders the page's one h1.
// Text comes from the page that uses it (which reads data/pages.js).
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PageHero({ title, subtitle, children }) {
  if (!title) return null;

  return (
    <section className="border-b border-line bg-surface-alt py-12 lg:py-20">
      <Container>
        <SectionHeading as="h1" title={title} subtitle={subtitle} />
        {children ? <div className="mt-6">{children}</div> : null}
      </Container>
    </section>
  );
}