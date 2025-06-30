import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getImageUrl } from './tmdbApi';
import * as api from './tmdbApi';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = '/sem-imagem.svg';

const mockFetch = vi.fn();
window.fetch = mockFetch;

const mockResponse = (data, ok = true) => ({
  ok,
  json: async () => data,
});

describe('tmdbApi', () => {
  // const OLD_ENV = { ...import.meta.env };
  beforeEach(() => {
    mockFetch.mockReset();
    // Reset env vars
    import.meta.env.VITE_TMDB_API_KEY = 'key';
    import.meta.env.VITE_TMDB_READ_TOKEN = 'token';
  });

  it('getPopularMovies retorna filmes populares da API', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse({ results: [{ id: 1, title: 'Filme Popular' }], page: 1, total_pages: 2 })
    );
    const result = await api.getPopularMovies();
    expect(result.movies[0].id).toBe(1);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(2);
  });

  it('getPopularMovies retorna mockMovies em caso de erro', async () => {
    mockFetch.mockRejectedValueOnce(new Error('erro'));
    const result = await api.getPopularMovies();
    expect(result.movies.length).toBeGreaterThan(0);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('getPopularMovies retorna mockMovies se não houver API_KEY', async () => {
    import.meta.env.VITE_TMDB_API_KEY = '';
    import.meta.env.VITE_TMDB_READ_TOKEN = '';
    const result = await api.getPopularMovies();
    expect(result.movies.length).toBeGreaterThan(0);
  });

  it('searchMovies retorna filmes da API', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse({ results: [{ id: 2, title: 'Busca' }], page: 1, total_pages: 1 })
    );
    const result = await api.searchMovies('Busca');
    expect(result.movies[0].id).toBe(2);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('searchMovies retorna mockMovies em caso de erro', async () => {
    mockFetch.mockRejectedValueOnce(new Error('erro'));
    const result = await api.searchMovies('Erro');
    expect(result.movies.length).toBeGreaterThan(0);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('searchMovies retorna mockMovies se não houver API_KEY', async () => {
    import.meta.env.VITE_TMDB_API_KEY = '';
    import.meta.env.VITE_TMDB_READ_TOKEN = '';
    const result = await api.searchMovies('Busca');
    expect(result.movies.length).toBeGreaterThan(0);
  });
});

describe('getImageUrl', () => {
  it('deve retornar a URL correta quando path começa com /', () => {
    const path = '/poster.jpg';
    expect(getImageUrl(path)).toBe(`${IMAGE_BASE_URL}/poster.jpg`);
  });

  it('deve retornar a URL correta quando path não começa com /', () => {
    const path = 'poster.jpg';
    expect(getImageUrl(path)).toBe(`${IMAGE_BASE_URL}/poster.jpg`);
  });

  it('deve retornar placeholder quando path é null', () => {
    expect(getImageUrl(null)).toBe(PLACEHOLDER);
  });

  it('deve retornar placeholder quando path é undefined', () => {
    expect(getImageUrl(undefined)).toBe(PLACEHOLDER);
  });

  it('deve retornar placeholder quando path é string vazia', () => {
    expect(getImageUrl('')).toBe(PLACEHOLDER);
  });

  it('deve funcionar com nomes de arquivos complexos', () => {
    const path = '/folder/subfolder/poster_123-abc.jpg';
    expect(getImageUrl(path)).toBe(`${IMAGE_BASE_URL}/folder/subfolder/poster_123-abc.jpg`);
  });

  it('getImageUrl retorna url correta', () => {
    expect(api.getImageUrl('poster.jpg')).toContain('image.tmdb.org');
  });

  it('getImageUrl retorna placeholder se path vazio', () => {
    expect(api.getImageUrl('')).toContain('sem-imagem.svg');
    expect(api.getImageUrl(null)).toContain('sem-imagem.svg');
    expect(api.getImageUrl(undefined)).toContain('sem-imagem.svg');
  });
});
