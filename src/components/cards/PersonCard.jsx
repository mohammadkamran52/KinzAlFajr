// Shows one team member: a solid colour "leader" tile or a standard photo card.
// Receives one item from data/team.js through the "person" prop.
import { useState } from "react";

// Colour pairs come from the semantic tokens in 05 (leader tiles only).
const toneClasses = {
  primary: "bg-primary text-on-primary border-primary",
  ink: "bg-ink text-surface border-ink",
  accent: "bg-accent text-on-accent border-accent",
  neutral: "bg-surface-alt text-ink border-line",
};

// "Sajid Akhtar Mohammad" -> "SA" (first letters of the first two words)
function getInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function PersonCard({
  person,
  variant = "standard",
  tone = "neutral",
}) {
  const [photoFailed, setPhotoFailed] = useState(false);

  if (!person) return null;

  const showPhoto = Boolean(person.photo) && !photoFailed;
  const initials = getInitials(person.name);

  if (variant === "leader") {
    const colours = toneClasses[tone] || toneClasses.neutral;

    return (
      <article
        className={`flex h-full flex-col justify-between gap-8 rounded-sm border p-6 ${colours}`}
      >
        {person.statement ? (
          <blockquote>
            <p className="font-heading text-xl font-semibold leading-snug md:text-2xl">
              &ldquo;{person.statement}&rdquo;
            </p>
          </blockquote>
        ) : (
          <span aria-hidden="true" />
        )}

        <div className="flex items-center gap-4">
          {showPhoto ? (
            <img
              src={person.photo}
              alt={person.name}
              width={64}
              height={64}
              loading="lazy"
              onError={() => setPhotoFailed(true)}
              className="h-16 w-16 shrink-0 rounded-sm border border-current object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-current font-heading text-2xl font-bold"
            >
              {initials}
            </div>
          )}
          <div>
            <h3 className="font-heading text-lg font-bold leading-tight">
              {person.name}
            </h3>
            {person.role ? (
              <p className="mt-1 text-sm opacity-90">{person.role}</p>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface-alt">
      <div className="relative aspect-square w-full border-b border-line">
        {showPhoto ? (
          <img
            src={person.photo}
            alt={person.name}
            width={600}
            height={600}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-surface font-heading text-5xl font-bold text-primary"
          >
            {initials}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-xl font-bold text-ink">
          {person.name}
        </h3>
        {person.role ? (
          <p className="mt-1 text-sm font-semibold text-primary">
            {person.role}
          </p>
        ) : null}
        {person.bio ? <p className="mt-3 text-ink-muted">{person.bio}</p> : null}
      </div>
    </article>
  );
}