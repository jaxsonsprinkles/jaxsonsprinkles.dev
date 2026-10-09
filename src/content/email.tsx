export function EmailPostBody() {
  return (
    <>
        <p>
          In March, I sent a cold email to the head of marketing at a startup
          called Appybara. I didn't know anyone there. I didn't have a warm
          intro. I just had a portfolio, a few shipped projects, and a sentence
          that said "I think I could help." I didn't expect much. Most cold
          emails go nowhere, and I'd sent enough of them by then to know that.
        </p>
        <p>
          This one didn't go nowhere. The marketing lead liked what he saw and
          connected me with the founder, Aleksei. A few conversations later, I
          was a Full-Stack Software Engineering Intern at an AI-powered college
          application platform, the kind of tool that helps students write
          essays, get admissions feedback, and figure out how likely they are to
          get into the college of their dreams. I'd be reporting straight to the
          founder daily, on a small team, working on the real product.
        </p>
        <p>
          I want to be clear about what that meant, because "internship" can
          mean a lot of things. It didn't mean waiting for Aleksei to tell me
          what to do every day or building a random feature in a PR that would
          never get merged. It meant that my code would go out to real students
          using the product to plan their futures. That's more pressure than
          I've ever felt.
        </p>
        <p>
          Once I actually started, the thing I hadn't anticipated was how much
          of the job wasn't "add a feature" but "make the product trustworthy."
          Appybara tells highschoolers how strong their college application is
          and what to fix. If that advice is inconsistent, or the platform feels
          like it can be gamed, or the interface makes you doubt what you're
          looking at, the whole thing falls apart.
        </p>
        <p>
          That paradigm is what connects almost everything I shipped. The
          admissions review tool scores a student's profile using an LLM, and I
          found that if you regenerated a review on the same profile, the scores
          would drift (sometimes by a lot) because the model had no memory of
          its own last answer. I fixed that by feeding previous scores back into
          the prompt as anchors, which took the standard deviation across
          repeated regenerations from 0.49 to 0.0. Same profile in, same answer
          out.
        </p>
        <p>
          What surprised me most was the amount of independence that teamwork
          has. Not all of my assignments were supposed to be cherry-picked from
          Linear; I had to use the site, find issues, and submit them on my own.
          At Appybara, I had to justify "why does this matter" for every line of
          a PR, and it has made me a sharper engineer than any project I built
          on my own could have.
        </p>
        <p>
          I still don't know exactly where this internship will lead me in the
          future. But I know it started with one email at 10:26 AM. The ask is
          usually cheaper than you think, and the work is usually more available
          than you think: you just have to be brave enough to go looking for it.
        </p>
      
    </>
  );
}
