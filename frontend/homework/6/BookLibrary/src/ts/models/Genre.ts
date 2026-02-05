export const Genre = {
  Action: "Action",
  Thriller: "Thriller",
  Horror: "Horror",
  Fantasy: "Fantasy",
  Biopic: "Biopic",
  Adventure: "Adventure",
  Drama: "Drama"
} as const;

export type Genre = typeof Genre[keyof typeof Genre];
