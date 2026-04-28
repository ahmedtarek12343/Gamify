export interface Game {
  name: string;
  slug: string;
  background_image: string;
  description: string;
  website: string;
  rating: number;
  released: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  genres: Genre[];
  tags: Tag[];
  qty: number;
  dominant_color: string;
  parent_platforms: { platform: Platform }[];
}

export interface Order {
  id: number;
  userId: number;
  games: Game[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  clerkId: string;
  email: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image_background: string;
  platforms: Platform[];
  games_count: number;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
