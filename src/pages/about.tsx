import { useEffect, useRef } from "react";
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

export function AboutPage() {
  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">About</h1>
      </div>

      <div className="about-body">
        <div className="about-text">
          <p className="about-lead">
            For the past <YearsCounter /> years I've been coding my way from training neural nets from scratch to
            shipping full-stack applications that hundreds of people actually use.
          </p>
          <p>
            Lately I'm obsessed with new ways of talking to AI - not just chat windows, but places like iMessage, where
            it can just live in the conversation instead of being a separate app you have to think to open. I like
            poking at the edges of what AI can do and where it's still clunky, then figuring out how to push past that.
          </p>
          <p>
            Outside of coding, I'm a varsity athlete competing in cross country and track. I'm fluent in English,
            Spanish, and Japanese. And I'm probably the world's biggest Chipotle enthusiast.
          </p>
        </div>

        <div className="about-photo">
          <img src="/IMG_0336.jpeg" alt="Jaxson Sprinkles" />
        </div>
      </div>
    </Layout>
  );
}
