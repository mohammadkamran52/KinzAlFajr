// Shows one service as a compact grid card or a detailed block.
// Receives one item from data/services.js through the "service" prop.
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ServiceCard({ service, variant = "compact" }) {
  // If the image file is missing or broken, we switch to the tile pattern.
  const [imageFailed, setImageFailed] = useState(false);

  if (!service) return null;

  const isDetailed = variant === "detailed";
  const showImage = Boolean(service.image) && !imageFailed;
  const includes = Array.isArray(service.includes) ? service.includes : [];

  const media = (
    <div
      className={
        isDetailed
          ? "relative aspect-4/3 w-full overflow-hidden border-b border-line bg-surface-alt md:aspect-auto md:min-h-64 md:border-b-0 md:border-e"
          : "relative aspect-4/3 w-full overflow-hidden border-b border-line bg-surface-alt"
      }
    >
      {showImage ? (
        <img
          src={service.image}
          alt={service.title}
          width={800}
          height={600}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // Neutral tile-pattern placeholder (decorative)
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-4 grid-rows-3 bg-surface-alt"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-e border-line" />
          ))}
        </div>
      )}
    </div>
  );

  if (isDetailed) {
    return (
      <article
        id={service.id}
        className="grid scroll-mt-24 overflow-hidden rounded-sm border border-line bg-surface-alt md:grid-cols-2"
      >
        {media}
        <div className="flex flex-col p-6 md:p-8">
          <h3 className="font-heading text-2xl font-bold text-ink md:text-3xl">
            {service.title}
          </h3>
          {service.fullDescription ? (
            <p className="mt-3 text-ink-muted">{service.fullDescription}</p>
          ) : null}
          {includes.length > 0 ? (
            <ul className="mt-5 grid gap-2">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink">
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6">
            <Button to={`/contact?service=${service.id}`}>Request a quote</Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface-alt transition-colors hover:border-primary motion-reduce:transition-none">
      {media}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-bold text-ink">
          {service.title}
        </h3>
        {service.shortDescription ? (
          <p className="mt-2 text-ink-muted">{service.shortDescription}</p>
        ) : null}
        <Button
          to={`/services#${service.id}`}
          variant="ghost"
          className="mt-auto self-start"
        >
          Learn more
          <ArrowRight
            aria-hidden="true"
            className="ms-2 h-4 w-4 rtl:rotate-180"
          />
        </Button>
      </div>
    </article>
  );
}