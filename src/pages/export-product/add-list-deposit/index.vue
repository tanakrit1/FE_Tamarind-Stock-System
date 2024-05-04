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