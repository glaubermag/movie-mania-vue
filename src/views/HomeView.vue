<template>
  <div class="min-h-screen bg-cinema-gradient">
    <Header @search="handleSearch" />
    <main class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2">
          {{ searchQuery ? `Resultados para "${searchQuery}"` : 'Filmes Populares' }}
        </h2>
        <p class="text-gray-400">
          {{ searchQuery ? 'Encontramos os seguintes filmes' : 'Descubra os filmes mais assistidos' }}
        </p>
      </div>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="index in 10" :key="index" class="movie-card animate-pulse">
          <div class="w-full h-64 bg-gray-700 mb-4" />
          <div class="p-4">
            <div class="h-6 bg-gray-700 rounded mb-2" />
            <div class="h-4 bg-gray-700 rounded mb-3" />
            <div class="flex justify-between">
              <div class="h-4 bg-gray-700 rounded w-16" />
              <div class="h-4 bg-gray-700 rounded w-20" />
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <div v-if="movies.length === 0" class="text-center text-gray-400 mt-16">
          <p class="text-xl">Nenhum filme encontrado</p>
          <p class="mt-2">Tente buscar por outro termo</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div v-for="movie in movies" :key="movie.id" class="animate-fade-in">
            <MovieCard :movie="movie" />
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import MovieCard from '@/components/MovieCard.vue';
import { getPopularMovies, searchMovies } from '@/services/tmdbApi';
import type { Movie } from '@/types/movie';

const movies = ref<Movie[]>([]);
const loading = ref(true);
const searchQuery = ref('');

async function loadMovies() {
  try {
    loading.value = true;
    movies.value = await getPopularMovies();
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
  } finally {
    loading.value = false;
  }
}

async function handleSearch(query: string) {
  searchQuery.value = query;
  if (!query.trim()) {
    loadMovies();
    return;
  }
  try {
    loading.value = true;
    movies.value = await searchMovies(query);
  } catch (error) {
    console.error('Erro na busca:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadMovies();
});
</script> 