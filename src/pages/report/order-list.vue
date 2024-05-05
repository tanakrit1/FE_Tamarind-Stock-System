<script setup>
import tableBasic from "../../components/tables/table-basic.vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const columns = [
  { field: "id", label: "หมายเลขคำสั่งซื้อ/เบิก", width: "auto" },
  { field: "name", label: "รายการสินค้า", width: "auto" },
  { field: "type", label: "ประเภทสินค้า", width: "auto" },
  { field: "customer", label: "ลูกค้า", width: "auto" },
  { field: "address", label: "ที่อยู่", width: "auto" },
  { field: "phone", label: "เบอร์โทรศัพท์", width: "auto" },
  { field: "quantity", label: "ปริมาณ", width: "auto" },
  { field: "date", label: "วันที่สั่งซื้อ/เบิก", width: "auto" },
  { field: "status", label: "สถานะ", width: "auto" },
];

const rows = [
  { 
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    customer: "CCCCC",
    address: "DDDDD",
    phone: "EEEEEE",
    quantity: "FFFFF",
    date: "GGGGG",
    status: "เสร็จสิ้น",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    customer: "CCCCC",
    address: "DDDDD",
    phone: "EEEEEE",
    quantity: "FFFFF",
    date: "GGGGG",
    status: "กําลังดําเนินการ",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    customer: "CCCCC",
    address: "DDDDD",
    phone: "EEEEEE",
    quantity: "FFFFF",
    date: "GGGGG",
    status: "กําลังดําเนินการ",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    customer: "CCCCC",
    address: "DDDDD",
    phone: "EEEEEE",
    quantity: "FFFFF",
    date: "GGGGG",
    status: "กําลังดําเนินการ",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    customer: "CCCCC",
    address: "DDDDD",
    phone: "EEEEEE",
    quantity: "FFFFF",
    date: "GGGGG", 
    status: "กําลังดําเนินการ",
  },
];
</script>
<template>
  <div class="flex md:justify-center">
    <div class="sm:w-1/1 md:w-4/5 flex flex-col mb-5 space-y-2">
      <div class="flex justify-start">
        <div class="flex">
          <svg
            width="33"
            height="33"
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9436 1.25H13.0564C14.8942 1.24998 16.3498 1.24997 17.489 1.40314C18.6614 1.56076 19.6104 1.89288 20.3588 2.64124C21.1071 3.38961 21.4392 4.33856 21.5969 5.51098C21.75 6.65019 21.75 8.10583 21.75 9.94359V14.0564C21.75 15.8942 21.75 17.3498 21.5969 18.489C21.4392 19.6614 21.1071 20.6104 20.3588 21.3588C19.6104 22.1071 18.6614 22.4392 17.489 22.5969C16.3498 22.75 14.8942 22.75 13.0564 22.75H10.9436C9.10583 22.75 7.65019 22.75 6.51098 22.5969C5.33856 22.4392 4.38961 22.1071 3.64124 21.3588C2.89288 20.6104 2.56076 19.6614 2.40314 18.489C2.24997 17.3498 2.24998 15.8942 2.25 14.0564V9.94358C2.24998 8.10582 2.24997 6.65019 2.40314 5.51098C2.56076 4.33856 2.89288 3.38961 3.64124 2.64124C4.38961 1.89288 5.33856 1.56076 6.51098 1.40314C7.65019 1.24997 9.10582 1.24998 10.9436 1.25ZM6.71085 2.88976C5.70476 3.02502 5.12511 3.27869 4.7019 3.7019C4.27869 4.12511 4.02502 4.70476 3.88976 5.71085C3.75159 6.73851 3.75 8.09318 3.75 10V14C3.75 15.9068 3.75159 17.2615 3.88976 18.2892C4.02502 19.2952 4.27869 19.8749 4.7019 20.2981C5.12511 20.7213 5.70476 20.975 6.71085 21.1102C7.73851 21.2484 9.09318 21.25 11 21.25H13C14.9068 21.25 16.2615 21.2484 17.2892 21.1102C18.2952 20.975 18.8749 20.7213 19.2981 20.2981C19.7213 19.8749 19.975 19.2952 20.1102 18.2892C20.2484 17.2615 20.25 15.9068 20.25 14V10C20.25 8.09318 20.2484 6.73851 20.1102 5.71085C19.975 4.70476 19.7213 4.12511 19.2981 3.7019C18.8749 3.27869 18.2952 3.02502 17.2892 2.88976C16.2615 2.75159 14.9068 2.75 13 2.75H11C9.09318 2.75 7.73851 2.75159 6.71085 2.88976ZM7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16Z"
                fill="#A2422C"
              ></path>
            </g>
          </svg>

          <span class="text-2xl font-bold text-red-800">รายการนำออกสินค้า</span>
        </div>
      </div>
      <div class="flex justify-center pb-5">
        <div class="w-full bg-white rounded-xl py-5">
          <div class="grid grid-cols-3 gap-4 px-6 mt-3">
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">รหัสสินค้า</span>
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">รายการสินค้า</span>
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>

            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">หมายเลขคำสั่งซื้อ/เบิก</span>
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>
            
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">ประเภทสินค้านำออก</span>
              <select
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
              >
                <option disabled selected>ผู้จัดจำหน่าย</option>
                <option>จากการฝาก</option>
              </select>
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold"
                >วันที่สั่งซื้อ/เบิก</span
              >
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">สถานะ</span>
              <select
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
              >
                <option disabled selected>ดำเนินการเสร็จสิ้น</option>
                <option>กำลังดำเนินการ</option>
                <option>ยกเลิก</option>
              </select>
            </div>
          </div>
          <div class="flex justify-center py-5">
            <button
              class="h-10 w-40 btn btn-outline btn-error btn-wide text-xl font-semibold"
            >
              ค้นหา
            </button>
          </div>
        </div>
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
    </div>
  </div>
</template>


<style>
</style>