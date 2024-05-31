<script setup>
import { onMounted, ref, watch } from "vue";
import tableManage from "../../components/tables/table-manage.vue";
import { useRouter } from "vue-router";
import paginationPage from "../../components/pagination/pagination-page.vue";
import _apiSupplierImport from "../../api/supplier-import.js";
import _apiProduct from "../../api/master-products.js";
import ExcelJS from "exceljs";
import alert from "../../components/alert/alert.vue";
import store from "../../store";

const $router = useRouter();

const pagination = ref({
  page: 1,
  limit: 5,
  totalPage: 0,
});

const formAlert = ref({
  status: false,
  title: "",
  body: "",
});
const onCloseAlert = () => {
  formAlert.value.status = false;
};


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
let flattenedData = null;
const currentDateStart = ref("");
const currentDateEnd = ref("");
const inputSearch = ref({
  in_productName: "",
  in_productType: "",
});
const onShowProduct = async () => {
  const body = {
    page: 1,
    limit: 10000,
    sortField: "id",
    sortType: "ASC",
    filterModel: {
      logicOperator: "and",
      items: [],
    },
  };
  await _apiProduct.search(body, (response) => {
    if (response.statusCode === 200) {
      console.log("response --> ", response);
      setCurrentDate();

      inputSearch.value = response.data.map((item) => {
        return {
          id: item.id,
          specialID: item.specialID,
          productName: item.name,
          typeAction: item.type,
          productPrice: item.price,
          quantity: item.quantity,
        };
      });
    }else{
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: response.message,
      };
    }
  });
};

const onChangePagination = (val) => {
  pagination.page = val;
};

const onSubmit = async () => {
  console.log("***onSubmit***");

  const body = {
    page: pagination.value.page,
    limit: pagination.value.limit,
    sortField: "id",
    sortType: "ASC",
    filterModel: {
      logicOperator: "and",
      items: [
        {
          field: "product_name",
          operator: "equals",
          value: inputSearch.value.in_productName,
        },
        {
          field: "typeAction",
          operator: "equals",
          value: inputSearch.value.in_productType,
        },
        {
          field: "importDate",
          operator: "between",
          value: [currentDateStart.value, currentDateEnd.value], // ช่วงวันที่เริ่มต้นและสิ้นสุด
        },
      ],
    },
  };
  console.log("****body****", body);

  await _apiSupplierImport.searchSupplierImport(body, (response) => {
    if (response.statusCode === 200) {
      if (response.data.length > 0) {
      console.log("response5555--> ", response);
      flattenedData = response.data.map((item) => ({
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

      pagination.value.totalPage = response.metadata.totalPage;
    }else{
      formAlert.value = {
        status: true,
        title: "แจ้งเตือน",
        body: "ไม่พบข้อมูล",
      };

    }
    }else{
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: response.message,
      };
    }
  });
};

const onExportExcel = () => {
  console.log("***onExportExcel***");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet A');

  // เพิ่มหัวข้อคอลัมน์ใน Excel spreadsheet
  worksheet.columns = [
    { header: 'Special ID', key: 'specialID', width: 15 },
    { header: 'Product Name', key: 'productName', width: 30 },
    { header: 'Type of Action', key: 'typeAction', width: 20 },
    { header: 'Product Price', key: 'productPrice', width: 15 },
    { header: 'Quantity', key: 'quantity', width: 15 },
    { header: 'Price', key: 'price', width: 15 },
    { header: 'Supplier First Name', key: 'supplierFirstName', width: 20 },
    { header: 'Supplier Last Name', key: 'supplierLastName', width: 20 },
    { header: 'Supplier Address', key: 'supplierAddress', width: 30 },
    { header: 'Supplier SubDistrict', key: 'supplierSubDistrict', width: 20 },
    { header: 'Supplier District', key: 'supplierDistrict', width: 20 },
    { header: 'Supplier Province', key: 'supplierProvince', width: 20 },
    { header: 'Supplier Zip Code', key: 'supplierZipCode', width: 15 }
  ];

  // เพิ่มข้อมูลลงในแถวของ Excel spreadsheet
  flattenedData.forEach((item, index) => {
    worksheet.addRow({
      specialID: item.specialID,
      productName: item.productName,
      typeAction: item.typeAction,
      productPrice: item.productPrice,
      quantity: item.quantity,
      price: item.price,
      supplierFirstName: item.supplierFirstName,
      supplierLastName: item.supplierLastName,
      supplierAddress: item.supplierAddress,
      supplierSubDistrict: item.supplierSubDistrict,
      supplierDistrict: item.supplierDistrict,
      supplierProvince: item.supplierProvince,
      supplierZipCode: item.supplierZipCode
    });
  });

  // สร้างไฟล์ Excel
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ExportedData.xlsx';
    a.click();
  });
};
onMounted(async () => {
  store.commit("setStatusLoading", true);
  // await onLoadData();
  onShowProduct();
  store.commit("setStatusLoading", false);
});
const clearData = () => {
  inputSearch.value = {
    in_productType: "",
    in_productName: "",
  };
  currentDateStart.value = "";
  currentDateEnd.value = "";
 rows.value = [];
  onShowProduct();
}
function setCurrentDate() {
  const today = new Date().toISOString().substr(0, 10);
  currentDateStart.value = today;
  currentDateEnd.value = today;
}

