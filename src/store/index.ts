import { createStore } from 'vuex';
import cartModule, { CartState } from './cart';
import favoritesModule, { FavoritesState } from './favorites';
import { describe, it, expect } from 'vitest';

export interface RootState {
  cart: CartState;
  favorites: FavoritesState;
}

const store = createStore<RootState>({
  modules: {
    cart: cartModule,
    favorites: favoritesModule,
  },
});

export default store;

describe('store/index', () => {
  it('deve exportar um store com módulos cart e favorites', () => {
    expect(store).toBeDefined();
    expect(store.state.cart).toBeDefined();
    expect(store.state.favorites).toBeDefined();
  });
}); 