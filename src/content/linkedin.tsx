export function LinkedInArticleBody() {
  return (
    <>
    <p className="meta">A breakdown for anyone still treating LinkedIn like a digital resume instead of a growth channel.</p>

    <p>Most LinkedIn profiles sit at a 4 or 5 out of 10 — a headline that just repeats a job title, an empty featured section, a profile photo from three jobs ago, and zero activity. None of that is fixed by "trying harder." It's fixed by knowing exactly what a recruiter, hiring manager, or potential connection actually looks at, in what order, and for how long (usually under 10 seconds on the first pass). Here's the full breakdown of what pushes a profile from a 4 to an actual 10, section by section.</p>

    <h2>1. Photo and banner: the 2-second filter</h2>
    <p>Before anyone reads a word, they register your photo and banner. This happens faster than you can control it, so it has to already be right.</p>
    <ul>
      <li><strong>Photo:</strong> Front-facing, shoulders up, plain or softly blurred background, good lighting (natural light near a window beats any ring light). No sunglasses, no group photo crops, no low-res selfies. You should be smiling with your eyes, not just your mouth — it reads as more trustworthy in the research on this.</li>
      <li><strong>Banner:</strong> This is free real estate almost nobody uses. Put your focus area, a project name, or a one-line value statement on it. A blank default-blue banner signals "I set this profile up once and never came back."</li>
    </ul>

    <h2>2. Write a headline that shows real interest, not just a title</h2>
    <p>Your headline shows up everywhere you do — search results, comments, connection requests, the "People you may know" feed. It's read far more often than your About section, which means it's doing more work than any other line on your profile. A weak headline just restates your job title. A strong one shows what you're about and gets you found in search.</p>
    <p>Use this formula:</p>
    <div className="headline-example">
      School/Program + Job Title/Focus + Key Skills + Keywords
    </div>
    <p>Example: <em>"CS Student @ [School] | Building web apps with React & Python | Web Dev · AI · Automation"</em></p>
    <p>Notice what that headline is doing: it names the school (context for recruiters filtering by university), the focus (what you actually want to be found for), the skills (technical keywords), and a keyword row at the end (search terms a recruiter or founder might type into LinkedIn's search bar). Compare that to "Student at [School]" — same person, ten times less searchable, and it tells a stranger nothing about what you actually do.</p>
    <p>A few headline mistakes worth avoiding:</p>
    <ul>
      <li>Stuffing it with buzzwords that don't map to anything real ("Passionate | Driven | Results-Oriented" tells a reader nothing).</li>
      <li>Making it identical to your current job title with no extra signal — that's what the "Experience" section is for.</li>
      <li>Leaving LinkedIn's auto-generated default headline in place (just your most recent title and company) — it's the single most common tell that a profile is neglected.</li>
    </ul>

    <h2>3. Rewrite your About section like a short pitch, not a resume paragraph</h2>
    <p>The About section is where people go after the headline gets their attention. Most people either leave it blank or paste a stiff, third-person summary that reads like a cover letter. Neither works. Write it in first person, in three short parts:</p>
    <ul>
      <li><strong>What you do</strong> — one or two sentences, plain language, no jargon.</li>
      <li><strong>Proof</strong> — a specific project, result, or number. Specificity is what makes it believable; vague claims ("hard worker," "team player") are what makes people skim past it.</li>
      <li><strong>What you're looking for / open to</strong> — this is the line that turns a passive visitor into someone who reaches out, because you've told them exactly what a good next step looks like.</li>
    </ul>
    <p>Keep the first two lines doing the heavy lifting — LinkedIn truncates the About section after roughly 300 characters with a "see more" link, and most readers never click it.</p>

    <h2>4. Use the Featured section to show real work</h2>
    <p>Most people leave this blank or fill it with a resume PDF. Instead, pin projects, write-ups, case studies, or links that show what you've actually built — a live site, a GitHub repo, a one-page project breakdown, a post that got real engagement. This is the section that turns a profile visit into someone actually being impressed, because it's proof instead of a claim.</p>
    <p>A good Featured section has 3-5 items, each with a short one-line description of what it is and why it matters — don't make someone click through blind to figure out what they're looking at.</p>

    <h2>5. Post monthly — even if it's small</h2>
    <p>You don't need a viral post every week. One update a month — a project shipped, a lesson learned, a small win, a mistake you fixed — keeps you visible and keeps your profile from looking abandoned. An abandoned-looking profile (no posts in a year-plus) reads as "not currently active in this space," even if that's not true.</p>
    <p>If you're stuck on what to post, these formats reliably work and take under 20 minutes to write:</p>
    <ul>
      <li><strong>The build update:</strong> "Here's what I shipped this month and what I learned building it."</li>
      <li><strong>The lesson:</strong> "I got this wrong, here's what I'd do differently."</li>
      <li><strong>The resource share:</strong> "Here's a tool/article/course that actually helped, and why."</li>
      <li><strong>The behind-the-scenes:</strong> a screenshot or short breakdown of something you're currently working on, before it's finished.</li>
    </ul>
    <p>Consistency beats quality here. A short, honest post every month for a year does more for your visibility than one polished post that took a week to write.</p>

    <h2>6. Send at least 5 connection requests a week — with a note</h2>
    <p>A great profile with zero network doesn't go anywhere. Five requests a week, with a short personalized note, compounds fast over a few months. The note matters more than the number: a blank request gets ignored far more often than one with even a single specific line attached.</p>
    <p>A simple note template that works:</p>
    <div className="headline-example">
      Hi [Name] — saw your work on [specific thing]. I'm [one line about you]. Would love to connect.
    </div>
    <p>The specific reference is what makes it land — it proves you looked at their profile instead of mass-sending the same request to two hundred people, which is exactly what most people do and exactly why it gets ignored.</p>

    <h2>7. Skills, endorsements, and recommendations</h2>
    <p>List 10-15 skills that actually match your headline and About section — not a random grab-bag of every skill you've ever touched. LinkedIn lets people search by skill, so this section is quietly doing SEO work for your profile.</p>
    <p>Recommendations matter more than endorsements. A one-line skill endorsement from someone you've never worked with is worth far less than two or three short written recommendations from people who can speak to something specific you did. Ask for these directly — most people are happy to write one if you ask, but almost nobody does it unprompted.</p>

    

<div className="outro">
      <p>If you don't know me, my name is Jaxson. Right now, I'm building <a href="https://mochitext.com" className="text-accent-600 underline underline-offset-3">Mochi</a>, an AI health tracker. <a href="https://jaxsonsprinkles.dev" className="text-accent-600 underline underline-offset-3">Let's stay connected</a>.</p>
    </div>
    </>
  );
}
