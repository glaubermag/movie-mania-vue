<template>
  <div>
    <header class="sticky top-0 z-50 w-full glass-effect">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              MovieMania
            </h1>
            <nav class="hidden md:flex space-x-6">
              <router-link to="/" class="text-foreground hover:text-primary transition-colors">
                Início
              </router-link>
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
            <button @click="toggleFavorites" class="relative text-white hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span v-if="favoriteMovies.length > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-glow">
                {{ favoriteMovies.length }}
              </span>
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
    <div v-if="showFavorites" class="fixed inset-0 z-50 flex items-start justify-end bg-black/30" @click.self="showFavorites = false">
      <div class="w-full max-w-md bg-zinc-900 rounded-lg shadow-xl mt-24 mr-8 p-6 relative overflow-y-auto max-h-[80vh] border border-zinc-800">
        <button @click="showFavorites = false" class="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl font-bold">&times;</button>
        <h2 class="text-xl font-bold text-white mb-4">Meus Favoritos</h2>
        <div v-if="favoriteMovies.length === 0" class="text-gray-400 text-center py-8">Nenhum filme favorito encontrado.</div>
        <div v-else class="space-y-4">
          <div v-for="movie in favoriteMovies" :key="movie.id" class="flex items-center gap-4 bg-zinc-800 rounded p-2 shadow border border-zinc-700">
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="w-16 h-24 object-cover rounded" />
            <div class="flex-1">
              <div class="font-semibold text-white">{{ movie.title }}</div>
              <div class="text-xs text-gray-300 line-clamp-2">{{ movie.overview }}</div>
            </div>
            <button @click="removeFavorite(movie.id)" class="ml-2 text-red-400 hover:text-red-600 transition" title="Remover dos favoritos">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Cart from './Cart.vue';
import { getImageUrl } from '@/services/tmdbApi';

const emit = defineEmits(['search']);
const searchQuery = ref('');
const isCartOpen = ref(false);
const showFavorites = ref(false);
const store = useStore();

const totalItems = computed(() => store.getters['cart/getTotalItems']);
const favoriteMovies = computed(() => store.getters['favorites/favorites'] || []);

function handleSearch() {
  emit('search', searchQuery.value);
}

function closeCart() {
  isCartOpen.value = false;
}

function toggleFavorites() {
  showFavorites.value = !showFavorites.value;
}

function removeFavorite(movieId) {
  store.dispatch('favorites/removeFromFavorites', movieId);
}
</script> 