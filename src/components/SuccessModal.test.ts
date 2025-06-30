import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SuccessModal from './SuccessModal.vue';

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
}); 