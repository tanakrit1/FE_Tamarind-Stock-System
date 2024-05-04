<!-- <script setup>
import tabVersion1 from "../../components/tabs/tab-version1.vue";
import orderlist from "../report/order-list.vue";
import withdrawalList from "../report/withdrawal-list.vue";

//ต้องการทำ กดปุ่มที่ tabไหนส่งค่า tab นั้นไปทำอย่างไร
const tabs = [
  { label: "รายการสั่งซื้อ", component: orderlist },
  { label: "รายการเบิก", component: withdrawalList },
];
</script>
<template>
  <div class="flex md:justify-center">
    <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-5 space-y-2">
      <div class="flex justify-between">
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

          <span class="text-2xl font-bold text-red-800"
            >รายการสินค้านำออก</span
          >
        </div>
        
      </div>
      <div class="mt-6 pt-10">
        <tabVersion1 :tabs="tabs" />
      </div>
      
      
    </div>
  </div>
</template> -->
<script setup>
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
</script>
<template>
  <div class="flex md:justify-center">
    <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-5 space-y-2 px-6">
      <div class="flex justify-between space-y-5">
        <div class="flex items-center">
          <svg
            width="50"
            height="50"
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
                d="M1.28869 2.76279C1.41968 2.36983 1.84442 2.15746 2.23737 2.28845L2.50229 2.37675C2.51549 2.38115 2.52864 2.38554 2.54176 2.38991C3.16813 2.59867 3.69746 2.7751 4.11369 2.96873C4.55613 3.17456 4.94002 3.42965 5.23112 3.83352C5.52221 4.2374 5.64282 4.68226 5.69817 5.16708C5.75025 5.62318 5.75023 6.18114 5.7502 6.84139L5.7502 9.49996C5.7502 10.9354 5.7518 11.9365 5.85335 12.6918C5.952 13.4256 6.13245 13.8142 6.40921 14.091C6.68598 14.3677 7.07455 14.5482 7.80832 14.6468C8.56367 14.7484 9.56479 14.75 11.0002 14.75H18.0002C18.4144 14.75 18.7502 15.0857 18.7502 15.5C18.7502 15.9142 18.4144 16.25 18.0002 16.25H10.9453C9.57774 16.25 8.47542 16.25 7.60845 16.1334C6.70834 16.0124 5.95047 15.7535 5.34855 15.1516C4.74664 14.5497 4.48774 13.7918 4.36673 12.8917C4.25017 12.0247 4.25018 10.9224 4.2502 9.55484L4.2502 6.883C4.2502 6.17 4.24907 5.69823 4.20785 5.33722C4.16883 4.99538 4.10068 4.83049 4.01426 4.71059C3.92784 4.59069 3.79296 4.47389 3.481 4.32877C3.15155 4.17551 2.70435 4.02524 2.02794 3.79978L1.76303 3.71147C1.37008 3.58049 1.15771 3.15575 1.28869 2.76279Z"
                fill="#A2422C"
              ></path>
              <path
                opacity="0.5"
                d="M5.74512 6C5.75008 6.25912 5.75008 6.53957 5.75007 6.8414L5.75006 9.5C5.75006 10.9354 5.75166 11.9365 5.85321 12.6919C5.86803 12.8021 5.8847 12.9046 5.90326 13H16.0221C16.9815 13 17.4612 13 17.8369 12.7523C18.2126 12.5045 18.4016 12.0636 18.7795 11.1818L19.2081 10.1818C20.0176 8.29294 20.4223 7.34853 19.9777 6.67426C19.5331 6 18.5056 6 16.4507 6H5.74512Z"
                fill="#A2422C"
              ></path>
              <path
                d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                fill="#A2422C"
              ></path>
              <path
                d="M18 19.5001C18 18.6716 17.3284 18.0001 16.5 18.0001C15.6716 18.0001 15 18.6716 15 19.5001C15 20.3285 15.6716 21.0001 16.5 21.0001C17.3284 21.0001 18 20.3285 18 19.5001Z"
                fill="#A2422C"
              ></path>
            </g>
          </svg>

          <span class="text-2xl font-bold text-red-800"
            >บันทึกรายการสินค้านำออก (รับฝาก)</span
          >
        </div>
      </div>
      <div class="w-full bg-white rounded-xl py-5">
        <div class="px-6">
          <span class="text-lg font-semibold text-red-800"
            >รายละเอียดสินค้านำออก</span
          >
        </div>
        <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
        <div class="grid grid-cols-2 gap-4 px-6 mt-3">
          <div class="flex flex-col">
            <span class="text-red-800 font-semibold">ชื่อสินค้า</span>
            <input
              class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
              type="text"
            />
          </div>

          <div class="flex flex-col">
            <span class="text-red-800 font-semibold">วันที่ขอเบิกสินค้า</span>
            <input
              class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
              type="date"
            />
          </div>
          <div class="flex flex-col">
            <span class="text-red-800 font-semibold">ปริมาณสินค้าคงคลัง</span>
            <input
              class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
              type="text"
            />
          </div>

          <div class="flex flex-col">
            <span class="text-red-800 font-semibold">ปริมาณการเบิกสินค้า</span>
            <input
              class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
              type="text"
            />
          </div>
        </div>
      </div>
      <div class="w-full bg-white rounded-xl py-5">
        <div class="px-6">
          <span class="text-lg font-semibold text-red-800"
            >รายละเอียดการสั่งซื้อสินค้า</span
          >
        </div>
        <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
        <div class="grid grid-rows-2 grid-flow-col gap-4 px-6">
          <div class="col-span-2">
            <div class="flex flex-col my-3 space-y-2">
              <span class="text-red-800 font-semibold">ชื่อ - สกุล</span>
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex flex-col my-3 space-y-2">
              <span class="text-red-800 font-semibold">เบอร์โทร</span>
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>
          </div>
          <div class="row-span-2">
            <div class="flex flex-col my-3 space-y-2">
              <span class="text-red-800 font-semibold">ที่อยู่</span>
              <textarea
                class="outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3 py-2"
                rows="5"
                type="text"
              ></textarea>
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex flex-col my-3 space-y-2">
              <span class="text-red-800 font-semibold">จังหวัด</span>
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex flex-col my-3 space-y-2">
              <span class="text-red-800 font-semibold">รหัสไปรษณีย์</span>
              <input
                class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center py-10">
        <buttonPrimaryOutline label="บันทึกข้อมูล" />
      </div>
    </div>
  </div>
</template>