import { useEffect, useRef, useState } from "react";
import { slotText } from "slot-text";
import { Layout } from "@/components/site/layout";

const START = new Date("2020-06-15T00:00:00").getTime();
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;
const yearsStr = () => ((Date.now() - START) / MS_PER_YEAR).toFixed(7);

function YearsCounter() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const label = slotText(ref.current!, yearsStr());
    const id = setInterval(() => {
      label.set(yearsStr(), { direction: "up", duration: 250, stagger: 20 });
    }, 350);
    return () => clearInterval(id);
  }, []);

  return <span ref={ref} className="years-counter">0.0000000</span>;
}

// Shown until the live WaniKani level arrives (or if no token is configured).
const FALLBACK_WANIKANI_LEVEL = 23;

function WanikaniLevel() {
  const [level, setLevel] = useState(FALLBACK_WANIKANI_LEVEL);

  useEffect(() => {
    const token = import.meta.env.VITE_WANIKANI_TOKEN;
    if (!token) return;
    const ctrl = new AbortController();
    fetch("https://api.wanikani.com/v2/user", {
      headers: { Authorization: `Bearer ${token}`, "Wanikani-Revision": "20170710" },
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        if (Number.isInteger(j?.data?.level)) setLevel(j.data.level);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  return <>{level}</>;
}

export function AboutPage() {
  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">About</h1>
      </div>

      <div className="about-body">
        <div className="about-text">
          <p className="about-lead">
            To know me, you have to know how I build a Chipotle burrito. I eat there so much my life has started to
            resemble one. (I have over 12,000 Chipotle points.)
          </p>
          <p>My perfect burrito has five things in it, and so do I.</p>
          <dl className="burrito">
            <div>
              <dt className="text-body-medium text-text-tertiary">Rice</dt>
              <dd>
                I'm a runner. I run varsity cross country and track, and I'm a 4‑time district champion. My team has
                placed top 15 in the state, and it's a 4‑time district champion too.
              </dd>
            </div>
            <div>
              <dt className="text-body-medium text-text-tertiary">Beans</dt>
              <dd>
                I'm a polyglot. I speak English, Spanish, and Japanese. I'm currently level <WanikaniLevel /> on{" "}
                <a href="https://www.wanikani.com" target="_blank" rel="noopener noreferrer" className="text-accent-600 underline underline-offset-3">
                  WaniKani
                </a>
                .
              </dd>
            </div>
            <div>
              <dt className="text-body-medium text-text-tertiary">Meat</dt>
              <dd>
                I'm a coder. I've been coding for <YearsCounter /> years, building everything from neural networks and
                bigram models to consumer apps that hundreds of people use every day.
              </dd>
            </div>
            <div>
              <dt className="text-body-medium text-text-tertiary">Guacamole</dt>
              <dd>
                I'm a creator. Since I was 10, I've been sharing my content with the world, and now I post to over 5,000
                followers on{" "}
                <a href="https://instagram.com/jaxsonsprinkles" target="_blank" rel="noopener noreferrer" className="text-accent-600 underline underline-offset-3">
                  Instagram
                </a>
                .
              </dd>
            </div>
            <div>
              <dt className="text-body-medium text-text-tertiary">Tortilla</dt>
              <dd>
                I'm a problem solver. It holds everything else together: whatever I touch, I look for a way to make it
                better.
              </dd>
            </div>
          </dl>
        </div>

        <div className="about-photo">
          <img src="/about.jpg" alt="Jaxson Sprinkles" />
        </div>
      </div>
    </Layout>
  );
}
