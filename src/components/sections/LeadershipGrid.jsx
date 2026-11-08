// Shows the people marked isLeader in data/team.js as coloured statement tiles.
import { team } from "@/data/team";
import PersonCard from "@/components/cards/PersonCard";

// Tile colours repeat in this order (see 05).
const tones = ["primary", "ink", "accent", "neutral"];

export default function LeadershipGrid({ className = "" }) {
  const leaders = (Array.isArray(team) ? team : []).filter(
    (person) => person.isLeader
  );

  if (leaders.length === 0) return null;

  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`.trim()}>
      {leaders.map((person, index) => (
        <PersonCard
          key={person.id}
          person={person}
          variant="leader"
          tone={tones[index % tones.length]}
        />
      ))}
    </div>
  );
}