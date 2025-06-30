import { describe, it, expect } from 'vitest';
import cartModule from './cart';

const { mutations, getters } = cartModule;

function getState(custom = {}) {
  return { items: [], ...custom };
}

describe('cart store', () => {
  it('adiciona item ao carrinho', () => {
    const state = getState();
    mutations.addToCart(state, { id: 1, title: 'Filme', price: 10 });
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('aumenta quantidade se item já existe', () => {
    const state = getState({
      items: [{ movie: { id: 1, title: 'Filme', price: 10 }, quantity: 1 }],
    });
    mutations.addToCart(state, { id: 1, title: 'Filme', price: 10 });
    expect(state.items[0].quantity).toBe(2);
  });

  it('remove item do carrinho', () => {
    const state = getState({
      items: [{ movie: { id: 1, title: 'Filme', price: 10 }, quantity: 1 }],
    });
    mutations.removeFromCart(state, 1);
    expect(state.items.length).toBe(0);
  });

  it('limpa o carrinho', () => {
    const state = getState({
      items: [{ movie: { id: 1, title: 'Filme', price: 10 }, quantity: 1 }],
    });
    mutations.clearCart(state);
    expect(state.items.length).toBe(0);
  });

  it('altera quantidade de um item', () => {
    const state = getState({
      items: [{ movie: { id: 1, title: 'Filme', price: 10 }, quantity: 1 }],
    });
    mutations.updateQuantity(state, { movieId: 1, quantity: 3 });
    expect(state.items[0].quantity).toBe(3);
  });

  it('não altera quantidade se item não existe', () => {
    const state = getState({ items: [] });
    mutations.updateQuantity(state, { movieId: 1, quantity: 3 });
    expect(state.items.length).toBe(0);
  });

  it('getter getTotalItems retorna total de itens', () => {
    const state = getState({
      items: [
        { movie: { id: 1, title: 'Filme', price: 10 }, quantity: 2 },
        { movie: { id: 2, title: 'Outro', price: 20 }, quantity: 1 },
      ],
    });
    expect(getters.getTotalItems(state)).toBe(3);
  });

  it('getter getTotalPrice retorna valor total', () => {
    const state = getState({
      items: [
        { movie: { id: 1, title: 'Filme', price: 10 }, quantity: 2 },
        { movie: { id: 2, title: 'Outro', price: 20 }, quantity: 1 },
      ],
    });
    expect(getters.getTotalPrice(state)).toBe(40);
  });
});
