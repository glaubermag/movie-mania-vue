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
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div v-for="movie in movies" :key="movie.id" class="animate-fade-in">
              <MovieCard :movie="movie" />
            </div>
          </div>
          <div class="flex justify-center items-center gap-1 mt-8 select-none">
            <button
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
              class="w-9 h-9 flex items-center justify-center rounded-full border border-primary bg-transparent text-primary font-bold shadow hover:bg-primary hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Página anterior"
            >
              <span class="text-xl">&#8249;</span>
            </button>
            <template v-for="page in paginationPages" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'w-9 h-9 flex items-center justify-center rounded-full border font-bold mx-0.5 transition',
                  page === currentPage
                    ? 'bg-primary text-zinc-900 border-primary shadow-lg cursor-default'
                    : 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white cursor-pointer',
                ]"
                :disabled="page === currentPage"
                :aria-current="page === currentPage ? 'page' : undefined"
              >
                {{ page }}
              </button>
              <span v-else class="w-7 h-9 flex items-center justify-center text-gray-400 text-lg mx-0.5">…</span>
            </template>
            <button
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
              class="w-9 h-9 flex items-center justify-center rounded-full border border-primary bg-transparent text-primary font-bold shadow hover:bg-primary hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Próxima página"
            >
              <span class="text-xl">&#8250;</span>
            </button>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Header from '@/components/Header.vue';
import MovieCard from '@/components/MovieCard.vue';
import { getPopularMovies, searchMovies } from '@/services/tmdbApi';
import type { Movie } from '@/types/movie';

const movies = ref<Movie[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);

async function loadMovies(page = 1) {
  try {
    loading.value = true;
    const result = await getPopularMovies(page);
    movies.value = result.movies;
    currentPage.value = result.page;
    totalPages.value = Math.min(result.totalPages, 500);
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
  } finally {
    loading.value = false;
  }
}

async function handleSearch(query: string, page = 1) {
  searchQuery.value = query;
  if (!query.trim()) {
    await loadMovies(page);
    return;
  }
  try {
    loading.value = true;
    const result = await searchMovies(query, page);
    movies.value = result.movies;
    currentPage.value = result.page;
    totalPages.value = Math.min(result.totalPages, 500);
  } catch (error) {
    console.error('Erro na busca:', error);
  } finally {
    loading.value = false;
  }
}

function goToPage(page: number) {
  if (searchQuery.value.trim()) {
    handleSearch(searchQuery.value, page);
  } else {
    loadMovies(page);
  }
}

const paginationPages = computed(() => {
  const pages = [];
  if (totalPages.value <= 5) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  } else {
    if (currentPage.value <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages.value);
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(1, '...', totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value);
    } else {
      pages.push(1, '...', currentPage.value - 1, currentPage.value, currentPage.value + 1, '...', totalPages.value);
    }
  }
  return pages;
});

onMounted(() => {
  loadMovies();
});
</script> 