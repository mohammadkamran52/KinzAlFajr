// 404 page: shown for any unknown address. Reads pagesContent.notFound.
import { pagesContent } from "@/data/pages";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  const { heading = "", text = "" } = pagesContent.notFound ?? {};

  return (
    <>
      <PageMeta title={heading} description={text} />
      <section className="bg-surface py-16 lg:py-24">
        <Container>
          <SectionHeading as="h1" title={heading} subtitle={text} />
          <div className="mt-8">
            <Button to="/">Back to home</Button>
          </div>
        </Container>
      </section>
    </>
  );
}