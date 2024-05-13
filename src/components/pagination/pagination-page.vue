<script setup>
import { ref } from 'vue';

const currentPage = ref(1);
const totalPages = ref(9); // Total number of pages

const changePage = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
<template>
  <nav aria-label="Pagination" class="flex items-center text-[#C2796A]">
    <a href="#" @click.prevent="prevPage" class="p-2 mr-4 rounded-full hover:bg-[#F6EFED]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
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
    </a>
    <template v-if="currentPage > 3">
      <a
        href="#"
        @click.prevent="changePage(1)"
        class="px-4 py-2 rounded-full"
        :class="{ 'bg-[#A2422C] text-[#D9ADA1]': currentPage === 1, 'hover:bg-[#F6EFED]': currentPage !== 1 }"
      >
        1
      </a>
      <span class="px-4 py-2">...</span>
    </template>
    <template v-for="pageNumber in Math.min(totalPages, currentPage + 4) - Math.max(1, currentPage - 3)" :key="pageNumber">
      <a
        href="#"
        @click.prevent="changePage(pageNumber)"
        class="px-4 py-2 rounded-full"
        :class="{ 'bg-[#A2422C] text-[#D9ADA1]': currentPage === pageNumber, 'hover:bg-[#F6EFED]': currentPage !== pageNumber }"
      >
        {{ pageNumber }}
      </a>
    </template>
    <template v-if="totalPages - currentPage > 4">
      <span class="px-4 py-2">...</span>
      <a
        href="#"
        @click.prevent="changePage(totalPages)"
        class="px-4 py-2 rounded-full"
        :class="{ 'bg-[#A2422C] text-[#D9ADA1]': currentPage === totalPages, 'hover:bg-[#F6EFED]': currentPage !== totalPages }"
      >
        {{ totalPages }}
      </a>
    </template>
    <a href="#" @click.prevent="nextPage" class="p-2 ml-4 rounded-full hover:bg-[#F6EFED]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  </nav>
</template>
<!-- <template>
  <nav aria-label="Pagination" class="flex items-center text-[#C2796A]">
    <a href="#" class="p-2 mr-4 rounded-full hover:bg-[#F6EFED]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
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
    </a>
    <a href="#" class="px-4 py-2 rounded-full bg-[#A2422C] text-[#D9ADA1] font-medium hover:bg-[#F6EFED]"> 1 </a> 
    <a
      href="#" class="px-4 py-2 rounded-full hover:bg-[#F6EFED]"
    >
      2
    </a>
    <a href="#" class="px-4 py-2 rounded-full hover:bg-[#F6EFED]"> 3 </a>
    <a href="#" class="px-4 py-2 rounded-full hover:bg-[#F6EFED]"> ... </a>
    <a href="#" class="px-4 py-2 rounded-full bg-[#D9ADA1] text-[#A2422C] hover:bg-[#F6EFED]"> 9 </a>
    <a href="#" class="p-2 ml-4 rounded-full hover:bg-[#F6EFED]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  </nav>
</template> -->
