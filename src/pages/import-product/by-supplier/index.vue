<script setup>
import tableBasic from "../../../components/tables/table-basic.vue";
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
import _apiSupplierImport from "../../../api/supplier-import.js";
import { computed, onMounted, ref } from "vue";

const columns = [
  { field: "id", label: "รหัสสินค้า", width: "15%" },
  { field: "name", label: "ชื่อสินค้า", width: "17%" },
  { field: "type", label: "ประเภทสินค้า", width: "17%" },
  { field: "quantity", label: "ปริมาณ", width: "17%" },
  { field: "price", label: "ราคา", width: "17%" },
  { field: "date", label: "วันที่รับ", width: "17%" },
];

const rows = [
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
  },
  {
    id: "0000",
    name: "AAAAA",
    type: "BBBBB",
    quantity: "CCCCC",
    price: "DDDDD",
    date: "EEEEEE",
  },
];

const onSubmit = () => {
  console.log("***onSubmit***");
};

const products = ref([]);
const supplierDetail = ref([]);
const selectedSupplier = ref(null);
const selectedProductId = ref(null);
const newPrice = ref(null);

const onChangePhone = (event) => {
  const phoneNumber = event.target.value;

  // console.log(phoneNumber);

  // ตรวจสอบว่า supplierDetail เป็นอาร์เรย์หรือไม่
  if (Array.isArray(supplierDetail.value)) {
    // นี่คือการเข้าถึงค่าอาร์เรย์ที่อยู่ใน ref
    const filterData = supplierDetail.value.filter(
      (item) => item.phone == phoneNumber
    );
    console.log("data---->", filterData);
    const data = filterData[0];
    // console.log("-------------->",data.specialID);
    selectedSupplier.value = data;
  }
};
const onChangeIdProduct = (event) => {
  const productId = event.target.value;
  console.log(productId);

  const filterData = products.value.filter(
    (product) => product.specialID === productId
  );
  selectedProductId.value = filterData[0] || null; // กำหนดค่าใหม่หรือเป็น null ถ้าไม่พบข้อมูลที่ตรงกับค่าที่เลือก
};

const onChangePrice = (event) => {
  const inputPrice = parseFloat(event.target.value); // แปลงค่าใน input เป็นตัวเลข
  const productPrice = selectedProductId.value ? selectedProductId.value.price : 0; // ดึงราคาของสินค้าที่ถูกเลือก
  newPrice.value = productPrice !== 0 ? inputPrice * productPrice : null; // คำนวณค่าใหม่และเก็บไว้ในตัวแปร newPrice หรือเป็น null หากไม่มีสินค้าที่ถูกเลือก
};

const formattedNewPrice = computed(() => {
  return newPrice.value !== null ? newPrice.value.toFixed(2) : ''; // รูปแบบราคาให้เป็นทศนิยม 2 ตำแหน่ง
});

const onLoadData = async () => {
  const body = {
    page: 1,
    limit: 10,
  };
  await _apiSupplierImport.searchProduct(body, (response) => {
    if (response.statusCode === 200) {
      products.value = response.data;
      console.log("response --> ", products.value);
    }
  });

  await _apiSupplierImport.searchSupplier(body, (response) => {
    if (response.statusCode === 200) {
      supplierDetail.value = response.data;
      console.log("searchSupplier --> ", supplierDetail.value);
    }
  });
};

onMounted(async () => {
  await onLoadData();
});
</script>

