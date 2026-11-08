// Testimonials block with its own heading. Reads data/testimonials.js and
// the default heading text from data/pages.js. Hides itself when empty.
import { testimonials } from "@/data/testimonials";
import { pagesContent } from "@/data/pages";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/cards/TestimonialCard";

export default function TestimonialsSection({
  limit,
  title = pagesContent?.sections?.testimonials?.title,
  subtitle = pagesContent?.sections?.testimonials?.subtitle,
}) {
  let items = Array.isArray(testimonials) ? testimonials : [];
  if (typeof limit === "number" && limit > 0) items = items.slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-line bg-surface py-16 lg:py-24">
      <Container>
        <SectionHeading title={title || ""} subtitle={subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}