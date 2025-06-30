import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieCard from './MovieCard.vue';
import { createStore } from 'vuex';

const movie = {
  id: 1,
  title: 'Filme Teste',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'Sinopse do filme',
  release_date: '2023-01-01',
  vote_average: 8.5,
  genre_ids: [1, 2],
  price: 19.99
};

function makeStore(isFav = false, addToFavorites = vi.fn(), removeFromFavorites = vi.fn(), addToCart = vi.fn()) {
  return createStore({
    modules: {
      favorites: {
        namespaced: true,
        getters: {
          isFavorite: () => () => isFav,
        },
        actions: {
          addToFavorites,
          removeFromFavorites
        }
      },
      cart: {
        namespaced: true,
        actions: {
          addToCart
        }
      }
    }
  });
}

describe('MovieCard', () => {
  it('renderiza corretamente com props mínimas', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] }
    });
    expect(wrapper.text()).toContain('Filme Teste');
    expect(wrapper.find('img').attributes('src')).toContain('/poster.jpg');
  });

  it('renderiza como favorito', () => {
    const store = makeStore(true);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] }
    });
    expect(wrapper.find('button.text-red-500').exists()).toBe(true);
  });

  it('chama action de favoritar ao clicar no botão de favorito', async () => {
    const addToFavorites = vi.fn();
    const store = makeStore(false, addToFavorites);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] }
    });
    const btn = wrapper.find('button.w-8.h-8');
    expect(btn.exists()).toBe(true);
    await btn.trigger('click');
    expect(addToFavorites).toHaveBeenCalled();
  });

  it('chama action de desfavoritar ao clicar no botão de remover favorito', async () => {
    const removeFromFavorites = vi.fn();
    const store = makeStore(true, vi.fn(), removeFromFavorites);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] }
    });
    const btn = wrapper.find('button.text-red-500');
    expect(btn.exists()).toBe(true);
    await btn.trigger('click');
    expect(removeFromFavorites).toHaveBeenCalled();
  });

  it('chama action de adicionar ao carrinho ao clicar no botão', async () => {
    const addToCart = vi.fn();
    const store = makeStore(false, vi.fn(), vi.fn(), addToCart);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] }
    });
    const btn = wrapper.find('button.button-primary');
    expect(btn.exists()).toBe(true);
    await btn.trigger('click');
    expect(addToCart).toHaveBeenCalled();
  });

  it('renderiza corretamente sem poster', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie: { ...movie, poster_path: '' } },
      global: { plugins: [store] }
    });
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('renderiza corretamente com nota baixa', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie: { ...movie, vote_average: 3 } },
      global: { plugins: [store] }
    });
    expect(wrapper.text()).toContain('Filme Teste');
  });
}); 