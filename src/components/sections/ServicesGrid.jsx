// Lists services from data/services.js as a card grid or a detailed stack.
import { services } from "@/data/services";
import ServiceCard from "@/components/cards/ServiceCard";

export default function ServicesGrid({
  variant = "compact",
  featuredOnly = false,
  limit,
  className = "",
}) {
  let items = Array.isArray(services) ? services : [];

  if (featuredOnly) items = items.filter((service) => service.featured);
  if (typeof limit === "number" && limit > 0) items = items.slice(0, limit);

  if (items.length === 0) return null;

  const layout =
    variant === "detailed"
      ? "grid gap-8"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`${layout} ${className}`.trim()}>
      {items.map((service) => (
        <ServiceCard key={service.id} service={service} variant={variant} />
      ))}
    </div>
  );
}