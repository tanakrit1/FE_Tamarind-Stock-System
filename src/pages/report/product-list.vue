<script setup>
import { onMounted, ref, watch } from "vue";
import tableManage from "../../components/tables/table-manage.vue";
import { useRouter } from "vue-router";
import paginationPage from "../../components/pagination/pagination-page.vue";
import _apiSupplierImport from "../../api/supplier-import.js";
import _apiDepositImport from "../../api/deposit-import.js";
import _apiProduct from "../../api/master-products.js";
import ExcelJS from "exceljs";
import alert from "../../components/alert/alert.vue";
import store from "../../store";

const $router = useRouter();

const pagination = ref({
  page: 1,
  limit: 10,
  totalPage: 0,
});
const onChangePagination = (val) => {
  pagination.page = val;
  onSubmit();
};

const formAlert = ref({
  status: false,
  title: "",
  body: "",
});
const onCloseAlert = () => {
  formAlert.value.status = false;
};

const columnsSupplier = [
  { field: "specialID", label: "รหัส", width: "auto" },
  { field: "productName", label: "ชื่อสินค้า", width: "auto" },
  { field: "typeAction", label: "ประเภทสินค้า", width: "auto" },
  { field: "productPrice", label: "ราคาสินค้า", width: "auto" },
  { field: "quantity", label: "ปริมาณสินค้า", width: "auto" },
  { field: "price", label: "รวมทั้งสิ้น", width: "auto" },
  { field: "supplierFirstName", label: "ชื่อ", width: "auto" },
  { field: "supplierLastName", label: "สกุล", width: "auto" },
  { field: "supplierPhone", label: "เบอร์โทร", width: "auto" },
  { field: "supplierAddress", label: "ที่อยู่", width: "auto" },
  { field: "supplierSubDistrict", label: "ตำบล", width: "auto" },
  { field: "supplierDistrict", label: "อำเภอ", width: "auto" },
  { field: "supplierProvince", label: "จังหวัด", width: "auto" },
  { field: "supplierZipCode", label: "ไปรษณีย์", width: "auto" },
];

const columnsDeposit = [
  { field: "specialID", label: "รหัส", width: "auto" },
  { field: "productName", label: "ชื่อสินค้า", width: "auto" },
  //   { field: "typeAction", label: "ประเภทสินค้า", width: "auto" },
  { field: "productPrice", label: "ราคาสินค้า", width: "auto" },
  { field: "quantity", label: "ปริมาณสินค้า", width: "auto" },
  { field: "remain", label: "จํานวนคงเหลือ", width: "auto" },
  { field: "price", label: "รวมทั้งสิ้น", width: "auto" },
  { field: "periodDate", label: "วันที่สิ้นสุดการฝาก", width: "auto" },
  { field: "supplierFirstName", label: "ชื่อ", width: "auto" },
  { field: "supplierLastName", label: "สกุล", width: "auto" },
  { field: "supplierPhone", label: "เบอร์โทร", width: "auto" },
  { field: "supplierAddress", label: "ที่อยู่", width: "auto" },
  { field: "supplierSubDistrict", label: "ตำบล", width: "auto" },
  { field: "supplierDistrict", label: "อำเภอ", width: "auto" },
  { field: "supplierProvince", label: "จังหวัด", width: "auto" },
  { field: "supplierZipCode", label: "ไปรษณีย์", width: "auto" },
];

const rows = ref([]);
let flattenedData = null;
let dataExport = null;
const showTable = ref(false);
const fromDepositActive = ref(false);
const exportToExcelActive = ref(false);
let formattedMessages;

const currentDate = ref({
  startDate: "",
  endDate: "",
  startPeriodDate: "",
  endPeriodDate: "",
});

const inputSearch = ref({
  in_productName: "ทั้งหมด",
});

