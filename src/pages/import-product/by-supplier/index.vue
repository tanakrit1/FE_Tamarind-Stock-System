<script setup>
import tableManage from "../../../components/tables/table-manage.vue";
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
import _apiSupplierImport from "../../../api/supplier-import.js";
import { computed, onMounted, ref, watch } from "vue";
import alert from "../../../components/alert/alert.vue";

const columns = [
  { field: "specialID", label: "รหัส", width: "10%" },
  { field: "productName", label: "ชื่อสินค้า", width: "20%" },
  { field: "typeAction", label: "ประเภทสินค้า", width: "10%" },
  { field: "productPrice", label: "ราคาสินค้า", width: "10%" },
  { field: "quantity", label: "ปริมาณสินค้า", width: "10%" },
  { field: "price", label: "ราคารวม", width: "10%" },
  { field: "supplierFirstName", label: "ชื่อ", width: "20%" },
  { field: "supplierLastName", label: "สกุล", width: "20%" },
  { field: "supplierAddress", label: "ที่อยู่", width: "25%" },
  { field: "supplierSubDistrict", label: "ตำบล", width: "20%" },
  { field: "supplierDistrict", label: "อำเภอ", width: "20%" },
  { field: "supplierProvince", label: "จังหวัด", width: "20%" },
  { field: "supplierZipCode", label: "ไปรษณีย์", width: "10%" },
];

const rows = ref([]);

const products = ref([]);
const suppliers = ref([]);
const formInputs = ref([]);
const in_quantity = ref("");
const in_priceTotal = ref("");
// const selectedSupplier = ref("");
const clearData = () => {
  formInputs.value = [];
};
const inputForm = ref({
  in_date: "",
  in_description: "",
});

const formAlert = ref({
  status: false,
  title: "",
  body: "",
});
const onCloseAlert = () => {
  formAlert.value.status = false;
};

const onLoadData = async () => {
  const body = {
    page: 1,
    limit: 10,
    filterModel: {
      logicOperator: "and",
      items: [],
    },
  };

  //จัดลำดับข้อมูลให้เท่ากันก่อนนำมาใช้งาน
  await _apiSupplierImport.searchSupplierImport(body, (response) => {
    if (response.statusCode === 200) {
      const flattenedData = response.data.map((item) => ({
        specialID: item.product.specialID,
        productName: item.product.name,
        typeAction: item.typeAction,
        productPrice: item.product.price,
        quantity: item.quantity,
        price: item.price,
        supplierFirstName: item.supplier.firstName,
        supplierLastName: item.supplier.lastName,
        supplierAddress: item.supplier.address,
        supplierSubDistrict: item.supplier.subDistric,
        supplierDistrict: item.supplier.distric,
        supplierProvince: item.supplier.province,
        supplierZipCode: item.supplier.zipCode,
      }));
      rows.value = flattenedData;
      console.log("response", rows.value);
    }
  });
};

const onShowProduct = async () => {
  const body = {
    page: 1,
    limit: 10,
  };

  await _apiSupplierImport.searchProduct(body, (response) => {
    if (response.statusCode === 200) {
      const productData = response.data;
      // console.log("response---->", productData);

      products.value = productData.map((product) => ({
        in_special_id: product.id,
        in_specialID: product.specialID,
        in_productName: product.name,
        in_productType: product.type,
        in_productPrice: product.price,
      }));

      console.log("response", products.value);
    }
  });
  await _apiSupplierImport.searchSupplier(body, (response) => {
    if (response.statusCode === 200) {
      const SupplierData = response.data;
      // console.log("SupplierData---->", SupplierData);

      suppliers.value = SupplierData.map((Supplier) => ({
        in_supplierID: Supplier.specialID,
        in_supplierFirstName: Supplier.firstName,
        in_supplierLastName: Supplier.lastName,
        in_supplierAddress: Supplier.address,
        in_supplierSubDistrict: Supplier.subDistric,
        in_supplierDistrict: Supplier.distric,
        in_supplierProvince: Supplier.province,
        in_supplierZipCode: Supplier.zipCode,
        in_supplierPhone: Supplier.phone,
      }));
      console.log("response---->", suppliers.value);
    } else {
      formAlert.value = {
        status: true,
        title: "เเจ้งเตือน",
        body: "ไม่พบรายชื่อลูกค้าในระบบ กรณาเพิ่มลูกค้าใหม่",
      };
    }
  });
};

