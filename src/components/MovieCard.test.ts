import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieCard from './MovieCard.vue';
import { createStore } from 'vuex';

// @ts-ignore
// eslint-disable-next-line no-undef
type HTMLElement = Element & { focus(): void };

const movie = {
  id: 1,
  title: 'Filme Teste',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'Sinopse do filme',
  release_date: '2023-01-01',
  vote_average: 8.5,
  genre_ids: [1, 2],
  price: 19.99,
};

function makeStore(
  isFav = false,
  addToFavorites = vi.fn(),
  removeFromFavorites = vi.fn(),
  addToCart = vi.fn()
) {
  return createStore({
    modules: {
      favorites: {
        namespaced: true,
        getters: {
          isFavorite: () => () => isFav,
        },
        actions: {
          addToFavorites,
          removeFromFavorites,
        },
      },
      cart: {
        namespaced: true,
        actions: {
          addToCart,
        },
      },
    },
  });
}

describe('MovieCard', () => {
  it('renderiza corretamente com props mínimas', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain('Filme Teste');
    expect(wrapper.find('img').attributes('src')).toContain('/poster.jpg');
  });

  it('renderiza como favorito', () => {
    const store = makeStore(true);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    expect(wrapper.find('button.text-red-500').exists()).toBe(true);
  });

  it('chama action de favoritar ao clicar no botão de favorito', async () => {
    const addToFavorites = vi.fn();
    const store = makeStore(false, addToFavorites);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
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
      global: { plugins: [store] },
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
      global: { plugins: [store] },
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
      global: { plugins: [store] },
    });
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('renderiza corretamente com nota baixa', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie: { ...movie, vote_average: 3 } },
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain('Filme Teste');
  });

  it('preço deve ser lido por leitores de tela', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    const price = wrapper.find('span.text-lg.font-bold');
    expect(price.exists()).toBe(true);
    expect(price.attributes('tabindex')).toBe('0');
    expect(price.text()).toContain('R$');
    expect(price.text()).toContain('19,99');
  });

  it('card deve ter aria-label descritivo', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    const article = wrapper.find('article');
    expect(article.attributes('aria-label')).toContain('Cartão do filme');
    expect(article.attributes('aria-label')).toContain('Filme Teste');
  });

  it('deve ser possível navegar por tab entre os principais elementos', async () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      attachTo: document.body,
      global: { plugins: [store] },
    });
    const tabbables = wrapper.findAll('[tabindex="0"]');
    expect(tabbables.length).toBeGreaterThan(3); // título, gêneros, preço, etc
    // Simula navegação por tab
    tabbables.forEach((el) => {
      (el.element as HTMLElement).focus();
      expect(document.activeElement).toBe(el.element);
    });
    wrapper.unmount();
  });
});

describe('Acessibilidade MovieCard', () => {
  it('deve ser focável por teclado (tabindex)', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    const article = wrapper.find('article');
    expect(article.attributes('tabindex')).toBe('0');
  });

  it('imagem deve ter alt descritivo', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toContain('Capa do filme');
  });

  it('título deve ser focável e lido por leitores de tela', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    const h2 = wrapper.find('h2');
    expect(h2.exists()).toBe(true);
    expect(h2.attributes('tabindex')).toBe('0');
  });

  it('todos os gêneros devem ser focáveis', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie: { ...movie, genre_ids: [28, 12] } },
      global: { plugins: [store] },
    });
    const genres = wrapper.findAll('[aria-label="Gêneros"] span');
    expect(genres.length).toBeGreaterThan(0);
    genres.forEach((g) => expect(g.attributes('tabindex')).toBe('0'));
  });

  it('sinopse deve ser lida por leitores de tela', () => {
    const store = makeStore(false);
    const wrapper = mount(MovieCard, {
      props: { movie },
      global: { plugins: [store] },
    });
    const p = wrapper.find('p.text-gray-400');
    expect(p.exists()).toBe(true);
    expect(p.attributes('tabindex')).toBe('0');
  });
});
