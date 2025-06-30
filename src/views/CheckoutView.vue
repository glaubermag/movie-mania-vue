<template>
  <div class="min-h-screen bg-cinema-gradient">
    <div
      v-if="items.length === 0 && !showSuccessModal"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-4">Carrinho Vazio</h1>
        <p class="text-gray-400 mb-6">Adicione alguns filmes ao carrinho para continuar</p>
        <button
          @click="goHome"
          class="button-primary px-6 py-3 font-bold flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar às Compras
        </button>
      </div>
    </div>
    <div v-else class="container mx-auto px-4 py-8">
      <div class="flex items-center mb-8">
        <button @click="goHome" class="mr-4 btn-ghost flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </button>
        <h1 class="text-3xl font-bold">Finalizar Compra</h1>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <CheckoutForm :totalPrice="totalPrice" @submit="handleFormSubmit" />
        </div>
        <div>
          <div
            class="card sticky top-4 bg-zinc-900/90 backdrop-blur-md border-2 border-orange-500/30 shadow-xl animate-fade-in transition-all duration-300"
          >
            <div class="card-header pb-2 border-b border-orange-500/20">
              <div class="card-title text-xl font-bold text-orange-400 tracking-wide">
                Resumo do Pedido
              </div>
            </div>
            <div class="card-content py-4">
              <div class="space-y-4">
                <div v-for="item in items" :key="item.movie.id" class="flex space-x-3 items-center">
                  <img
                    :src="getImageUrl(item.movie.poster_path)"
                    :alt="item.movie.title"
                    class="w-14 h-20 object-cover rounded shadow-md border border-white/10"
                  />
                  <div class="flex-1">
                    <h4 class="text-base font-semibold line-clamp-2 text-foreground">
                      {{ item.movie.title }}
                    </h4>
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-gray-400">Qtd: {{ item.quantity }}</span>
                      <span class="text-base font-bold text-orange-400">{{
                        formatPrice((item.movie.price || 19.99) * item.quantity)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-t border-primary/20 mt-6 pt-4">
                <div class="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span class="text-orange-400">{{ formatPrice(totalPrice) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SuccessModal
      :isOpen="showSuccessModal"
      :onClose="handleSuccessModalClose"
      :orderNumber="orderNumber"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CheckoutForm from '@/components/CheckoutForm.vue';
import SuccessModal from '@/components/SuccessModal.vue';
import { getImageUrl } from '@/services/tmdbApi';

const store = useStore();
const router = useRouter();

const items = computed(() => store.getters['cart/items']);
const totalPrice = computed(() => store.getters['cart/getTotalPrice']);

const showSuccessModal = ref(false);
const orderNumber = ref('');

function handleFormSubmit(/* formData: any */) {
  // Simular processamento da compra
  orderNumber.value = `CIN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  showSuccessModal.value = true;
  store.dispatch('cart/clearCart');
}

function handleSuccessModalClose() {
  showSuccessModal.value = false;
  router.push('/');
}

function goHome() {
  router.push('/');
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}
</script>