onMounted(async () => {
  await onLoadData();
  await onShowProduct();
});

const selectedProductId = ref("");

function onChangeIdProduct() {
  const selectedProduct = computed(() => {
    // ตรวจสอบว่า products มีค่าหรือไม่ และทำการค้นหา selectedProductId จาก products
    if (products.value && selectedProductId.value) {
      return products.value.find(
        (product) => product.in_specialID === selectedProductId.value
      );
    }
  });
  const formInput = selectedProduct.value;

  formInputs.value = formInput;
  console.log("formInputs", formInputs.value);

  in_quantity.value = "";
  formattedNewPrice.value = "";
  in_priceTotal.value = "";
}
const onChangePhone = (event) => {
  const phoneNumber = event.target.value;
  console.log(phoneNumber);

  const filterData = suppliers.value.find(
    (item) => item.in_supplierPhone === phoneNumber
  );

  if (filterData) {
    formInputs.value = filterData;
    console.log("data---->", formInputs.value);
  } else {
    // ถ้าไม่มีข้อมูลที่ตรงกัน
    console.log("ไม่พบข้อมูล");
    formAlert.value = {
      status: true,
      title: "เเจ้งเตือน",
      body: "ไม่พบข้อมูลในระบบ",
    };
    clearData();
  }
};

const onChangePrice = (event) => {
  const in_quantity = parseFloat(event.target.value);
  if (in_quantity !== "") {
    in_priceTotal.value =
      parseFloat(in_quantity) * parseFloat(formInputs.value.in_productPrice);
  } else {
    in_priceTotal.value = "";
  }
};

const formattedNewPrice = computed(() => {
  return typeof in_priceTotal.value === "number"
    ? in_priceTotal.value.toFixed(2)
    : ""; // รูปแบบราคาให้เป็นทศนิยม 2 ตำแหน่ง
});

const onSubmit = () => {
  console.log("***onSubmit***");
  const body = {
    quantity: in_quantity.value,
    price: formattedNewPrice.value,
    typeAction: formInputs.value.in_productType,
    //  //--------product----------------//
    product_id: formInputs.value.in_special_id,
    //  //--------supplier---------------//
    firstName: formInputs.value.in_supplierFirstName,
    lastName: formInputs.value.in_supplierLastName,
    address: formInputs.value.in_supplierAddress,
    subDistric: formInputs.value.in_supplierSubDistrict,
    distric: formInputs.value.in_supplierDistrict,
    province: formInputs.value.in_supplierProvince,
    zipCode: formInputs.value.in_supplierZipCode,
    phone: formInputs.value.in_supplierPhone,
  };
  console.log(body);
};


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
                v-model="selectedProductId"
              >
                <option value="">------เลือก------</option>
                <option
                  v-for="product in products"
                  :key="product.in_specialID"
                  :value="product.in_specialID"
                >
                  {{ product.in_specialID }}
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
                v-model="formInputs.in_productName"
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
                v-model="formInputs.in_productType"
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
                v-model="inputForm.in_description"
                placeholder="รายละเอียดสินค้า"
              ></textarea>
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
                v-model="inputForm.in_date"
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
                v-model="formInputs.in_productPrice"
              />
            </div>

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ปริมาณ</span>
              <input
                class="h-8 w-3/4 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
                @change="onChangePrice"
                v-model="in_quantity"
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
                v-model="formattedNewPrice"
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
              v-model="suppliers.in_supplierPhone"
              @change="onChangePhone"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">รหัสผู้จัดจำหน่าย</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierID"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ชื่อ</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierFirstName"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">สกุล</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierLastName"
            />
          </div>

          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ที่อยู่</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierAddress"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">จังหวัด</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierProvince"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">อำเภอ</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierDistrict"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ตำบล</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierSubDistrict"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">รหัสไปรษณีย์</label><br />
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formInputs.in_supplierZipCode"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center my-6">
        <buttonPrimaryOutline label="บันทึกข้อมูล" @click="onSubmit" />
      </div>
    </div>
  </div>
  <div class="rounded-xl mb-10 overflow-auto mx-5">
    <tableManage :columns="columns" :rows="rows" />
  </div>
  <alert
    :titleMessage="formAlert.title"
    :bodyMessage="formAlert.body"
    :status="formAlert.status"
    @close-alert-modal="onCloseAlert"
  />
</template>

<style></style>