const selectSearch = ref({
  in_productType: "ซื้อ-ขาย",
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
  console.log("in_productType", selectSearch.value.in_productType);
  console.log("in_productName", inputSearch.value.in_productName);
  console.log("startDate", currentDate.value.startDate);
  console.log("endDate", currentDate.value.endDate);
  console.log("startPeriodDate", currentDate.value.startPeriodDate);
  console.log("endPeriodDate", currentDate.value.endPeriodDate);
  console.log("fromDepositActive", fromDepositActive.value);
  if (fromDepositActive.value == true) {
    if (
      currentDate.value.startDate == "" &&
      currentDate.value.endDate == "" &&
      currentDate.value.startPeriodDate == "" &&
      currentDate.value.endPeriodDate == "" &&
      inputSearch.value.in_productName == "ทั้งหมด" &&
      selectSearch.value.in_productType == "ฝาก"
    ) {
      console.log("ฝากมีวันที่ฝาก");
      const isValidDate = CheckCurrentDate();
      if (isValidDate) {
        store.commit("setStatusLoading", true);

        const body = {
          page: exportToExcelActive.value ? 1 : pagination.value.page,
          limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
          sortField: "createdAt",
          sortType: "DESC",
          filterModel: {
            logicOperator: "and",
            items: [],
          },
        };
        console.log("body --> ", body);
        await _apiDepositImport.searchDepositImport(body, (response) => {
          if (response.statusCode === 200) {
            if (response.data.length > 0) {
              showTable.value = true;
              fromDepositActive.value = true;
              store.commit("setStatusLoading", false);
              console.log("response5555--> ", response);
              flattenedData = response.data.map((item) => ({
                specialID: item.product.specialID,
                productName: item.product.name,
                productPrice: item.product.price,
                quantity: item.quantity,
                remain: item.remain,
                price: item.price,
                periodDate: item.periodDate,
                supplierFirstName: item.supplier.firstName,
                supplierLastName: item.supplier.lastName,
                supplierPhone: item.supplier.phone,
                supplierAddress: item.supplier.address,
                supplierSubDistrict: item.supplier.subDistric,
                supplierDistrict: item.supplier.distric,
                supplierProvince: item.supplier.province,
                supplierZipCode: item.supplier.zipCode,
              }));
              if (exportToExcelActive.value == true) {
                dataExport = flattenedData;
                exportToExcelActive.value = false;
              } else {
                rows.value = flattenedData;
                pagination.value.totalPage = response.metadata.totalPage;
                showTable.value = true;
              }
            } else {
              store.commit("setStatusLoading", false);
              showTable.value = false;
              formAlert.value = {
                status: true,
                title: "แจ้งเตือน",
                body: "ไม่พบข้อมูล",
              };
              rows.value = [];
            }
          } else {
            showTable.value = false;
            const mapValidation = response.message.map((item) => {
              return `<li>${item}</li>`;
            });
            modalAlert.value = {
              status: true,
              title: "กรุณาตรวจสอบ",
              body: mapValidation.join(""),
            };
            store.commit("setStatusLoading", false);
          }
        });
      }
    } else if (
      inputSearch.value.in_productName == "ทั้งหมด" &&
      selectSearch.value.in_productType == "ฝาก" &&
      currentDate.value.startDate != "" &&
      currentDate.value.endDate != ""
    ) {
      console.log("ทั้งหมด startDate------->");
      const isValidDate = CheckCurrentDate();
      if (isValidDate) {
        store.commit("setStatusLoading", true);

        const body = {
          page: exportToExcelActive.value ? 1 : pagination.value.page,
          limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
          sortField: "createdAt",
          sortType: "DESC",
          filterModel: {
            logicOperator: "and",
            items: [
              {
                field: "importDate",
                operator: "between",
                value: [currentDate.value.startDate, currentDate.value.endDate],
              },
            ],
          },
        };
        console.log("body --> ", body);
        await _apiDepositImport.searchDepositImport(body, (response) => {
          if (response.statusCode === 200) {
            if (response.data.length > 0) {
              showTable.value = true;
              fromDepositActive.value = true;
              store.commit("setStatusLoading", false);
              console.log("response5555--> ", response);
              flattenedData = response.data.map((item) => ({
                specialID: item.product.specialID,
                productName: item.product.name,
                productPrice: item.product.price,
                quantity: item.quantity,
                remain: item.remain,
                price: item.price,
                periodDate: item.periodDate,
                supplierFirstName: item.supplier.firstName,
                supplierLastName: item.supplier.lastName,
                supplierPhone: item.supplier.phone,
                supplierAddress: item.supplier.address,
                supplierSubDistrict: item.supplier.subDistric,
                supplierDistrict: item.supplier.distric,
                supplierProvince: item.supplier.province,
                supplierZipCode: item.supplier.zipCode,
              }));
              if (exportToExcelActive.value == true) {
                dataExport = flattenedData;
                exportToExcelActive.value = false;
              } else {
                rows.value = flattenedData;
                pagination.value.totalPage = response.metadata.totalPage;
                showTable.value = true;
              }
            } else {
              store.commit("setStatusLoading", false);
              showTable.value = false;
              formAlert.value = {
                status: true,
                title: "แจ้งเตือน",
                body: "ไม่พบข้อมูล",
              };
              rows.value = [];
            }
          } else {
            showTable.value = false;
            const mapValidation = response.message.map((item) => {
              return `<li>${item}</li>`;
            });
            modalAlert.value = {
              status: true,
              title: "กรุณาตรวจสอบ",
              body: mapValidation.join(""),
            };
            store.commit("setStatusLoading", false);
          }
        });
      }
    } else if (
      inputSearch.value.in_productName != "" &&
      selectSearch.value.in_productType == "ฝาก" &&
      currentDate.value.startDate == "" &&
      currentDate.value.endDate == ""
    ) {
      console.log("ซื้อขายไม่มีประเภทสินค้า");

      store.commit("setStatusLoading", true);

      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);
          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
            filterModel: {
              logicOperator: "and",
              items: [
                {
                  field: "product_name",
                  operator: "equals",
                  value: inputSearch.value.in_productName,
                },
              ],
            },
          };
          await _apiDepositImport.searchDepositImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = true;
                store.commit("setStatusLoading", false);
                console.log("response5555--> ", response);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  quantity: item.quantity,
                  remain: item.remain,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    } else if (
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate == "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate == "" &&
        currentDate.value.endDate != "")
    ) {
      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);

          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
            filterModel: {
              logicOperator: "and",
              items: [
                {
                  field: "product_name",
                  operator: "equals",
                  value: inputSearch.value.in_productName,
                },
                {
                  field: "importDate",
                  operator: "between",
                  value: [
                    currentDate.value.startDate,
                    currentDate.value.endDate,
                  ],
                },
              ],
            },
          };
          await _apiDepositImport.searchDepositImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = true;
                store.commit("setStatusLoading", false);
                console.log("response5555--> ", response);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  quantity: item.quantity,
                  remain: item.remain,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    } else if (
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate != "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate == "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startPeriodDate == "" &&
        currentDate.value.endPeriodDate != "")
    ) {
      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);
          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
            filterModel: {
              logicOperator: "and",
              items: [
                {
                  field: "product_name",
                  operator: "equals",
                  value: inputSearch.value.in_productName,
                },
                {
                  field: "periodDate",
                  operator: "between",
                  value: [
                    currentDate.value.startPeriodDate,
                    currentDate.value.endPeriodDate,
                  ],
                },
              ],
            },
          };
          await _apiDepositImport.searchDepositImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = true;
                store.commit("setStatusLoading", false);
                console.log("response5555--> ", response);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  quantity: item.quantity,
                  remain: item.remain,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    } else if (
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate != "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate == "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate != "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate == "" &&
        currentDate.value.endDate != "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate != "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate == "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "" &&
        currentDate.value.startPeriodDate == "" &&
        currentDate.value.endPeriodDate != "")
    ) {
      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);
          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
            filterModel: {
              logicOperator: "and",
              items: [
                {
                  field: "product_name",
                  operator: "equals",
                  value: inputSearch.value.in_productName,
                },
                {
                  field: "importDate",
                  operator: "between",
                  value: [
                    currentDate.value.startDate,
                    currentDate.value.endDate,
                  ],
                },
                {
                  field: "periodDate",
                  operator: "between",
                  value: [
                    currentDate.value.startPeriodDate,
                    currentDate.value.endPeriodDate,
                  ],
                },
              ],
            },
          };
          await _apiDepositImport.searchDepositImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = true;
                store.commit("setStatusLoading", false);
                console.log("response5555--> ", response);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  quantity: item.quantity,
                  remain: item.remain,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    } else if (
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate == "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        currentDate.value.startDate == "" &&
        currentDate.value.endDate != "")
    ) {
      console.log("importDate ทั้งหมด");

      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);
          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
            filterModel: {
              logicOperator: "and",
              items: [
                {
                  field: "importDate",
                  operator: "between",
                  value: [
                    currentDate.value.startDate,
                    currentDate.value.endDate,
                  ],
                },
              ],
            },
          };
          await _apiDepositImport.searchDepositImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = true;
                store.commit("setStatusLoading", false);
                console.log("response5555--> ", response);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  quantity: item.quantity,
                  remain: item.remain,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    } else if (
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        selectSearch.value.in_productType == "ฝาก" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate != "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        selectSearch.value.in_productType == "ฝาก" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate == "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        selectSearch.value.in_productType == "ฝาก" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "" &&
        currentDate.value.startPeriodDate == "" &&
        currentDate.value.endPeriodDate != "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        selectSearch.value.in_productType == "ฝาก" &&
        currentDate.value.startDate == "" &&
        currentDate.value.endDate == "" &&
        currentDate.value.startPeriodDate != "" &&
        currentDate.value.endPeriodDate == "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        selectSearch.value.in_productType == "ฝาก" &&
        currentDate.value.startDate == "" &&
        currentDate.value.endDate == "" &&
        currentDate.value.startPeriodDate == "" &&
        currentDate.value.endPeriodDate != "")
    ) {
      console.log("ทั้งหมด startPeriodDate startDate------->");
      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);
          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
            filterModel: {
              logicOperator: "and",
              items: [
                {
                  field: "importDate",
                  operator: "between",
                  value: [
                    currentDate.value.startDate,
                    currentDate.value.endDate,
                  ],
                },
                {
                  field: "periodDate",
                  operator: "between",
                  value: [
                    currentDate.value.startPeriodDate,
                    currentDate.value.endPeriodDate,
                  ],
                },
              ],
            },
          };
          await _apiDepositImport.searchDepositImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = true;
                store.commit("setStatusLoading", false);
                console.log("response5555--> ", response);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  quantity: item.quantity,
                  remain: item.remain,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    }
  } else {
    console.log("fromDepositActive --> false");
    if (
      currentDate.value.startDate == "" &&
      currentDate.value.endDate == "" &&
      inputSearch.value.in_productName == "ทั้งหมด" &&
      selectSearch.value.in_productType != ""
    ) {
      console.log("ซื้อขายมีแต่ประเภทสินค้า");
      const isValidDate = CheckCurrentDate();
      if (isValidDate) {
        store.commit("setStatusLoading", true);

        const body = {
          page: exportToExcelActive.value ? 1 : pagination.value.page,
          limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
                      sortType: "DESC",
          filterModel: {
            logicOperator: "and",
            items: [
              {
                field: "typeAction",
                operator: "equals",
                value: selectSearch.value.in_productType,
              },
            ],
          },
        };
        await _apiSupplierImport.searchSupplierImport(body, (response) => {
          if (response.statusCode === 200) {
            if (response.data.length > 0) {
              showTable.value = true;
              fromDepositActive.value = false;
              store.commit("setStatusLoading", false);
              flattenedData = response.data.map((item) => ({
                specialID: item.product.specialID,
                productName: item.product.name,
                productPrice: item.product.price,
                typeAction: item.typeAction,
                quantity: item.quantity,
                price: item.price,
                periodDate: item.periodDate,
                supplierFirstName: item.supplier.firstName,
                supplierLastName: item.supplier.lastName,
                supplierPhone: item.supplier.phone,
                supplierAddress: item.supplier.address,
                supplierSubDistrict: item.supplier.subDistric,
                supplierDistrict: item.supplier.distric,
                supplierProvince: item.supplier.province,
                supplierZipCode: item.supplier.zipCode,
              }));
              if (exportToExcelActive.value == true) {
                dataExport = flattenedData;
                exportToExcelActive.value = false;
              } else {
                rows.value = flattenedData;
                pagination.value.totalPage = response.metadata.totalPage;
                showTable.value = true;
              }
            } else {
              store.commit("setStatusLoading", false);
              showTable.value = false;
              formAlert.value = {
                status: true,
                title: "แจ้งเตือน",
                body: "ไม่พบข้อมูล",
              };
              rows.value = [];
            }
          } else {
            showTable.value = false;
            const mapValidation = response.message.map((item) => {
              return `<li>${item}</li>`;
            });
            modalAlert.value = {
              status: true,
              title: "กรุณาตรวจสอบ",
              body: mapValidation.join(""),
            };
            store.commit("setStatusLoading", false);
          }
        });
      }
    } else if (
      inputSearch.value.in_productName != "" &&
      currentDate.value.startDate == "" &&
      currentDate.value.endDate == ""
    ) {
      console.log("ซื้อขายไม่มีประเภทสินค้า");
      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);
          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
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
                  value: selectSearch.value.in_productType,
                },
              ],
            },
          };
          await _apiSupplierImport.searchSupplierImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = false;
                store.commit("setStatusLoading", false);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  typeAction: item.typeAction,
                  quantity: item.quantity,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    } else if (
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate != "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate == "") ||
      (inputSearch.value.in_productName == "ทั้งหมด" &&
        currentDate.value.startDate == "" &&
        currentDate.value.endDate != "")
    ) {
      console.log("วันที่เท่านั้น");
      const isValidDate = CheckCurrentDate();
      if (isValidDate) {
        store.commit("setStatusLoading", true);
        const body = {
          page: exportToExcelActive.value ? 1 : pagination.value.page,
          limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
          sortField: "id",
          sortType: "ASC",
          filterModel: {
            logicOperator: "and",
            items: [
              {
                field: "importDate",
                operator: "between",
                value: [currentDate.value.startDate, currentDate.value.endDate],
              },
            ],
          },
        };
        await _apiSupplierImport.searchSupplierImport(body, (response) => {
          if (response.statusCode === 200) {
            if (response.data.length > 0) {
              showTable.value = true;
              fromDepositActive.value = false;
              store.commit("setStatusLoading", false);
              flattenedData = response.data.map((item) => ({
                specialID: item.product.specialID,
                productName: item.product.name,
                productPrice: item.product.price,
                typeAction: item.typeAction,
                quantity: item.quantity,
                price: item.price,
                periodDate: item.periodDate,
                supplierFirstName: item.supplier.firstName,
                supplierLastName: item.supplier.lastName,
                supplierPhone: item.supplier.phone,
                supplierAddress: item.supplier.address,
                supplierSubDistrict: item.supplier.subDistric,
                supplierDistrict: item.supplier.distric,
                supplierProvince: item.supplier.province,
                supplierZipCode: item.supplier.zipCode,
              }));
              if (exportToExcelActive.value == true) {
                dataExport = flattenedData;
                exportToExcelActive.value = false;
              } else {
                rows.value = flattenedData;
                pagination.value.totalPage = response.metadata.totalPage;
                showTable.value = true;
              }
            } else {
              store.commit("setStatusLoading", false);
              showTable.value = false;
              formAlert.value = {
                status: true,
                title: "แจ้งเตือน",
                body: "ไม่พบข้อมูล",
              };
              rows.value = [];
            }
          } else {
            showTable.value = false;
            const mapValidation = response.message.map((item) => {
              return `<li>${item}</li>`;
            });
            modalAlert.value = {
              status: true,
              title: "กรุณาตรวจสอบ",
              body: mapValidation.join(""),
            };
            store.commit("setStatusLoading", false);
          }
        });
      }
    } else if (
      inputSearch.value.in_productName != "" &&
      currentDate.value.startDate != "" &&
      currentDate.value.endDate != ""
    ) {
      console.log("ซื้อขายมีประเภทสินค้า");

      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);

          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
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
                  value: selectSearch.value.in_productType,
                },
                {
                  field: "importDate",
                  operator: "between",
                  value: [
                    currentDate.value.startDate,
                    currentDate.value.endDate,
                  ],
                },
              ],
            },
          };
          await _apiSupplierImport.searchSupplierImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = false;
                store.commit("setStatusLoading", false);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  typeAction: item.typeAction,
                  quantity: item.quantity,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    } else if (
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate != "" &&
        currentDate.value.endDate == "") ||
      (inputSearch.value.in_productName != "" &&
        currentDate.value.startDate == "" &&
        currentDate.value.endDate != "")
    ) {
      console.log("ซื้อขายมีประเภทสินค้า");

      if (selectSearch.value.in_productType == "") {
        formAlert.value = {
          status: true,
          title: "เกิดข้อผิดพลาด",
          body: "กรุณาเลือกประเภทสินค้า",
        };
        store.commit("setStatusLoading", false);
        return;
      } else {
        const isValidDate = CheckCurrentDate();
        if (isValidDate) {
          store.commit("setStatusLoading", true);

          const body = {
            page: exportToExcelActive.value ? 1 : pagination.value.page,
            limit: exportToExcelActive.value ? 10000 : pagination.value.limit,
            sortField: "createdAt",
          sortType: "DESC",
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
                  value: selectSearch.value.in_productType,
                },
                {
                  field: "importDate",
                  operator: "between",
                  value: [
                    currentDate.value.startDate,
                    currentDate.value.endDate,
                  ],
                },
              ],
            },
          };
          await _apiSupplierImport.searchSupplierImport(body, (response) => {
            if (response.statusCode === 200) {
              if (response.data.length > 0) {
                showTable.value = true;
                fromDepositActive.value = false;
                store.commit("setStatusLoading", false);
                flattenedData = response.data.map((item) => ({
                  specialID: item.product.specialID,
                  productName: item.product.name,
                  productPrice: item.product.price,
                  typeAction: item.typeAction,
                  quantity: item.quantity,
                  price: item.price,
                  periodDate: item.periodDate,
                  supplierFirstName: item.supplier.firstName,
                  supplierLastName: item.supplier.lastName,
                  supplierPhone: item.supplier.phone,
                  supplierAddress: item.supplier.address,
                  supplierSubDistrict: item.supplier.subDistric,
                  supplierDistrict: item.supplier.distric,
                  supplierProvince: item.supplier.province,
                  supplierZipCode: item.supplier.zipCode,
                }));
                if (exportToExcelActive.value == true) {
                  dataExport = flattenedData;
                  exportToExcelActive.value = false;
                } else {
                  rows.value = flattenedData;
                  pagination.value.totalPage = response.metadata.totalPage;
                  showTable.value = true;
                }
              } else {
                store.commit("setStatusLoading", false);
                showTable.value = false;
                formAlert.value = {
                  status: true,
                  title: "แจ้งเตือน",
                  body: "ไม่พบข้อมูล",
                };
                rows.value = [];
              }
            } else {
              showTable.value = false;
              const mapValidation = response.message.map((item) => {
                return `<li>${item}</li>`;
              });
              modalAlert.value = {
                status: true,
                title: "กรุณาตรวจสอบ",
                body: mapValidation.join(""),
              };
              store.commit("setStatusLoading", false);
            }
          });
        }
      }
    }
  }
};

