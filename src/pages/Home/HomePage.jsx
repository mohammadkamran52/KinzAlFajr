// TEMPORARY stub, replaced in step 6.5. Reads the headline from data/pages.js.
import { pagesContent } from "@/data/pages";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";

export default function HomePage() {
  const { title, description, hero } = pagesContent.home;
  return (
    <>
      <PageMeta title={title} description={description} />
      <Container className="py-16 lg:py-24">
        <h1 className="font-heading text-4xl font-bold">{hero?.headline}</h1>
      </Container>
    </>
  );
}