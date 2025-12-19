type RatingParams = {
  loves: number;
  views: number;
  stars: number;
};

export function calculateRating({ loves, views, stars }: RatingParams) {
  const score = loves * 2 + views * 0.1 + stars * 3;
  const normalized = Math.min(5, score / 20);
  return Math.round(normalized * 10) / 10;
}
