// Who we are page: story, vision, mission, values, leadership cards, testimonials.
// Reads pagesContent.whoWeAre, pagesContent.sections.leadership, company and team.
import { company } from "@/data/company";
import { pagesContent } from "@/data/pages";
import { team } from "@/data/team";
import PageMeta from "@/components/layout/PageMeta";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHero from "@/components/sections/PageHero";
import LeadershipGrid from "@/components/sections/LeadershipGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CallToAction from "@/components/sections/CallToAction";

export default function WhoWeArePage() {
  const {
    title = "",
    description = "",
    heading = "",
    intro = "",
    story = [],
  } = pagesContent.whoWeAre ?? {};
  const leadership = pagesContent.sections?.leadership ?? {};
  const { vision = "", mission = "", values = [] } = company;
  const hasLeaders = team.some((person) => person.isLeader);
  const hasVisionBlock = Boolean(vision || mission || values.length > 0);

  return (
    <>
      <PageMeta title={title} description={description} />
      <PageHero title={heading} subtitle={intro} />

      {story.length > 0 && (
        <section className="border-b border-line bg-surface py-16 lg:py-24">
          <Container>
            <div className="max-w-3xl space-y-5 text-lg text-ink">
              {/* Paragraphs are plain strings, so the position is used as the key */}
              {story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {hasVisionBlock && (
        <section className="border-b border-line bg-surface-alt py-16 lg:py-24">
          <Container>
            {(vision || mission) && (
              <div className="grid gap-6 md:grid-cols-2">
                {vision && (
                  <div className="border border-s-4 border-line border-s-primary bg-surface p-6">
                    <h2 className="font-heading text-2xl font-bold text-ink">
                      Our vision
                    </h2>
                    <p className="mt-3 text-ink-muted">{vision}</p>
                  </div>
                )}
                {mission && (
                  <div className="border border-s-4 border-line border-s-accent bg-surface p-6">
                    <h2 className="font-heading text-2xl font-bold text-ink">
                      Our mission
                    </h2>
                    <p className="mt-3 text-ink-muted">{mission}</p>
                  </div>
                )}
              </div>
            )}

            {values.length > 0 && (
              <div className={vision || mission ? "mt-14" : ""}>
                <h2 className="font-heading text-3xl font-bold text-ink">
                  Our values
                </h2>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {values.map((value) => (
                    <li
                      key={value.title}
                      className="border border-line bg-surface p-6"
                    >
                      <h3 className="font-heading text-xl font-semibold text-ink">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-ink-muted">{value.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </section>
      )}

      {hasLeaders && (
        <section className="border-b border-line bg-surface py-16 lg:py-24">
          <Container>
            <SectionHeading
              title={leadership.title ?? ""}
              subtitle={leadership.subtitle ?? ""}
            />
            <div className="mt-10">
              <LeadershipGrid />
            </div>
          </Container>
        </section>
      )}

      {/* <TestimonialsSection /> */}
      <CallToAction />
    </>
  );
}