// Services page: full details of every service. Reads pagesContent.services.
import { pagesContent } from "@/data/pages";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CallToAction from "@/components/sections/CallToAction";

export default function ServicesPage() {
  const { title = "", description = "", heading = "", intro = "" } =
    pagesContent.services ?? {};

  return (
    <>
      <PageMeta title={title} description={description} />
      <PageHero title={heading} subtitle={intro} />
      <section className="bg-surface py-16 lg:py-24">
        <Container>
          <ServicesGrid variant="detailed" />
        </Container>
      </section>
    </>
  );
}