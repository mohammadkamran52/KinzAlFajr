// Team page: everyone who works in the company, grouped by department. Reads pagesContent.team.
import { pagesContent } from "@/data/pages";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import TeamGrid from "@/components/sections/TeamGrid";
import CallToAction from "@/components/sections/CallToAction";

export default function TeamPage() {
  const { title = "", description = "", heading = "", intro = "" } =
    pagesContent.team ?? {};

  return (
    <>
      <PageMeta title={title} description={description} />
      <PageHero title={heading} subtitle={intro} />
      <section className="bg-surface py-16 lg:py-24">
        <Container>
          <TeamGrid />
        </Container>
      </section>
      <CallToAction />
    </>
  );
}