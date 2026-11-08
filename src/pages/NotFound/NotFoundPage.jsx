// Not-found page (basic version, expanded in step 6.6). Reads text from data/pages.js.
import { pagesContent } from "@/data/pages";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";

export default function NotFoundPage() {
  const { heading, text } = pagesContent.notFound;
  return (
    <>
      <PageMeta title={heading} description={text} />
      <Container className="py-16 lg:py-24">
        <h1 className="font-heading text-4xl font-bold">{heading}</h1>
        {text && <p className="mt-4 text-ink-muted">{text}</p>}
      </Container>
    </>
  );
}