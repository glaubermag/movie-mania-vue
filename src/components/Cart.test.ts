import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Cart from './Cart.vue';
import { createStore } from 'vuex';
import axe from 'axe-core';

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const cartItems = [
  {
    movie: { id: 1, title: 'Filme 1', poster_path: '/poster1.jpg', price: 10 },
    quantity: 2,
  },
  {
    movie: { id: 2, title: 'Filme 2', poster_path: '/poster2.jpg', price: 20 },
    quantity: 1,
  },
];

function makeStore(items = [], total = 0, removeFromCartMock = vi.fn()) {
  return createStore({
    modules: {
      cart: {
        namespaced: true,
        getters: {
          items: () => items,
          getTotalPrice: () => total,
        },
        actions: {
          removeFromCart: removeFromCartMock,
        },
      },
      favorites: {
        namespaced: true,
        getters: {
          isFavorite: () => () => false,
        },
      },
    },
  });
}

describe('Cart', () => {
  let props;
  beforeEach(() => {
    props = {
      isOpen: false,
      onClose: vi.fn(),
    };
  });

  it('renderiza o carrinho fechado', () => {
    const store = makeStore();
    const wrapper = mount(Cart, { props, global: { plugins: [store] } });
    expect(wrapper.find('.fixed.inset-0.z-50.flex').exists()).toBe(false);
  });

  it('renderiza o carrinho aberto', () => {
    const store = makeStore();
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true },
      global: { plugins: [store] },
    });
    expect(wrapper.find('.fixed.inset-0.z-50.flex').exists()).toBe(true);
  });

  it('exibe mensagem de carrinho vazio', () => {
    const store = makeStore();
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true },
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain('Seu carrinho está vazio');
  });

  it('renderiza itens do carrinho', () => {
    const store = makeStore(cartItems, 40);
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true },
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain('Filme 1');
    expect(wrapper.text()).toContain('Filme 2');
    expect(wrapper.text().replace(/\s/g, '')).toContain('Total:R$40,00');
  });

  it('chama action de remover ao clicar no botão de remover item', async () => {
    const removeFromCartMock = vi.fn();
    const store = makeStore(cartItems, 40, removeFromCartMock);
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true },
      global: { plugins: [store] },
    });
    await wrapper.findAll('button.btn-ghost.w-6.h-6')[0].trigger('click');
    expect(removeFromCartMock).toHaveBeenCalled();
  });

  it('chama onClose ao clicar no botão de fechar', async () => {
    const store = makeStore(cartItems, 40);
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true },
      global: { plugins: [store] },
    });
    await wrapper.find('button.btn-ghost.w-10.h-10').trigger('click');
    expect(props.onClose).toHaveBeenCalled();
  });

  it('exibe loading ao finalizar compra', () => {
    const store = makeStore(cartItems, 40);
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true, loading: true },
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain('Finalizando');
  });

  it('não possui violações básicas de acessibilidade (axe-core)', async () => {
    const store = makeStore(cartItems, 40);
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true },
      global: { plugins: [store] },
      attachTo: document.body,
    });
    const results = await axe.run(wrapper.element);
    expect(results.violations.length).toBe(0);
    wrapper.unmount();
  });

  it('deve ser possível navegar por tab entre os principais elementos', async () => {
    const store = makeStore(cartItems, 40);
    const wrapper = mount(Cart, {
      props: { ...props, isOpen: true },
      global: { plugins: [store] },
      attachTo: document.body,
    });
    const tabbables = wrapper.findAll('button, a, input, select, textarea, [tabindex="0"]');
    expect(tabbables.length).toBeGreaterThan(2);
    tabbables.forEach((el) => {
      (el.element as any).focus();
      expect(document.activeElement).toBe(el.element);
    });
    wrapper.unmount();
  });
});
