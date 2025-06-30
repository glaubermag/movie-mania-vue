import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SuccessModal from './SuccessModal.vue';
import axe from 'axe-core';

describe('SuccessModal', () => {
  it('renderiza mensagem de sucesso', () => {
    const wrapper = mount(SuccessModal, {
      props: {
        isOpen: true,
        onClose: () => {},
        orderNumber: '12345',
      },
    });
    expect(wrapper.text()).toContain('Compra Realizada!');
    expect(wrapper.text()).toContain('12345');
  });

  it('não possui violações básicas de acessibilidade (axe-core)', async () => {
    const wrapper = mount(SuccessModal, {
      props: {
        isOpen: true,
        onClose: () => {},
        orderNumber: '12345',
      },
      attachTo: document.body,
    });
    const results = await axe.run(wrapper.element);
    expect(results.violations.length).toBe(0);
    wrapper.unmount();
  });
});
