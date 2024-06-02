<script setup>
import { onMounted, ref } from "vue";
import tableBasic from "../../components/tables/table-basic.vue";
import paginationPage from "../../components/pagination/pagination-page.vue";
import _apiProduct from "../../api/master-products.js";
import _apiExport from "../../api/export-product.js";
import { useRouter } from "vue-router";
import ExcelJS from "exceljs";
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

const onChangePagination = (val) => {
  pagination.page = val;
};


const columns = [
  { field: "productName", label: "รหัส", width: "auto" },
  { field: "productName", label: "ชื่อสินค้า", width: "auto" },
  { field: "quantity", label: "ปริมาณสินค้า", width: "auto" },
  { field: "price", label: "ราคารวม", width: "auto" },
  { field: "typeAction", label: "ประเภทสินค้านำออก", width: "auto" },
  { field: "customerFirstName", label: "ชื่อ", width: "auto" },
  { field: "customerLastName", label: "สกุล", width: "auto" },
  { field: "customerAddress", label: "ที่อยู่", width: "auto" },
  { field: "customerSubDistrict", label: "ตำบล", width: "auto" },
  { field: "customerDistrict", label: "อำเภอ", width: "auto" },
  { field: "customerProvince", label: "จังหวัด", width: "auto" },
  { field: "customerZipCode", label: "ไปรษณีย์", width: "auto" },
];

const rows = ref([]);

let flattenedData = null;

// const currentDate = ref({
//   startDate: "",
//   endDate: "",
//   startPeriodDate: "",
//   endPeriodDate: "",
// });

const inputSearch = ref({
  in_productName: "",
  in_exportType: "",
  in_status: "",
  in_orderID: "",
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
      // setCurrentDate();

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
    }
  });
};

const onLoadTable = async () => {
  const body = {
    page: 1,
    limit: 10000,
    sortField: "id",
    sortType: "ASC",
    filterModel: {
      logicOperator: "and",
      items: [],
    },
  }

  await _apiExport.search(body, (response) => {
    if (response.statusCode === 200) {
      console.log("response --> ", response);
      if (response.data.length > 0) {
            console.log("response5555--> ", response);
            flattenedData = response.data.map((item) => ({
              specialID: item.product.specialID,
              productName: item.product.name,
              productPrice: item.product.price,
              quantity: item.quantity,
              price: item.price,
              exportDate: item.exportDate,
              priceDeposit: item.priceDeposit,
              typeAction: item.typeAction,
              customerFirstName: item.customer.firstName,
              customerLastName: item.customer.lastName,
              customerAddress: item.customer.address,
              customerSubDistrict: item.customer.subDistric,
              customerDistrict: item.customer.distric,
              customerProvince: item.customer.province,
              customerZipCode: item.customer.zipCode,
            }));
            rows.value = flattenedData;
            pagination.value.totalPage = response.metadata.totalPage;

          }
    }
  });
};

onMounted(async () => {
  await onShowProduct();
  onLoadTable();
});
const onExportExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet A");
  worksheet.getCell("A1").value = "ชื่อ";
  worksheet.getCell("B1").value = "สกุล";
  worksheet.getCell("A2").value = "XXXXXXXXXXXXXX";
  worksheet.getCell("B2").value = "AAAAAAAAAAAAAA";

  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Test.xlsx";
    a.click();
  });
};
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
              <span class="text-red-800 font-semibold">ชื่อสินค้า</span>
              <select
                v-model="inputSearch.in_productName"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              >
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
              <span class="text-red-800 font-semibold">รายการสินค้า</span>
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>

            <div class="flex flex-col">
              <span class="text-red-800 font-semibold"
                >หมายเลขคำสั่งซื้อ/เบิก</span
              >
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="text"
              />
            </div>

            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">ประเภทสินค้านำออก</span>
              <select
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
              >
                <option selected>ซื้อ-ขาย</option>
                <option>การแปรรูป</option>
                <option>ฝาก</option>
              </select>
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold"
                >วันที่สั่งซื้อ/เบิก</span
              >
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">สถานะ</span>
              <select
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
              >
                <option selected>ดำเนินการเสร็จสิ้น</option>
                <option>กำลังดำเนินการ</option>
                <option>ยกเลิก</option>
              </select>
            </div>
          </div>
          <div class="flex justify-center py-5 space-x-3">
            <button
              class="h-10 w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
            >
              ค้นหา
            </button>
            <button
              @click="onExportExcel"
              class="h-10 w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
            >
              รายงาน
            </button>
          </div>
        </div>
      </div>
      <div class="rounded-xl mb-10 overflow-auto">
        <tableBasic :columns="columns" :rows="rows" />
        <div class="flex justify-end py-5">
            <paginationPage
        v-model:currentPage="pagination.page"
        :totalPages="pagination.totalPage"
        :limit="pagination.limit"
        @update:currentPage="onChangePagination"
      />
        </div>
      </div>
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