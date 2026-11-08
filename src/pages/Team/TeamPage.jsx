// TEMPORARY stub, replaced in step 6.3. Reads the heading from data/pages.js.
import { pagesContent } from "@/data/pages";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";

export default function TeamPage() {
  const { title, description, heading } = pagesContent.team;
  return (
    <>
      <PageMeta title={title} description={description} />
      <Container className="py-16 lg:py-24">
        <h1 className="font-heading text-4xl font-bold">{heading}</h1>
      </Container>
    </>
  );
}