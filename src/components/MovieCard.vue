<template>
  <div class="movie-card group h-full flex flex-col bg-white/5 rounded-xl shadow-lg overflow-hidden min-h-[420px] max-h-[420px]">
    <div class="relative">
      <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="w-full h-64 object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div class="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          class="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-black/60 hover:bg-black/80 transition text-white"
          :class="{ 'text-red-500': isFavorite }"
          @click="handleToggleFavorite"
        >
          <span class="sr-only">Favoritar</span>
          <svg v-if="isFavorite" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button class="w-full button-primary text-sm flex items-center justify-center" @click="handleAddToCart">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-1 justify-between">
      <h3 class="font-semibold text-lg mb-2 line-clamp-1">{{ movie.title }}</h3>
      <p class="text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">{{ movie.overview || ' ' }}</p>
      <div class="flex items-center justify-between mt-auto">
        <div class="flex items-center space-x-2">
          <div class="flex items-center">
            <span class="text-yellow-400 text-sm">★</span>
            <span class="text-sm text-gray-300 ml-1">{{ movie.vote_average.toFixed(1) }}</span>
          </div>
          <span class="text-gray-500 text-sm">{{ new Date(movie.release_date).getFullYear() }}</span>
        </div>
        <div class="text-right">
          <span class="text-lg font-bold text-primary">{{ formatPrice(movie.price || 19.99) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { getImageUrl } from '@/services/tmdbApi';
import type { Movie } from '@/types/movie';

const props = defineProps<{ movie: Movie }>();
const store = useStore();

const isFavorite = computed(() => store.getters['favorites/isFavorite'](props.movie.id));

function handleAddToCart() {
  store.dispatch('cart/addToCart', { ...props.movie, price: props.movie.price || 19.99 });
}

function handleToggleFavorite() {
  if (isFavorite.value) {
    store.dispatch('favorites/removeFromFavorites', props.movie.id);
  } else {
    store.dispatch('favorites/addToFavorites', props.movie);
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}
</script> 