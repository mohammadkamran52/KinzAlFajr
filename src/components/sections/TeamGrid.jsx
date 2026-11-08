// Shows everyone from data/team.js, optionally grouped by department.
import { team } from "@/data/team";
import PersonCard from "@/components/cards/PersonCard";

const gridClasses = "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";

export default function TeamGrid({
  groupByDepartment = true,
  includeLeaders = true,
}) {
  const people = (Array.isArray(team) ? team : []).filter(
    (person) => includeLeaders || !person.isLeader
  );

  if (people.length === 0) return null;

  if (!groupByDepartment) {
    return (
      <div className={gridClasses}>
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    );
  }

  // Group by department, keeping the order in which departments first appear.
  const groups = new Map();
  people.forEach((person) => {
    const name = person.department || "";
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(person);
  });

  return (
    <div className="grid gap-12">
      {[...groups.entries()].map(([department, members]) => (
        <div key={department || "other"}>
          {department ? (
            <h2 className="mb-6 border-b border-line pb-3 font-heading text-2xl font-bold text-ink">
              {department}
            </h2>
          ) : null}
          <div className={gridClasses}>
            {members.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}