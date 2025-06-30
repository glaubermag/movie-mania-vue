<template>
  <div>
    <header class="sticky top-0 z-50 w-full glass-effect">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              CineShop
            </h1>
            <nav class="hidden md:flex space-x-6">
              <router-link to="/" class="text-foreground hover:text-primary transition-colors">
                Início
              </router-link>
              <a href="#" class="text-foreground hover:text-primary transition-colors">
                Filmes
              </a>
              <a href="#" class="text-foreground hover:text-primary transition-colors">
                Favoritos
              </a>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <form @submit.prevent="handleSearch" class="relative">
              <input
                type="text"
                placeholder="Buscar filmes..."
                v-model="searchQuery"
                class="w-64 pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded"
              />
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4-4m0 0A7 7 0 1 0 5 5a7 7 0 0 0 12 12z" /></svg>
            </form>
            <button class="relative text-white hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            <button @click="isCartOpen = true" class="relative text-white hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>
              <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-glow">
                {{ totalItems }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <Cart :isOpen="isCartOpen" :onClose="closeCart" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Cart from './Cart.vue';

const emit = defineEmits(['search']);
const searchQuery = ref('');
const isCartOpen = ref(false);
const store = useStore();

const totalItems = computed(() => store.getters['cart/getTotalItems']);

function handleSearch() {
  emit('search', searchQuery.value);
}

function closeCart() {
  isCartOpen.value = false;
}
</script> 