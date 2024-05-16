
<script setup>
import { ref, computed, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['currentPage', 'totalPages']); // Total number of pages
// const currentPage = ref(props.currentPage);

const emit = defineEmits(['update:currentPage', 'update:totalPages']);

const localCurrentPage = ref(props.currentPage);

watch(() => props.currentPage, (newVal) => {
  localCurrentPage.value = newVal;
});

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    localCurrentPage.value = page;
    emit('update:currentPage', page);
  }
};

const nextPage = () => {
  if (localCurrentPage.value < props.totalPages) {
    localCurrentPage.value++;
    emit('update:currentPage', localCurrentPage.value);
  }
};

const prevPage = () => {
  if (localCurrentPage.value > 1) {
    localCurrentPage.value--;
    emit('update:currentPage', localCurrentPage.value);
  }
};

const pagesToShow = computed(() => {
  let pages = [];

  if (props.totalPages <= 4) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (localCurrentPage.value <= 3) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(props.totalPages);
    } else if (localCurrentPage.value > props.totalPages - 3) {
      pages.push('...');
      for (let i = props.totalPages - 3; i <= props.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = localCurrentPage.value - 2; i <= localCurrentPage.value + 2; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(props.totalPages);
    }
  }

  return pages;
});
</script>

<template>
  <nav aria-label="Pagination" class="flex items-center text-[#C2796A]">
    <a href="#" @click.prevent="prevPage" class="p-2 mr-4 rounded-full hover:bg-[#F6EFED]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </a>

    <template v-for="pageNumber in pagesToShow" :key="pageNumber">
      <span v-if="pageNumber === '...'">...</span>
      <a
        v-else
        href="#"
        @click.prevent="changePage(pageNumber)"
        class="px-4 py-2 rounded-full"
        :class="{ 'bg-[#A2422C] text-[#D9ADA1]': localCurrentPage === pageNumber, 'hover:bg-[#F6EFED]': localCurrentPage !== pageNumber }"
      >
        {{ pageNumber }}
      </a>
    </template>

    <a href="#" @click.prevent="nextPage" class="p-2 ml-4 rounded-full hover:bg-[#F6EFED]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </nav>
</template>
