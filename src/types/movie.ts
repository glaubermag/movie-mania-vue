import { describe, it, expect } from 'vitest';

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
}

export interface CartItem {
  movie: Movie;
  quantity: number;
}

export interface Genre {
  id: number;
  name: string;
}

describe('types/movie', () => {
  it('permite criar um objeto do tipo Movie', () => {
    const movie: Movie = {
      id: 1,
      title: 'Filme',
      overview: 'Sinopse',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2023-01-01',
      vote_average: 8.5,
      genre_ids: [1, 2]
    };
    expect(movie.title).toBe('Filme');
    expect(movie.genre_ids).toContain(1);
  });
});
