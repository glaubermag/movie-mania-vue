<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black/50" @click="onClose" />
    <div class="relative bg-card p-8 rounded-lg max-w-md w-full mx-4 animate-fade-in">
      <button class="absolute top-4 right-4 btn-ghost w-10 h-10 flex items-center justify-center" @click="onClose">
        <span class="sr-only">Fechar</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Compra Realizada!</h2>
        <p class="text-gray-400 mb-6">Sua compra foi processada com sucesso.</p>
        <div class="bg-white/5 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400">Número do Pedido:</p>
          <p class="text-lg font-mono font-semibold text-primary">{{ orderNumber }}</p>
        </div>
        <p class="text-sm text-gray-400 mb-6">
          Você receberá um email com os detalhes da sua compra e instruções para download dos filmes.
        </p>
        <button class="w-full button-primary py-3 font-bold" @click="onClose">Continuar Comprando</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean; onClose: () => void; orderNumber: string }>();
</script> 