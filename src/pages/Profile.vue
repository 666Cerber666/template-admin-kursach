<template>
  <Header />
  <div class="p-6 h-screen overflow-hidden">
    <div class="flex flex-col justify-center items-center mb-4 gap-4 h-4/5">
      <div class="relative w-3/5 rounded">
        <input
          type="text"
          v-model="searchQuery"
          @input="updateCursorPos"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
          placeholder="Поиск..."
          class="px-2 py-1 border border-gray-300 bg-inherit rounded-md rounded-l-none pr-8 w-full sm:w-full shadow-md transition-shadow transition-colors duration-300 focus:outline-none focus:border-gray-100 focus:bg-gray-100 focus:shadow-lg"
        />
        <svg xmlns="http://www.w3.org/2000/svg"
          class="absolute right-2 top-5 transform -translate-y-1/2 h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l5-5m0 0l-5-5m5 5H4"/>
        </svg>
      </div>
      <button @click="RouterGoToPageProduct" type="submit" class="flex w-1/4 justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Найти</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';

// Инициализация переменных
const searchQuery = ref('');
const isInputFocused = ref(false);
const cursorPosition = ref(2);
const router = useRouter();

// Метод для обновления позиции курсора
const updateCursorPos = (event) => {
  const input = event.target;
  const caretPos = input.selectionStart;
  const textToCaret = input.value.slice(0, caretPos);
  const span = document.createElement('span');
  span.style.visibility = 'hidden';
  span.style.position = 'absolute';
  span.style.whiteSpace = 'pre';
  span.textContent = textToCaret;
  document.body.appendChild(span);
  cursorPosition.value = span.offsetWidth;
  document.body.removeChild(span);
};

// Метод для перенаправления на страницу продукта
const RouterGoToPageProduct = () => {
  router.push({ name: 'Product', query: { search: searchQuery.value } });
};
</script>

<style scoped>
.cursor {
  position: absolute;
  height: 1.5em;
  width: 2px;
  background-color: black;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
