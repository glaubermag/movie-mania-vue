import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CheckoutForm from './CheckoutForm.vue';

describe('CheckoutForm', () => {
  it('renderiza campos obrigatórios', () => {
    const wrapper = mount(CheckoutForm, { props: { totalPrice: 100 } });
    expect(wrapper.html()).toContain('Email');
    expect(wrapper.html()).toContain('Telefone');
    expect(wrapper.html()).toContain('CPF');
  });

  it('envia o formulário com dados válidos', async () => {
    const onSuccess = vi.fn();
    const wrapper = mount(CheckoutForm, { props: { totalPrice: 100, onSuccess } });
    await wrapper.find('input#email').setValue('joao@email.com');
    await wrapper.find('input#phone').setValue('(11) 99999-9999');
    await wrapper.find('input#fullName').setValue('João da Silva');
    await wrapper.find('input#cpf').setValue('123.456.789-09');
    await wrapper.find('input#cep').setValue('12345-678');
    await wrapper.find('input#address').setValue('Rua Exemplo');
    await wrapper.find('input#number').setValue('123');
    await wrapper.find('input#complement').setValue('Apto 1');
    await wrapper.find('input#neighborhood').setValue('Centro');
    await wrapper.find('input#city').setValue('São Paulo');
    await wrapper.find('input#state').setValue('SP');
    await wrapper.find('input#cardNumber').setValue('1234 5678 1234 5678');
    await wrapper.find('input#cardName').setValue('JOAO DA SILVA');
    await wrapper.find('input#expiryDate').setValue('12/29');
    await wrapper.find('input#cvv').setValue('123');
    await wrapper.find('form').trigger('submit.prevent');
    expect(onSuccess).toHaveBeenCalled();
  });

  it('exibe erro se campos obrigatórios estiverem vazios', async () => {
    const wrapper = mount(CheckoutForm, { props: { totalPrice: 100 } });
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('é obrigatório');
  });

  it('valida CPF inválido', async () => {
    const wrapper = mount(CheckoutForm, { props: { totalPrice: 100 } });
    await wrapper.find('input#email').setValue('joao@email.com');
    await wrapper.find('input#phone').setValue('(11) 99999-9999');
    await wrapper.find('input#fullName').setValue('João da Silva');
    await wrapper.find('input#cpf').setValue('123');
    await wrapper.find('input#cep').setValue('12345-678');
    await wrapper.find('input#address').setValue('Rua Exemplo');
    await wrapper.find('input#number').setValue('123');
    await wrapper.find('input#complement').setValue('Apto 1');
    await wrapper.find('input#neighborhood').setValue('Centro');
    await wrapper.find('input#city').setValue('São Paulo');
    await wrapper.find('input#state').setValue('SP');
    await wrapper.find('input#cardNumber').setValue('1234 5678 1234 5678');
    await wrapper.find('input#cardName').setValue('JOAO DA SILVA');
    await wrapper.find('input#expiryDate').setValue('12/29');
    await wrapper.find('input#cvv').setValue('123');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('CPF deve ter 11 dígitos');
  });

  it('valida cartão inválido', async () => {
    const wrapper = mount(CheckoutForm, { props: { totalPrice: 100 } });
    await wrapper.find('input#cardNumber').setValue('1234');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('deve ter 16 dígitos');
  });

  it('aplica máscara de CPF', async () => {
    const wrapper = mount(CheckoutForm, { props: { totalPrice: 100 } });
    const input = wrapper.find('input#cpf');
    await input.setValue('12345678909');
    expect((input.element as HTMLInputElement).value).toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
  });

  it('aplica máscara de cartão', async () => {
    const wrapper = mount(CheckoutForm, { props: { totalPrice: 100 } });
    const input = wrapper.find('input#cardNumber');
    await input.setValue('4111111111111111');
    expect((input.element as HTMLInputElement).value).toMatch(/\d{4} \d{4} \d{4} \d{4}/);
  });

  it('reseta o formulário após sucesso', async () => {
    const onSuccess = vi.fn();
    const wrapper = mount(CheckoutForm, { props: { onSuccess, totalPrice: 100 } });
    await wrapper.find('input#email').setValue('joao@email.com');
    await wrapper.find('input#phone').setValue('(11) 99999-9999');
    await wrapper.find('input#fullName').setValue('João da Silva');
    await wrapper.find('input#cpf').setValue('123.456.789-09');
    await wrapper.find('input#cep').setValue('12345-678');
    await wrapper.find('input#address').setValue('Rua Exemplo');
    await wrapper.find('input#number').setValue('123');
    await wrapper.find('input#complement').setValue('Apto 1');
    await wrapper.find('input#neighborhood').setValue('Centro');
    await wrapper.find('input#city').setValue('São Paulo');
    await wrapper.find('input#state').setValue('SP');
    await wrapper.find('input#cardNumber').setValue('4111 1111 1111 1111');
    await wrapper.find('input#cardName').setValue('JOAO DA SILVA');
    await wrapper.find('input#expiryDate').setValue('12/30');
    await wrapper.find('input#cvv').setValue('123');
    await wrapper.find('form').trigger('submit.prevent');
    expect((wrapper.find('input#email').element as HTMLInputElement).value).toBe('');
  });
}); 