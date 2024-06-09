<script setup>
import { onMounted, ref, watch } from "vue";
import tableManage from "../../components/tables/table-manage.vue";
import { useRouter } from "vue-router";
import paginationPage from "../../components/pagination/pagination-page.vue";
import _apiProduct from "../../api/master-products.js";
import _apiStockReport from "../../api/stock-report.js";
import ExcelJS from "exceljs";
import alert from "../../components/alert/alert.vue";
import store from "../../store";

const $router = useRouter();

const columns = [
  { field: "specialID", label: "รหัส", width: "auto" },
  { field: "name", label: "ชื่อสินค้า", width: "auto" },
  {
    field: "import_ซื้อขาย_quantity",
    label: "ปริมาณการรับเข้าสินค้า",
    width: "auto",
  },
  {
    field: "export_ซื้อขาย_quantity",
    label: "ปริมาณการขายสินค้า",
    width: "auto",
  },
  {
    field: "export_แปรรูป_quantity",
    label: "ปริมาณสินค้าแปรรูป",
    width: "auto",
  },
  {
    field: "remaining_ซื้อขาย_แปรรูป",
    label: "ปริมาณสินค้าคงเหลือ",
    width: "auto",
  },
  {
    field: "remaining_ฝากเก็บ",
    label: "ปริมาณสินค้าฝากเก็บคงเหลือ",
    width: "auto",
  },
];
const pagination = ref({
  page: 1,
  limit: 10,
  totalPage: 0,
});

const formAlert = ref({
  status: false,
  title: "",
  body: "",
});

const inputSearch = ref({
  in_productName: "",
});

const onCloseAlert = () => {
  formAlert.value.status = false;
};

const rows = ref([]);
let flattenedData = null;
const showTable = ref(false);

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
    } else {
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: response.message,
      };
    }
  });
};
const onLoadTable = async () => {
  store.commit("setStatusLoading", true);
  const body = {
    page: pagination.value.page,
    limit: pagination.value.limit,
  };

  await _apiStockReport.searchStockReport(body, (response) => {
    if (response.statusCode === 200) {
      console.log("response2 --> ", response);
      showTable.value = true;
      flattenedData = response.data;
      rows.value = flattenedData;
      pagination.value.totalPage = response.metadata.totalPage;
    } else {
      showTable.value = false;
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: response.message,
      };
    }
  });
  store.commit("setStatusLoading", false);
};

const onChangePagination = (val) => {
  pagination.page = val;
  onLoadTable();
};
onMounted(async () => {
  store.commit("setStatusLoading", true);
  await onShowProduct();
  onLoadTable();
  store.commit("setStatusLoading", false);
});

const onExportExcel = () => {
  console.log("***onExportExcel***");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet A");

  worksheet.columns = [
    { header: "รหัส", key: "specialID", width: 20 },
    { header: "ชื่อสินค้า", key: "productName", width: 20 },
    {
      header: "ปริมาณการรับเข้าสินค้า",
      key: "import_ซื้อขาย_quantity",
      width: 20,
    },
    { header: "ปริมาณการขายสินค้า", key: "export_ซื้อขาย_quantity", width: 20 },
    { header: "ปริมาณสินค้าแปรรูป", key: "export_แปรรูป_quantity", width: 20 },
    {
      header: "ปริมาณสินค้าคงเหลือ",
      key: "remaining_ซื้อขาย_แปรรูป",
      width: 20,
    },
    {
      header: "ปริมาณสินค้าฝากเก็บคงเหลือ",
      key: "remaining_ฝากเก็บ",
      width: 20,
    },
  ];
  const headerRow = worksheet.getRow(1); // แถวหัวเริ่มที่ index 1

  // กำหนดสีพื้นหลังให้กับแต่ละ cell ในแถวหัว
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีที่คุณต้องการ
    };
  });

  flattenedData.forEach((item, index) => {
    worksheet.addRow({
      specialID: item.specialID,
      productName: item.name,
      import_ซื้อขาย_quantity: item.import_ซื้อขาย_quantity,
      export_ซื้อขาย_quantity: item.export_ซื้อขาย_quantity,
      export_แปรรูป_quantity: item.export_แปรรูป_quantity,
      remaining_ซื้อขาย_แปรรูป: item.remaining_ซื้อขาย_แปรรูป,
      remaining_ฝากเก็บ: item.remaining_ฝากเก็บ,
    });
  });
  // บันทึกไฟล์ Excel
  // สร้างไฟล์ Excel
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ExportedDataStock.xlsx";
    a.click();
  });
};
</script>

<template>
  <div class="flex flex-col justify-center">
    <div v-if="showTable" class="rounded-xl overflow-auto mx-5 space-y-5">
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

      <div class="flex justify-end space-x-3 mx-20">
        <button
          label="ค้นหา"
          @click="onExportExcel"
          class="h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 10c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172C21 4.343 21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828C18.657 22 16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172C3 19.657 3 17.771 3 14z"
              opacity=".5"
            />
            <path
              fill="currentColor"
              d="M16.519 16.501c.175-.136.334-.295.651-.612l3.957-3.958c.096-.095.052-.26-.075-.305a4.332 4.332 0 0 1-1.644-1.034a4.332 4.332 0 0 1-1.034-1.644c-.045-.127-.21-.171-.305-.075L14.11 12.83c-.317.317-.476.476-.612.651c-.161.207-.3.43-.412.666c-.095.2-.166.414-.308.84l-.184.55l-.292.875l-.273.82a.584.584 0 0 0 .738.738l.82-.273l.875-.292l.55-.184c.426-.142.64-.212.84-.308c.236-.113.46-.25.666-.412m5.849-5.809a2.163 2.163 0 1 0-3.06-3.059l-.126.128a.524.524 0 0 0-.148.465c.02.107.055.265.12.452c.13.375.376.867.839 1.33a3.5 3.5 0 0 0 1.33.839c.188.065.345.1.452.12a.525.525 0 0 0 .465-.148z"
            />
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M7.25 9A.75.75 0 0 1 8 8.25h6.5a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m0 4a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"
              clip-rule="evenodd"
            />
          </svg>
          รายงาน
        </button>
      </div>
      <div class="rounded-xl overflow-auto mx-15">
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