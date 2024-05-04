<script setup>
import tableBasic from "../../components/tables/table-basic.vue";
import { useRouter } from 'vue-router';
const $router = useRouter()

const columns = [
  { field: "id", label: "รายการสินค้า", width: "30%" },
  { field: "name", label: "หมายเลขคำสั่งซื้อ", width: "17%" },
  { field: "type", label: "ลูกค้า", width: "17%" },
  { field: "quantity", label: "ที่อยู่", width: "17%" },
  { field: "price", label: "เบอร์โทรศัพท์", width: "17%" },
  { field: "date", label: "ปริมาณ", width: "17%" },
  { field: "status", label: "สถานะ", width: "30%" },
];

const rows = [
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
    status: "เสร็จสิ้น",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
    status: "กําลังดําเนินการ",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
    status: "กําลังดําเนินการ",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
    status: "กําลังดําเนินการ",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
    status: "กําลังดําเนินการ",
  },
];
</script>
<template>
  <div class="flex justify-end pb-5">
    <button
      class="outline outline-2 outline-red-800 px-6 py-1 bg-red-100 rounded-full text-red-800"
    >
      <div class="flex w-40 justify-between items-center">
        <span class="text-sm text-thin">ค้นหา</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
              stroke="#A2422C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M20.9992 21L14.9492 14.95"
              stroke="#A2422C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </div>
    </button>
  </div>
  <div class="rounded-xl mb-10 overflow-auto">
    <tableBasic :columns="columns" :rows="rows" />
    <div class="flex justify-end py-5">
      <div class="join">
        <input
          class="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
          checked
        />
        <input
          class="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="2"
        />
        <input
          class="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="3"
        />
        <input
          class="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="4"
        />
      </div>
    </div>
  </div>
</template>


<style>
</style>