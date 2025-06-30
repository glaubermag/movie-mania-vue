<template>
  <form @submit.prevent="handleSubmit" class="space-y-8 bg-white/10 backdrop-blur-md border-2 border-primary/30 shadow-xl rounded-xl p-8 animate-fade-in transition-all duration-300">
    <div class="card bg-transparent shadow-none border-none">
      <div class="card-header mb-2">
        <div class="card-title text-xl font-bold text-primary tracking-wide">Informações Pessoais</div>
      </div>
      <div class="card-content space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="email" class="block mb-1 font-semibold text-foreground">Email *</label>
            <input
              id="email"
              type="email"
              v-model="formData.email"
              @input="handleInputChange('email', formData.email)"
              placeholder="seu@email.com"
              :class="{ 'border-red-500': errors.email }"
              class="input bg-white/20 border border-white/20 rounded-lg px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/30 transition w-full text-foreground placeholder:text-gray-400"
            />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>
          <div>
            <label for="phone" class="block mb-1 font-semibold text-foreground">Telefone *</label>
            <input
              id="phone"
              type="text"
              v-model="formData.phone"
              @input="handleInputChange('phone', formData.phone)"
              placeholder="(99) 99999-9999"
              :class="{ 'border-red-500': errors.phone }"
              class="input bg-white/20 border border-white/20 rounded-lg px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/30 transition w-full text-foreground placeholder:text-gray-400"
            />
            <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="fullName">Nome completo *</label>
            <input
              id="fullName"
              type="text"
              v-model="formData.fullName"
              @input="handleInputChange('fullName', formData.fullName)"
              placeholder="Seu nome completo"
              :class="{ 'border-red-500': errors.fullName }"
              class="input"
            />
            <span v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</span>
          </div>
          <div>
            <label for="cpf">CPF *</label>
            <input
              id="cpf"
              type="text"
              v-model="formData.cpf"
              @input="handleInputChange('cpf', formData.cpf)"
              placeholder="000.000.000-00"
              :class="{ 'border-red-500': errors.cpf }"
              class="input"
            />
            <span v-if="errors.cpf" class="text-red-500 text-sm">{{ errors.cpf }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Endereço de Entrega</div>
      </div>
      <div class="card-content space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cep">CEP *</label>
            <input
              id="cep"
              type="text"
              v-model="formData.cep"
              @input="handleInputChange('cep', formData.cep)"
              placeholder="00000-000"
              :class="{ 'border-red-500': errors.cep }"
              class="input"
            />
            <span v-if="errors.cep" class="text-red-500 text-sm">{{ errors.cep }}</span>
          </div>
          <div>
            <label for="address">Endereço *</label>
            <input
              id="address"
              type="text"
              v-model="formData.address"
              @input="handleInputChange('address', formData.address)"
              placeholder="Rua, Avenida, etc."
              :class="{ 'border-red-500': errors.address }"
              class="input"
            />
            <span v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="number">Número *</label>
            <input
              id="number"
              type="text"
              v-model="formData.number"
              @input="handleInputChange('number', formData.number)"
              placeholder="Número"
              :class="{ 'border-red-500': errors.number }"
              class="input"
            />
            <span v-if="errors.number" class="text-red-500 text-sm">{{ errors.number }}</span>
          </div>
          <div>
            <label for="complement">Complemento</label>
            <input
              id="complement"
              type="text"
              v-model="formData.complement"
              @input="handleInputChange('complement', formData.complement)"
              placeholder="Apto, bloco, etc."
              class="input"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="neighborhood">Bairro *</label>
            <input
              id="neighborhood"
              type="text"
              v-model="formData.neighborhood"
              @input="handleInputChange('neighborhood', formData.neighborhood)"
              placeholder="Bairro"
              :class="{ 'border-red-500': errors.neighborhood }"
              class="input"
            />
            <span v-if="errors.neighborhood" class="text-red-500 text-sm">{{ errors.neighborhood }}</span>
          </div>
          <div>
            <label for="city">Cidade *</label>
            <input
              id="city"
              type="text"
              v-model="formData.city"
              @input="handleInputChange('city', formData.city)"
              placeholder="Cidade"
              :class="{ 'border-red-500': errors.city }"
              class="input"
            />
            <span v-if="errors.city" class="text-red-500 text-sm">{{ errors.city }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="state">Estado *</label>
            <input
              id="state"
              type="text"
              v-model="formData.state"
              @input="handleInputChange('state', formData.state)"
              placeholder="Estado"
              :class="{ 'border-red-500': errors.state }"
              class="input"
            />
            <span v-if="errors.state" class="text-red-500 text-sm">{{ errors.state }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Pagamento</div>
      </div>
      <div class="card-content space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cardNumber">Número do cartão *</label>
            <input
              id="cardNumber"
              type="text"
              v-model="formData.cardNumber"
              @input="handleInputChange('cardNumber', formData.cardNumber)"
              placeholder="0000 0000 0000 0000"
              :class="{ 'border-red-500': errors.cardNumber }"
              class="input"
            />
            <span v-if="errors.cardNumber" class="text-red-500 text-sm">{{ errors.cardNumber }}</span>
          </div>
          <div>
            <label for="cardName">Nome no cartão *</label>
            <input
              id="cardName"
              type="text"
              v-model="formData.cardName"
              @input="handleInputChange('cardName', formData.cardName)"
              placeholder="Nome impresso no cartão"
              :class="{ 'border-red-500': errors.cardName }"
              class="input"
            />
            <span v-if="errors.cardName" class="text-red-500 text-sm">{{ errors.cardName }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="expiryDate">Validade *</label>
            <input
              id="expiryDate"
              type="text"
              v-model="formData.expiryDate"
              @input="handleInputChange('expiryDate', formData.expiryDate)"
              placeholder="MM/AA"
              :class="{ 'border-red-500': errors.expiryDate }"
              class="input"
            />
            <span v-if="errors.expiryDate" class="text-red-500 text-sm">{{ errors.expiryDate }}</span>
          </div>
          <div>
            <label for="cvv">CVV *</label>
            <input
              id="cvv"
              type="text"
              v-model="formData.cvv"
              @input="handleInputChange('cvv', formData.cvv)"
              placeholder="CVV"
              :class="{ 'border-red-500': errors.cvv }"
              class="input"
            />
            <span v-if="errors.cvv" class="text-red-500 text-sm">{{ errors.cvv }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-10">
      <div class="text-xl font-bold text-primary">Total: {{ formatPrice(totalPrice) }}</div>
      <button type="submit" class="button-primary px-10 py-3 text-lg font-bold shadow-lg hover:scale-105 hover:shadow-red-500/40 transition">Finalizar Compra</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const emit = defineEmits(['submit']);
const props = defineProps<{ totalPrice: number }>();

const formData = reactive({
  email: '',
  phone: '',
  fullName: '',
  cpf: '',
  cep: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
});

const errors = reactive<Record<string, string>>({});

function formatCPF(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}
function formatCEP(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}
function formatPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}
function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1');
}
function formatExpiryDate(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})\d+?$/, '$1');
}
function formatCVV(value: string) {
  return value
    .replace(/\D/g, '')
    .substring(0, 4);
}
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function handleInputChange(field: string, value: string) {
  let formattedValue = value;
  switch (field) {
    case 'cpf':
      formattedValue = formatCPF(value);
      break;
    case 'cep':
      formattedValue = formatCEP(value);
      break;
    case 'phone':
      formattedValue = formatPhone(value);
      break;
    case 'cardNumber':
      formattedValue = formatCardNumber(value);
      break;
    case 'expiryDate':
      formattedValue = formatExpiryDate(value);
      break;
    case 'cvv':
      formattedValue = formatCVV(value);
      break;
    case 'email':
      formattedValue = value.toLowerCase().trim();
      break;
  }
  formData[field] = formattedValue;
  if (errors[field]) {
    errors[field] = '';
  }
}
function validateForm() {
  const newErrors: Record<string, string> = {};
  if (!formData.email) {
    newErrors.email = 'Email é obrigatório';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Email inválido';
  }
  if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
  if (!formData.fullName) newErrors.fullName = 'Nome completo é obrigatório';
  if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
  if (!formData.cep) newErrors.cep = 'CEP é obrigatório';
  if (!formData.address) newErrors.address = 'Endereço é obrigatório';
  if (!formData.number) newErrors.number = 'Número é obrigatório';
  if (!formData.neighborhood) newErrors.neighborhood = 'Bairro é obrigatório';
  if (!formData.city) newErrors.city = 'Cidade é obrigatória';
  if (!formData.state) newErrors.state = 'Estado é obrigatório';
  if (!formData.cardNumber) newErrors.cardNumber = 'Número do cartão é obrigatório';
  if (!formData.cardName) newErrors.cardName = 'Nome no cartão é obrigatório';
  if (!formData.expiryDate) newErrors.expiryDate = 'Data de validade é obrigatória';
  if (!formData.cvv) newErrors.cvv = 'CVV é obrigatório';
  if (formData.cpf && formData.cpf.replace(/\D/g, '').length !== 11) {
    newErrors.cpf = 'CPF deve ter 11 dígitos';
  }
  if (formData.cep && formData.cep.replace(/\D/g, '').length !== 8) {
    newErrors.cep = 'CEP deve ter 8 dígitos';
  }
  if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
    newErrors.phone = 'Telefone inválido';
  }
  if (formData.cardNumber && formData.cardNumber.replace(/\D/g, '').length !== 16) {
    newErrors.cardNumber = 'Número do cartão deve ter 16 dígitos';
  }
  if (formData.cvv && formData.cvv.length < 3) {
    newErrors.cvv = 'CVV deve ter pelo menos 3 dígitos';
  }
  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
}
function handleSubmit() {
  if (validateForm()) {
    emit('submit', { ...formData });
  }
}
function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}
</script> 