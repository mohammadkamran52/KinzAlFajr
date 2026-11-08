// Shows one client testimonial. Reads one item from data/testimonials.js (prop)
// and looks up the service title in data/services.js.
import { useState } from "react";
import { Quote } from "lucide-react";
import { services } from "@/data/services";

// "Villa Owner Name" -> "VO" (first letters of the first two words)
function getInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function TestimonialCard({ testimonial }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  if (!testimonial) return null;

  const serviceTitle = testimonial.service
    ? services.find((s) => s.id === testimonial.service)?.title
    : "";
  const showPhoto = Boolean(testimonial.photo) && !photoFailed;

  return (
    <figure className="flex h-full flex-col rounded-sm border border-line bg-surface-alt p-6">
      <Quote aria-hidden="true" className="h-6 w-6 text-accent" />

      {testimonial.quote ? (
        <blockquote className="mt-4 flex-1 text-ink">
          <p>{testimonial.quote}</p>
        </blockquote>
      ) : (
        <div className="flex-1" />
      )}

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
        {showPhoto ? (
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            width={48}
            height={48}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
            className="h-12 w-12 shrink-0 rounded-sm border border-line object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-line bg-surface font-heading text-lg font-bold text-primary"
          >
            {getInitials(testimonial.name)}
          </div>
        )}
        <div>
          <p className="font-semibold text-ink">{testimonial.name}</p>
          {testimonial.role ? (
            <p className="text-sm text-ink-muted">{testimonial.role}</p>
          ) : null}
          {serviceTitle ? (
            <p className="text-sm text-primary">{serviceTitle}</p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}