<template>
  <div
    class="movie-card group h-full flex flex-col bg-white/5 rounded-xl shadow-lg overflow-hidden min-h-[420px]"
  >
    <div class="relative">
      <img
        :src="getImageUrl(movie.poster_path)"
        :alt="movie.title"
        class="w-full h-64 object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div
        class="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button
          class="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-black/60 hover:bg-black/80 transition text-white"
          :class="{ 'text-red-500': isFavorite }"
          @click="handleToggleFavorite"
        >
          <span class="sr-only">Favoritar</span>
          <svg
            v-if="isFavorite"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button
          class="w-full button-primary text-sm flex items-center justify-center"
          @click="handleAddToCart"
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-1 justify-between">
      <h3 class="font-semibold text-lg mb-1 line-clamp-1 text-foreground">{{ movie.title }}</h3>
      <div class="flex flex-wrap gap-1 mb-2">
        <span v-for="genre in genreNames" :key="genre" class="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
          {{ genre }}
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-2">
        <span v-if="movie.original_title && movie.original_title !== movie.title" class="italic truncate max-w-[60%]" title="Título original">
          <svg class="inline w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          {{ movie.original_title }}
        </span>
        <span v-if="movie.original_language" class="flex items-center" title="Idioma original">
          <svg class="inline w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2" /></svg>
          <span class="uppercase">{{ movie.original_language }}</span>
        </span>
        <span v-if="movie.release_date" class="flex items-center" title="Ano de lançamento">
          <svg class="inline w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {{ new Date(movie.release_date).getFullYear() }}
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-2">
        <span class="flex items-center" title="Popularidade">
          <svg class="inline w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m4 4h1a2 2 0 002-2v-5a2 2 0 00-2-2h-1a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
          {{ movie.popularity?.toFixed(0) }}
        </span>
        <span class="flex items-center" title="Votos">
          <svg class="inline w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M17 8a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          {{ movie.vote_count }}
        </span>
        <span class="flex items-center" title="Nota média">
          <svg class="inline w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
          {{ movie.vote_average.toFixed(1) }}
        </span>
      </div>
      <div class="mb-3">
        <p class="text-gray-400 text-sm min-h-[40px]">
          <span v-if="!showFullOverview">{{ truncatedOverview }}<span v-if="isTruncated">... <button class='text-primary underline' @click="showFullOverview = true">ver mais</button></span></span>
          <span v-else>{{ movie.overview }} <button class='text-primary underline' @click="showFullOverview = false">ver menos</button></span>
        </p>
      </div>
      <div class="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <span class="text-lg font-bold text-primary">{{ formatPrice(movie.price || 19.99) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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

// Mapeamento de IDs de gêneros para nomes
const genreMap: Record<number, string> = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção Científica',
  10770: 'Cinema TV',
  53: 'Thriller',
  10752: 'Guerra',
  37: 'Faroeste',
};
const genreNames = computed(() => (props.movie.genre_ids || []).map(id => genreMap[id]).filter(Boolean));

// Sinopse truncada/expandida
const showFullOverview = ref(false);
const maxOverviewLength = 110;
const isTruncated = computed(() => (props.movie.overview || '').length > maxOverviewLength);
const truncatedOverview = computed(() =>
  isTruncated.value ? (props.movie.overview || '').slice(0, maxOverviewLength) : (props.movie.overview || '')
);
</script>