const onSubmit = async () => {
  await onLoadTable();
};
const CheckCurrentDate = () => {
  console.log("***CheckCurrentDate***");

  // เริ่มต้นโดยตั้งค่าตัวแปรเพื่อใช้เก็บผลลัพธ์ของการตรวจสอบเงื่อนไข
  let isValid = true;

  if (
    currentDate.value.endDate < currentDate.value.startDate &&
    currentDate.value.endDate != ""
  ) {
    formAlert.value = {
      status: true,
      title: "เกิดข้อผิดพลาด",
      body: "วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด",
    };
    // currentDate.value.startDate = "";
    // currentDate.value.endDate = "";
    showTable.value = false;

    // ถ้าพบข้อผิดพลาดในการตรวจสอบ กำหนดค่า isValid เป็น false
    isValid = false;
  } else if (
    currentDate.value.startDate != "" &&
    currentDate.value.endDate == ""
  ) {
    formAlert.value = {
      status: true,
      title: "เกิดข้อผิดพลาด",
      body: "กรุณากรอกวันที่สิ้นสุด",
    };
    // currentDate.value.startDate = "";
    // currentDate.value.endDate = "";
    showTable.value = false;

    // ถ้าพบข้อผิดพลาดในการตรวจสอบ กำหนดค่า isValid เป็น false
    isValid = false;
  } else if (
    currentDate.value.startDate == "" &&
    currentDate.value.endDate != ""
  ) {
    formAlert.value = {
      status: true,
      title: "เกิดข้อผิดพลาด",
      body: "กรุณากรอกวันที่เริ่มต้น",
    };
    // currentDate.value.startDate = "";
    // currentDate.value.endDate = "";
    showTable.value = false;

    // ถ้าพบข้อผิดพลาดในการตรวจสอบ กำหนดค่า isValid เป็น false
    isValid = false;
  }

  if (
    currentDate.value.endPeriodDate < currentDate.value.startPeriodDate &&
    currentDate.value.endPeriodDate != ""
  ) {
    formAlert.value = {
      status: true,
      title: "เกิดข้อผิดพลาด",
      body: "วันที่สิ้นสุดต้องมากกว่าวันที่เริ่มต้น",
    };
    // currentDate.value.startPeriodDate = "";
    // currentDate.value.endPeriodDate = "";
    showTable.value = false;
    // ถ้าพบข้อผิดพลาดในการตรวจสอบ กำหนดค่า isValid เป็น false
    isValid = false;
  } else if (
    currentDate.value.startPeriodDate != "" &&
    currentDate.value.endPeriodDate == ""
  ) {
    formAlert.value = {
      status: true,
      title: "เกิดข้อผิดพลาด",
      body: "กรุณากรอกวันที่สิ้นสุด",
    };
    // currentDate.value.startPeriodDate = "";
    // currentDate.value.endPeriodDate = "";
    showTable.value = false;
    // ถ้าพบข้อผิดพลาดในการตรวจสอบ กำหนดค่า isValid เป็น false
    isValid = false;
  } else if (
    currentDate.value.startPeriodDate == "" &&
    currentDate.value.endPeriodDate != ""
  ) {
    formAlert.value = {
      status: true,
      title: "เกิดข้อผิดพลาด",
      body: "กรุณากรอกวันที่เริ่มต้น",
    };
    showTable.value = false;
    // ถ้าพบข้อผิดพลาดในการตรวจสอบ กำหนดค่า isValid เป็น false
    isValid = false;
  }

  // คืนค่า isValid ออกมาเพื่อให้ CheckCurrentDate() สามารถรับค่าเป็น true หรือ false ได้
  return isValid;
};

