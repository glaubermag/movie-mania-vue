import { createStore } from 'vuex';
import cartModule, { CartState } from './cart';
import favoritesModule, { FavoritesState } from './favorites';

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
