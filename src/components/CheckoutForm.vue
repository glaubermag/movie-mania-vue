<template>
  <form @submit.prevent="handleSubmit" class="space-y-8 bg-white/10 backdrop-blur-md border-2 border-primary/30 shadow-xl rounded-xl p-8 animate-fade-in transition-all duration-300 max-w-2xl mx-auto">
    <div class="card bg-transparent shadow-none border-none">
      <div class="card-header mb-2">
        <div class="card-title text-2xl font-bold text-primary tracking-wide">Informações Pessoais</div>
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
              :class="['input-base', errors.email && 'input-error']"
            />
            <span v-if="errors.email" class="input-feedback">{{ errors.email }}</span>
          </div>
          <div>
            <label for="phone" class="block mb-1 font-semibold text-foreground">Telefone *</label>
            <input
              id="phone"
              type="text"
              v-model="formData.phone"
              @input="handleInputChange('phone', formData.phone)"
              placeholder="(99) 99999-9999"
              :class="['input-base', errors.phone && 'input-error']"
            />
            <span v-if="errors.phone" class="input-feedback">{{ errors.phone }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="fullName" class="block mb-1 font-semibold text-foreground">Nome completo *</label>
            <input
              id="fullName"
              type="text"
              v-model="formData.fullName"
              @input="handleInputChange('fullName', formData.fullName)"
              placeholder="Seu nome completo"
              :class="['input-base', errors.fullName && 'input-error']"
            />
            <span v-if="errors.fullName" class="input-feedback">{{ errors.fullName }}</span>
          </div>
          <div>
            <label for="cpf" class="block mb-1 font-semibold text-foreground">CPF *</label>
            <input
              id="cpf"
              type="text"
              v-model="formData.cpf"
              @input="handleInputChange('cpf', formData.cpf)"
              placeholder="000.000.000-00"
              :class="['input-base', errors.cpf && 'input-error']"
            />
            <span v-if="errors.cpf" class="input-feedback">{{ errors.cpf }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title text-xl font-bold text-primary">Endereço de Entrega</div>
      </div>
      <div class="card-content space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cep" class="block mb-1 font-semibold text-foreground">CEP *</label>
            <input
              id="cep"
              type="text"
              v-model="formData.cep"
              @input="handleInputChange('cep', formData.cep)"
              placeholder="00000-000"
              :class="['input-base', errors.cep && 'input-error']"
            />
            <span v-if="errors.cep" class="input-feedback">{{ errors.cep }}</span>
          </div>
          <div>
            <label for="address" class="block mb-1 font-semibold text-foreground">Endereço *</label>
            <input
              id="address"
              type="text"
              v-model="formData.address"
              @input="handleInputChange('address', formData.address)"
              placeholder="Rua, Avenida, etc."
              :class="['input-base', errors.address && 'input-error']"
            />
            <span v-if="errors.address" class="input-feedback">{{ errors.address }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="number" class="block mb-1 font-semibold text-foreground">Número *</label>
            <input
              id="number"
              type="text"
              v-model="formData.number"
              @input="handleInputChange('number', formData.number)"
              placeholder="Número"
              :class="['input-base', errors.number && 'input-error']"
            />
            <span v-if="errors.number" class="input-feedback">{{ errors.number }}</span>
          </div>
          <div>
            <label for="complement" class="block mb-1 font-semibold text-foreground">Complemento</label>
            <input
              id="complement"
              type="text"
              v-model="formData.complement"
              @input="handleInputChange('complement', formData.complement)"
              placeholder="Apto, bloco, etc."
              class="input-base"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="neighborhood" class="block mb-1 font-semibold text-foreground">Bairro *</label>
            <input
              id="neighborhood"
              type="text"
              v-model="formData.neighborhood"
              @input="handleInputChange('neighborhood', formData.neighborhood)"
              placeholder="Bairro"
              :class="['input-base', errors.neighborhood && 'input-error']"
            />
            <span v-if="errors.neighborhood" class="input-feedback">{{ errors.neighborhood }}</span>
          </div>
          <div>
            <label for="city" class="block mb-1 font-semibold text-foreground">Cidade *</label>
            <input
              id="city"
              type="text"
              v-model="formData.city"
              @input="handleInputChange('city', formData.city)"
              placeholder="Cidade"
              :class="['input-base', errors.city && 'input-error']"
            />
            <span v-if="errors.city" class="input-feedback">{{ errors.city }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="state" class="block mb-1 font-semibold text-foreground">Estado *</label>
            <input
              id="state"
              type="text"
              v-model="formData.state"
              @input="handleInputChange('state', formData.state)"
              placeholder="Estado"
              :class="['input-base', errors.state && 'input-error']"
            />
            <span v-if="errors.state" class="input-feedback">{{ errors.state }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title text-xl font-bold text-primary">Pagamento</div>
      </div>
      <div class="card-content space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cardNumber" class="block mb-1 font-semibold text-foreground">Número do cartão *</label>
            <input
              id="cardNumber"
              type="text"
              v-model="formData.cardNumber"
              @input="handleInputChange('cardNumber', formData.cardNumber)"
              placeholder="0000 0000 0000 0000"
              :class="['input-base', errors.cardNumber && 'input-error']"
            />
            <span v-if="errors.cardNumber" class="input-feedback">{{ errors.cardNumber }}</span>
          </div>
          <div>
            <label for="cardName" class="block mb-1 font-semibold text-foreground">Nome no cartão *</label>
            <input
              id="cardName"
              type="text"
              v-model="formData.cardName"
              @input="handleInputChange('cardName', formData.cardName)"
              placeholder="Nome impresso no cartão"
              :class="['input-base', errors.cardName && 'input-error']"
            />
            <span v-if="errors.cardName" class="input-feedback">{{ errors.cardName }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="expiryDate" class="block mb-1 font-semibold text-foreground">Validade *</label>
            <input
              id="expiryDate"
              type="text"
              v-model="formData.expiryDate"
              @input="handleInputChange('expiryDate', formData.expiryDate)"
              placeholder="MM/AA"
              :class="['input-base', errors.expiryDate && 'input-error']"
            />
            <span v-if="errors.expiryDate" class="input-feedback">{{ errors.expiryDate }}</span>
          </div>
          <div>
            <label for="cvv" class="block mb-1 font-semibold text-foreground">CVV *</label>
            <input
              id="cvv"
              type="text"
              v-model="formData.cvv"
              @input="handleInputChange('cvv', formData.cvv)"
              placeholder="CVV"
              :class="['input-base', errors.cvv && 'input-error']"
            />
            <span v-if="errors.cvv" class="input-feedback">{{ errors.cvv }}</span>
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

<style scoped>
.input-base {
  @apply bg-white/70 border border-gray-300 rounded-lg px-4 py-2 text-base text-foreground placeholder:text-gray-400 shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition w-full;
}
.input-error {
  @apply border-red-500 ring-2 ring-red-200;
}
.input-feedback {
  @apply text-red-500 text-xs mt-1 block;
}
</style> 