const clearData = () => {
  rows.value = [];
  showTable.value = false;
  fromDepositActive.value = false;
  inputSearch.value.in_productName = "ทั้งหมด";
  selectSearch.value.in_productType = "ซื้อ-ขาย";
  currentDate.value.startDate = "";
  currentDate.value.endDate = "";
  currentDate.value.startPeriodDate = "";
  currentDate.value.endPeriodDate = "";
};
const onChangeType = () => {
  rows.value = [];
  showTable.value = false;
  if (selectSearch.value.in_productType == "ฝาก") {
    fromDepositActive.value = true;
  } else {
    fromDepositActive.value = false;
  }
};

onMounted(async () => {
  store.commit("setStatusLoading", true);
  await onShowProduct();
  inputSearch.value.in_productName = "ทั้งหมด";
  selectSearch.value.in_productType = "ซื้อ-ขาย";
  store.commit("setStatusLoading", false);
});

const onExportExcel = async () => {
  console.log("***onExportExcel***");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet A");
  exportToExcelActive.value = true;
  await onLoadTable();
  if (fromDepositActive.value == true) {
    worksheet.columns = [
      { header: "Special ID", key: "specialID", width: 15 },
      { header: "Product Name", key: "productName", width: 30 },
      { header: "Product Price", key: "productPrice", width: 15 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "Remain", key: "remain", width: 15 },
      { header: "Price", key: "price", width: 15 },
      { header: "Period Date", key: "periodDate", width: 15 },
      { header: "Supplier First Name", key: "supplierFirstName", width: 20 },
      { header: "Supplier Last Name", key: "supplierLastName", width: 20 },
      { header: "Supplier Phone", key: "supplierPhone", width: 20 },
      { header: "Supplier Address", key: "supplierAddress", width: 30 },
      { header: "Supplier SubDistrict", key: "supplierSubDistrict", width: 20 },
      { header: "Supplier District", key: "supplierDistrict", width: 20 },
      { header: "Supplier Province", key: "supplierProvince", width: 20 },
      { header: "Supplier Zip Code", key: "supplierZipCode", width: 15 },
    ];
    // เข้าถึงแถวหัวของ Excel spreadsheet
    const headerRow = worksheet.getRow(1); // แถวหัวเริ่มที่ index 1

    // กำหนดสีพื้นหลังให้กับแต่ละ cell ในแถวหัว
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DD5746" }, // สีที่คุณต้องการ
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // เพิ่มข้อมูลลงในแถวของ Excel spreadsheet
    dataExport.forEach((item, index) => {
      // Add row to the worksheet
      const row = worksheet.addRow({
        specialID: item.specialID,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity,
        remain: item.remain,
        price: item.price,
        periodDate: item.periodDate,
        supplierFirstName: item.supplierFirstName,
        supplierLastName: item.supplierLastName,
        supplierPhone: item.supplierPhone,
        supplierAddress: item.supplierAddress,
        supplierSubDistrict: item.supplierSubDistrict,
        supplierDistrict: item.supplierDistrict,
        supplierProvince: item.supplierProvince,
        supplierZipCode: item.supplierZipCode,
      });

      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ExportedData.xlsx";
      a.click();
    });
  } else {
    worksheet.columns = [
      { header: "Special ID", key: "specialID", width: 15 },
      { header: "Product Name", key: "productName", width: 30 },
      { header: "Type of Action", key: "typeAction", width: 20 },
      { header: "Product Price", key: "productPrice", width: 15 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "Price", key: "price", width: 15 },
      { header: "Supplier First Name", key: "supplierFirstName", width: 20 },
      { header: "Supplier Last Name", key: "supplierLastName", width: 20 },
      { header: "Supplier Phone", key: "supplierPhone", width: 20 },
      { header: "Supplier Address", key: "supplierAddress", width: 30 },
      { header: "Supplier SubDistrict", key: "supplierSubDistrict", width: 20 },
      { header: "Supplier District", key: "supplierDistrict", width: 20 },
      { header: "Supplier Province", key: "supplierProvince", width: 20 },
      { header: "Supplier Zip Code", key: "supplierZipCode", width: 15 },
    ];

    // เข้าถึงแถวหัวของ Excel spreadsheet
    const headerRow = worksheet.getRow(1); // แถวหัวเริ่มที่ index 1

    // กำหนดสีพื้นหลังให้กับแต่ละ cell ในแถวหัว
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A8CD9F" }, // สีที่คุณต้องการ
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    dataExport.forEach((item, index) => {
      // Add row to the worksheet
      const row = worksheet.addRow({
        specialID: item.specialID,
        productName: item.productName,
        typeAction: item.typeAction,
        productPrice: item.productPrice,
        quantity: item.quantity,
        price: item.price,
        supplierFirstName: item.supplierFirstName,
        supplierLastName: item.supplierLastName,
        supplierPhone: item.supplierPhone,
        supplierAddress: item.supplierAddress,
        supplierSubDistrict: item.supplierSubDistrict,
        supplierDistrict: item.supplierDistrict,
        supplierProvince: item.supplierProvince,
        supplierZipCode: item.supplierZipCode,
      });

      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ExportedData2.xlsx";
      a.click();
    });
  }
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
                <option selected value="ทั้งหมด">ทั้งหมด</option>
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
                v-model="selectSearch.in_productType"
                @change="onChangeType"
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
              >
                <option value="ซื้อ-ขาย">ซื้อ-ขาย</option>
                <option value="ฝาก">ฝาก</option>
              </select>
            </div>

            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">วันที่เริ่มต้น</span>
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
                v-model="currentDate.startDate"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold">วันที่สิ้นสุด</span>
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
                v-model="currentDate.endDate"
              />
            </div>
          </div>
          <div
            class="grid grid-cols-2 gap-4 px-6 mt-3"
            v-if="fromDepositActive"
          >
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold"
                >วันที่เลิกฝากเริ่มต้น</span
              >
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
                v-model="currentDate.startPeriodDate"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-red-800 font-semibold"
                >วันที่เลิกฝากสิ้นสุด</span
              >
              <input
                class="h-8 w-50 focus:outline-red-400 rounded bg-red-100 px-3"
                type="date"
                v-model="currentDate.endPeriodDate"
              />
            </div>
          </div>
          <div class="flex justify-center py-5 space-x-3">
            <button
              label="ค้นหา"
              @click="onSubmit"
              class="h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M11.5 2.75a8.75 8.75 0 1 0 0 17.5a8.75 8.75 0 0 0 0-17.5M1.25 11.5c0-5.66 4.59-10.25 10.25-10.25S21.75 5.84 21.75 11.5c0 2.56-.939 4.902-2.491 6.698l3.271 3.272a.75.75 0 1 1-1.06 1.06l-3.272-3.271A10.21 10.21 0 0 1 11.5 21.75c-5.66 0-10.25-4.59-10.25-10.25"
                  clip-rule="evenodd"
                />
              </svg>
              ค้นหา
            </button>
            <button
              @click="clearData"
              class="h-10 rounded-full w-40 btn btn-btn-error btn-wide text-xl text-red-800 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 336.1c-70.7 0-128-57.3-128-128.1s57.3-128.1 128-128.1v-37c0-6.4 7.1-10.2 12.4-6.7l72.9 52.6c4.9 3.3 4.7 10.6-.4 13.6L268 196.7c-5.3 3.1-12-.8-12-6.9v-41.9c-60.3 0-109.2 49.7-108.1 110.2 1.1 59.1 50.3 106.7 109.5 106 55.9-.7 101.8-43.7 106.3-99 .4-5.2 4.7-9.1 9.9-9.1 5.8 0 10.4 4.9 9.9 10.7-5.4 66-60.4 117.4-127.5 117.4z"
                  fill="#A2422C"
                />
              </svg>
              ยกเลิก
            </button>
            <button
              v-if="showTable"
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
        </div>
      </div>
    </div>
  </div>
  <div v-if="showTable" class="rounded-xl mb-10 overflow-auto">
    <tableManage
      v-if="fromDepositActive"
      :columns="columnsDeposit"
      :rows="rows"
    />
    <tableManage v-else :columns="columnsSupplier" :rows="rows" />
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