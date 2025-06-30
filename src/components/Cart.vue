<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex">
    <div class="fixed inset-0 bg-black/50 z-40" @click="onClose"></div>
    <div class="ml-auto w-full max-w-md bg-card h-full overflow-hidden animate-slide-in-right z-50">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-6 border-b border-border">
          <h2 class="text-xl font-semibold">Carrinho de Compras</h2>
          <button class="btn-ghost w-10 h-10 flex items-center justify-center" @click="onClose">
            <span class="sr-only">Fechar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="loading"
          class="flex-1 flex items-center justify-center text-lg font-bold text-primary"
        >
          Finalizando
        </div>
        <div v-else class="flex-1 overflow-y-auto p-6">
          <div v-if="items.length === 0" class="text-center text-gray-400 mt-8">
            <p>Seu carrinho está vazio</p>
            <p class="text-sm mt-2">Adicione alguns filmes para começar!</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="item in items"
              :key="item.movie.id"
              class="flex space-x-4 bg-white/5 p-4 rounded-lg"
            >
              <img
                :src="getImageUrl(item.movie.poster_path)"
                :alt="item.movie.title"
                class="w-16 h-24 object-cover rounded"
              />
              <div class="flex-1">
                <h3 class="font-medium text-sm line-clamp-2">{{ item.movie.title }}</h3>
                <p class="text-primary font-semibold mt-1">
                  {{ formatPrice(item.movie.price || 19.99) }}
                </p>
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center space-x-2">
                    <button
                      class="btn-outline w-6 h-6 flex items-center justify-center"
                      @click="updateQuantity(item.movie.id, item.quantity - 1)"
                    >
                      <span class="sr-only">Diminuir</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span class="w-8 text-center text-sm">{{ item.quantity }}</span>
                    <button
                      class="btn-outline w-6 h-6 flex items-center justify-center"
                      @click="updateQuantity(item.movie.id, item.quantity + 1)"
                    >
                      <span class="sr-only">Aumentar</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    class="btn-ghost w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-300"
                    @click="removeFromCart(item.movie.id)"
                  >
                    <span class="sr-only">Remover</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="items.length > 0 && !loading" class="border-t border-border p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-semibold">Total:</span>
            <span class="text-xl font-bold text-primary">{{ formatPrice(totalPrice) }}</span>
          </div>
          <button class="w-full button-primary" @click="handleCheckout">Finalizar Compra</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/services/tmdbApi';
import type { CartItem } from '@/types/movie';

const props = defineProps<{ isOpen: boolean; onClose: () => void; loading?: boolean }>();
const store = useStore();
const router = useRouter();

const items = computed<CartItem[]>(() => store.getters['cart/items']);
const totalPrice = computed(() => store.getters['cart/getTotalPrice']);

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

function updateQuantity(movieId: number, quantity: number) {
  store.dispatch('cart/updateQuantity', { movieId, quantity });
}

function removeFromCart(movieId: number) {
  store.dispatch('cart/removeFromCart', movieId);
}

function handleCheckout() {
  props.onClose();
  router.push('/checkout');
}
</script>