<template>
  <div class="flex md:justify-center">
    <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-10 space-y-10">
      <div class="space-y-3">
        <div class="flex space-x-3">
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.995833 19.0804C1.41009 21.1629 3.14804 22.9008 6.6239 26.3766C10.0998 29.8525 11.8377 31.5906 13.9203 32.0048C14.8219 32.1842 15.75 32.1842 16.6515 32.0048C18.7342 31.5906 20.4721 29.8527 23.948 26.3766L28.057 22.2678C30.2972 20.0276 31.4172 18.9075 31.949 17.47C32.4806 16.0327 32.3592 14.4533 32.1163 11.2945L31.8328 7.6103C31.6132 4.75558 31.5034 3.32821 30.5878 2.4127C29.6724 1.49719 28.2449 1.38739 25.3903 1.16778L21.7061 0.884389C18.5473 0.641407 16.9679 0.519916 15.5305 1.05165C14.0931 1.58337 12.973 2.70348 10.7328 4.94365L6.6239 9.05258C3.14804 12.5285 1.41009 14.2664 0.995833 16.349C0.816493 17.2506 0.816493 18.1788 0.995833 19.0804ZM20.2357 12.7647C21.6025 14.1316 23.8185 14.1316 25.1854 12.7647C26.5522 11.3979 26.5522 9.18182 25.1854 7.81498C23.8185 6.44816 21.6025 6.44816 20.2357 7.81498C18.8688 9.18182 18.8688 11.3979 20.2357 12.7647Z"
              fill="#A2422C"
            />
          </svg>
          <span class="text-2xl font-bold text-red-800"
            >รับสินค้า (ผู้จัดจำหน่าย)</span
          >
        </div>
        <div class="w-full bg-white rounded-xl py-3">
          <div class="px-6">
            <span class="text-lg font-semibold text-red-800">ข้อมูลสินค้า</span>
          </div>
          <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
          <div class="px-12 flex flex-wrap pt-10">
            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">รหัสสินค้า</span>
              <select
                class="h-8 w-3/4 focus:outline-red-400 rounded bg-red-100 px-3"
                @change="onChangeIdProduct"
              >
                <option value="">------เลือก------</option>
                <option
                  v-for="product in products"
                  :key="product.specialID"
                  :value="product.specialID"
                >
                  {{ product.specialID }}
                </option>
              </select>
            </div>

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ชื่อสินค้า</span>
              <input
                disabled
                type="text"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                :value="selectedProductId ? selectedProductId.name : ''"
              />
            </div>

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ประเภทสินค้า</span>
              <input
                disabled
                type="text"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                :value="selectedProductId ? selectedProductId.type : ''"
              />
            </div>

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">รายละเอียด</span>
              <textarea
                class="w-3/4 focus:outline-red-400 rounded bg-red-100 px-3 py-2"
                rows="1"
                type="text"
              ></textarea>
              <!-- <input class="h-8 w-3/4   focus:outline-red-400 rounded bg-red-100 px-3" type="text"/> -->
            </div>

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold"
                >วันที่รับสินค้าเข้าคลัง</span
              >
              <input
                class="h-8 w-3/4 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
              />
            </div>

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ราคาต่อหน่วย</span>
              <input
                disabled
                type="text"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                :value="selectedProductId ? selectedProductId.price : ''"
              />
            </div>
            

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ปริมาณ</span>
              <input
                class="h-8 w-3/4 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
                v-model="inputPrice"
                @change="onChangePrice"
              />
            </div>
            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ราคา</span>
              <input
                disabled
                type="text"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                :value="formattedNewPrice"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full bg-white rounded-xl py-3">
        <div class="px-6">
          <span class="text-lg font-semibold text-red-800"
            >ข้อมูลผู้จัดจำหน่าย</span
          >
        </div>
        <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
        <div class="px-12 flex flex-wrap pt-10">
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">เบอร์โทร</label><br />
            <input
              type="text"
              placeholder="กรอกเบอร์โทรศัพท์ (10 หลัก)"
              pattern="[0-9]*"
              maxlength="10"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="phoneNumber"
              @change="onChangePhone"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">รหัสผู้จัดจำหน่าย</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.specialID : ''"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ชื่อ</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.firstName : ''"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">สกุล</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.lastName : ''"
            />
          </div>

          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ที่อยู่</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.address : ''"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">จังหวัด</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.province : ''"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">อำเภอ</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.distric : ''"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ตำบล</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.subDistric : ''"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">รหัสไปรษณีย์</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              :value="selectedSupplier ? selectedSupplier.zipCode : ''"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center my-6">
        <buttonPrimaryOutline label="บันทึกข้อมูล" @onClick="onSubmit" />
        <!-- <button type="button"
                            class="font-semibold px-8 py-2 outline outline-red-700 rounded-full text-red-800 hover:bg-red-100">บันทึกข้อมูล</button> -->
      </div>

      <div class="rounded-xl mb-10 overflow-auto">
        <tableBasic :columns="columns" :rows="rows" />
      </div>
    </div>
  </div>
</template>

<style></style>
