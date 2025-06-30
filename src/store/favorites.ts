import { Module } from 'vuex';
import { Movie } from '@/types/movie';

export interface FavoritesState {
  favorites: Movie[];
}

const favoritesModule: Module<FavoritesState, any> = {
  namespaced: true,
  state: () => ({
    favorites: [],
  }),
  mutations: {
    setFavorites(state, favorites: Movie[]) {
      state.favorites = favorites;
    },
    addToFavorites(state, movie: Movie) {
      if (!state.favorites.find(fav => fav.id === movie.id)) {
        state.favorites.push(movie);
      }
    },
    removeFromFavorites(state, movieId: number) {
      state.favorites = state.favorites.filter(movie => movie.id !== movieId);
    },
  },
  actions: {
    loadFavorites({ commit }) {
      const savedFavorites = localStorage.getItem('movieFavorites');
      if (savedFavorites) {
        commit('setFavorites', JSON.parse(savedFavorites));
      }
    },
    saveFavorites({ state }) {
      localStorage.setItem('movieFavorites', JSON.stringify(state.favorites));
    },
    addToFavorites({ commit, dispatch }, movie: Movie) {
      commit('addToFavorites', movie);
      dispatch('saveFavorites');
    },
    removeFromFavorites({ commit, dispatch }, movieId: number) {
      commit('removeFromFavorites', movieId);
      dispatch('saveFavorites');
    },
  },
  getters: {
    favorites(state): Movie[] {
      return state.favorites;
    },
    isFavorite: (state) => (movieId: number) => {
      return state.favorites.some(movie => movie.id === movieId);
    },
  },
};

export default favoritesModule; 