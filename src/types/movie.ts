export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  price?: number;
  original_title?: string;
  original_language?: string;
  popularity?: number;
  vote_count?: number;
}

export interface CartItem {
  movie: Movie;
  quantity: number;
}

export interface Genre {
  id: number;
  name: string;
}
