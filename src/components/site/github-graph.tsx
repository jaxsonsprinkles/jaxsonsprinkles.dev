import { useEffect, useState } from "react";
import { Hint } from "@/components/site/hint";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const WEEKS = 36;
const COLORS = ["#e8e8e8", "#b5d9b8", "#6ab978", "#2d8a48", "#1a6b3c"];

type Contribution = { date: string; count: number; level: number };
type Day = Contribution & { future: boolean };

const iso = (d: Date) => d.toISOString().split("T")[0];
const noon = (s: string) => new Date(`${s}T12:00:00`);

function fmtDate(s: string) {
  const d = noon(s);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function buildWeeks(contributions: Contribution[]): Day[][] {
  const map = new Map(contributions.map((c) => [c.date, c]));
  const today = new Date();
  const todayStr = iso(today);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const weeks: Day[][] = [];
  for (let w = WEEKS - 1; w >= 0; w--) {
    const week: Day[] = [];
    for (let d = 0; d < 7; d++) {
      const dt = new Date(weekStart);
      dt.setDate(weekStart.getDate() - w * 7 + d);
      const date = iso(dt);
      const c = map.get(date);
      week.push({ date, count: c?.count ?? 0, level: c?.level ?? 0, future: date > todayStr });
    }
    weeks.push(week);
  }
  return weeks;
}

// First column always gets its month; later labels only when the 1st falls in
// that week and it is 3+ columns from the previous label.
function monthLabels(weeks: Day[][]) {
  const labels = [{ col: 0, label: MONTHS[noon(weeks[0][0].date).getMonth()] }];
  let last = 0;
  weeks.forEach((week, i) => {
    const first = week.find((d) => noon(d.date).getDate() === 1);
    if (first && i - last >= 3) {
      labels.push({ col: i, label: MONTHS[noon(first.date).getMonth()] });
      last = i;
    }
  });
  return labels;
}

export function GithubGraph() {
  const [weeks, setWeeks] = useState<Day[][] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/jaxsonsprinkles?y=last")
      .then((r) => r.json())
      .then((data) => setWeeks(buildWeeks(data.contributions)))
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <p className="text-caption-1-medium text-text-tertiary">could not load activity</p>;
  if (!weeks) return <p className="font-mono text-caption-1-medium text-text-tertiary">loading...</p>;

  const total = weeks.flat().reduce((sum, d) => sum + (d.future ? 0 : d.count), 0);

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex min-w-max flex-col">
          <div className="relative mb-1 h-4.5">
            {monthLabels(weeks).map((m) => (
              <span
                key={m.col}
                className="absolute font-mono text-[10px] text-text-tertiary"
                style={{ left: m.col * STEP }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex" style={{ gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day) => {
                  const cell = (
                    <div
                      className="shrink-0 rounded-xs"
                      style={{ width: CELL, height: CELL, background: day.future ? "transparent" : COLORS[day.level] }}
                    />
                  );
                  if (day.future) return <div key={day.date}>{cell}</div>;
                  const label =
                    day.count === 0
                      ? `No contributions on ${fmtDate(day.date)}`
                      : `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${fmtDate(day.date)}`;
                  return (
                    <Hint key={day.date} label={label}>
                      {cell}
                    </Hint>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2.5 font-mono text-[11px] text-text-tertiary">
        {total.toLocaleString()} contributions in the last 9 months
      </p>
    </div>
  );
}
