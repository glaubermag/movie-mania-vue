import { describe, it, expect } from 'vitest';
import { getImageUrl } from './tmdbApi';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Sem+Imagem';

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
}); 