watch([currentDateStart, currentDateEnd], ([start, end]) => {
  if (start && end) {
    if (start > end) {
      // วันที่เริ่มต้นต้องไม่มากกว่าวันที่สิ้นสุด
      currentDateStart.value = '';
      currentDateEnd.value = '';
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: 'วันที่เริ่มต้นต้องไม่มากกว่าวันที่สิ้นสุด',
      };
    }
  }
});
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

          <span class="text-2xl font-bold text-red-800"
            >รายการนำเข้าสินค้า</span
          >
        </div>
      </div>
      <div class="flex justify-center pb-5">
        <div class="w-full bg-white rounded-xl py-5">
          <div class="grid grid-cols-2 gap-4 px-6 mt-3">
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">ชื่อสินค้า</span>
              <!-- <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              /> -->
              <select
                v-model="inputSearch.in_productName"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              >
                <option value="" selected>------เลือก------</option>
                <option
                  v-for="(item, index) in inputSearch"
                  :key="index"
                  :value="item.productName"
                >
                  {{ item.productName }}
                </option>
              </select>
            </div>

            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">ประเภทนำเข้าสินค้า</span>
              <select
                v-model="inputSearch.in_productType"
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
              >
                <option selected value="ซื้อ-ขาย">ซื้อ-ขาย</option>
                <option value="ฝาก">ฝาก</option>
              </select>
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">วันที่เริ่มต้น</span>
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
                v-model="currentDateStart"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">วันที่สิ้นสุด</span>
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
                v-model="currentDateEnd"
              />
            </div>
          </div>
          <div class="flex justify-center py-5 space-x-3">
            <button
              label="ค้นหา"
              @click="onSubmit"
              class="h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
            >
              ค้นหา
            </button>
            <button
              @click="clearData"
              class="h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
            >
              ยกเลิก
            </button>
            <button
              @click="onExportExcel"
              class="h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
            >
              รายงาน
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rounded-xl mb-10 overflow-auto mx-5">
    <tableManage :columns="columns" :rows="rows" />
    <div class="flex justify-end py-5">
      <paginationPage
        v-model:currentPage="pagination.page"
        :totalPages="pagination.totalPage"
        :limit="pagination.limit"
        @update:currentPage="onChangePagination"
      />
    </div>
  </div>
  <alert
    :titleMessage="formAlert.title"
    :bodyMessage="formAlert.body"
    :status="formAlert.status"
    @close-alert-modal="onCloseAlert"
  />
</template>

<style></style>
