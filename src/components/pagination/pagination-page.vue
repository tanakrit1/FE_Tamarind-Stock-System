<script setup>
import { ref } from 'vue';

const totalPages = ref(20); // จำนวนหน้าทั้งหมด
const currentPage = ref(1); // หน้าปัจจุบัน
const pagesToShow = 3; // จำนวนหน้าที่จะแสดง

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const getPageRange = () => {
  const halfToShow = Math.floor(pagesToShow / 2);
  let start = currentPage.value - halfToShow;
  let end = currentPage.value + halfToShow;

  if (start < 1) {
    start = 1;
    end = Math.min(pagesToShow, totalPages.value);
  }

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, totalPages.value - pagesToShow + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

</script>

<template>
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
</template>
