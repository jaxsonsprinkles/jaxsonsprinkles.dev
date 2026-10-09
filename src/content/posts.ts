export type PostMeta = {
  slug: string;
  title: string;
  /** Short date used in lists. */
  shortDate: string;
  /** Long date shown on the post. */
  date: string;
  sub?: string;
};

// Newest first. Add an entry here (and a page in src/pages/posts.tsx) for a new post.
export const posts: PostMeta[] = [
  {
    slug: "you-can-just-email-people",
    title: "You Can Just Email People",
    shortDate: "Aug '26",
    date: "August 19, 2026",
    sub: "I sent one email asking for a chance. Three months later my code was live for thousands of students.",
  },
  {
    slug: "if-you-build-it-they-will-not-come",
    title: "If You Build It, They Will (Not) Come",
    shortDate: "May '26",
    date: "May 2, 2026",
    sub: "In a world where everyone can build, the people who win are the ones who can get eyeballs.",
  },
];
