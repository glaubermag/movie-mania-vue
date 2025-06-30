import { describe, it, expect } from 'vitest';
import favoritesModule from './favorites';

const { mutations, getters } = favoritesModule;

function getState(custom = {}) {
  return { favorites: [], ...custom };
}

describe('favorites store', () => {
  it('adiciona item aos favoritos', () => {
    const state = getState();
    mutations.addToFavorites(state, { id: 1, title: 'Filme' });
    expect(state.favorites.length).toBe(1);
  });

  it('não adiciona duplicado', () => {
    const state = getState({ favorites: [{ id: 1, title: 'Filme' }] });
    mutations.addToFavorites(state, { id: 1, title: 'Filme' });
    expect(state.favorites.length).toBe(1);
  });

  it('remove dos favoritos', () => {
    const state = getState({ favorites: [{ id: 1, title: 'Filme' }] });
    mutations.removeFromFavorites(state, 1);
    expect(state.favorites.length).toBe(0);
  });

  it('limpa favoritos', () => {
    const state = getState({ favorites: [{ id: 1, title: 'Filme' }] });
    mutations.clearFavorites(state);
    expect(state.favorites.length).toBe(0);
  });

  it('getter favorites retorna todos os favoritos', () => {
    const state = getState({
      favorites: [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
      ],
    });
    expect(getters.favorites(state)).toEqual([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
    ]);
  });

  it('getter isFavorite retorna true se item está nos favoritos', () => {
    const state = getState({ favorites: [{ id: 1, title: 'A' }] });
    expect(getters.isFavorite(state)(1)).toBe(true);
    expect(getters.isFavorite(state)(2)).toBe(false);
  });
});
