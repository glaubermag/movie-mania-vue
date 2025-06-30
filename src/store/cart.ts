import { Module } from 'vuex';
import { Movie, CartItem } from '@/types/movie';

export interface CartState {
  items: CartItem[];
}

const cartModule: Module<CartState, any> = {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  mutations: {
    setItems(state, items: CartItem[]) {
      state.items = items;
    },
    addToCart(state, movie: Movie) {
      const existingItem = state.items.find((item) => item.movie.id === movie.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const movieWithPrice = { ...movie, price: movie.price || 19.99 };
        state.items.push({ movie: movieWithPrice, quantity: 1 });
      }
    },
    removeFromCart(state, movieId: number) {
      state.items = state.items.filter((item) => item.movie.id !== movieId);
    },
    updateQuantity(state, { movieId, quantity }: { movieId: number; quantity: number }) {
      if (quantity === 0) {
        state.items = state.items.filter((item) => item.movie.id !== movieId);
        return;
      }
      const item = state.items.find((item) => item.movie.id === movieId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
  actions: {
    loadCart({ commit }) {
      const savedCart = localStorage.getItem('movieCart');
      if (savedCart) {
        commit('setItems', JSON.parse(savedCart));
      }
    },
    saveCart({ state }) {
      localStorage.setItem('movieCart', JSON.stringify(state.items));
    },
    addToCart({ commit, dispatch }, movie: Movie) {
      commit('addToCart', movie);
      dispatch('saveCart');
    },
    removeFromCart({ commit, dispatch }, movieId: number) {
      commit('removeFromCart', movieId);
      dispatch('saveCart');
    },
    updateQuantity({ commit, dispatch }, payload: { movieId: number; quantity: number }) {
      commit('updateQuantity', payload);
      dispatch('saveCart');
    },
    clearCart({ commit, dispatch }) {
      commit('clearCart');
      dispatch('saveCart');
    },
  },
  getters: {
    getTotalPrice(state): number {
      return state.items.reduce(
        (total, item) => total + (item.movie.price || 19.99) * item.quantity,
        0
      );
    },
    getTotalItems(state): number {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    items(state): CartItem[] {
      return state.items;
    },
  },
};

export default cartModule;
