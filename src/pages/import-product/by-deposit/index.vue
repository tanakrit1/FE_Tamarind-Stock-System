<script setup>
import tableManage from "../../../components/tables/table-manage.vue";
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
import _apiDepositImport from "../../../api/deposit-import.js";
import _apiProduct from "../../../api/master-products.js";
import _apiSupplier from "../../../api/master-supplier.js";
import subDistrict from "../../../assets/address/thai_tambons.json";
import district from "../../../assets/address/thai_amphures.json";
import province from "../../../assets/address/thai_provinces.json";
import { onMounted, ref, watch } from "vue";
import alert from "../../../components/alert/alert.vue";
import store from "../../../store";
import paginationPage from "../../../components/pagination/pagination-page.vue";
import formatDate from "../../../helpers/fuction-service";

const columns = [
  { field: "specialID", label: "รหัส", width: "10%" },
  { field: "productName", label: "ชื่อสินค้า", width: "20%" },
  // { field: "typeAction", label: "ประเภทสินค้า", width: "10%" },
  { field: "productPrice", label: "ราคาสินค้า", width: "10%" },
  { field: "quantity", label: "ปริมาณสินค้า", width: "10%" },
  { field: "remain", label: "จํานวนคงเหลือ", width: "10%" },
  { field: "price", label: "ราคารวมฝาก", width: "10%" },
  { field: "periodDate", label: "วันที่สิ้นสุดการฝาก", width: "10%" },
  { field: "supplierFirstName", label: "ชื่อ", width: "20%" },
  { field: "supplierLastName", label: "สกุล", width: "20%" },
  { field: "supplierPhone", label: "เบอร์โทร", width: "20%" },
  { field: "supplierAddress", label: "ที่อยู่", width: "25%" },
  { field: "supplierSubDistrict", label: "ตำบล", width: "20%" },
  { field: "supplierDistrict", label: "อำเภอ", width: "20%" },
  { field: "supplierProvince", label: "จังหวัด", width: "20%" },
  { field: "supplierZipCode", label: "ไปรษณีย์", width: "10%" },
];

const rows = ref([]);

const pagination = ref({
  page: 1,
  limit: 5,
  totalPage: 0,
});

const onChangePagination = (val) => {
  pagination.page = val;
  onLoadData();
};

//จัดลำดับข้อมูลให้เท่ากันก่อนนำมาใช้งาน
const dataInput = ref({
  product: [],
  listProductAll: [],
  province: [],
  district: [],
  subDistrict: [],
});

const formProduct = ref({
  productID: "",
  productName: "",
  typeAction: "",
  productPrice: "0.00",
  remain: "",
  quantity: "0",
  price: "0.00",
});

const formSupplier = ref({
  id: "",
  firstName: "",
  lastName: "",
  address: "",
  province: "",
  district: "",
  subDistrict: "",
  zipCode: "",
  phone: "",
});

const clearData = () => {
  formSupplier.value = [];
  formProduct.value = [];
};
const formAlert = ref({
  status: false,
  title: "",
  body: "",
});
const onCloseAlert = () => {
  formAlert.value.status = false;
};

const formDepositActive = ref(false);
const showTable = ref(false);
let formattedMessages;

const onLoadData = async () => {
  showTable.value = false;
  const body = {
    page: pagination.value.page,
    limit: pagination.value.limit,
    sortField: "createdAt",
    sortType: "DESC",
    filterModel: {
      logicOperator: "and",
      items: [],
    },
  };

  //จัดลำดับข้อมูลให้เท่ากันก่อนนำมาใช้งาน
  await _apiDepositImport.searchDepositImport(body, (response) => {
    if (response.statusCode === 200) {
      if (response.data.length > 0) {
        showTable.value = true;
        const flattenedData = response.data.map((item) => ({
          specialID: item.product.specialID,
          productName: item.product.name,
          // typeAction: item.typeAction,
          productPrice: item.product.price,
          quantity: item.quantity,
          remain: item.remain,
          price: item.price,
          periodDate: formatDate(item.periodDate),
          supplierFirstName: item.supplier.firstName,
          supplierLastName: item.supplier.lastName,
          supplierPhone: item.supplier.phone,
          supplierAddress: item.supplier.address,
          supplierSubDistrict: item.supplier.subDistric,
          supplierDistrict: item.supplier.distric,
          supplierProvince: item.supplier.province,
          supplierZipCode: item.supplier.zipCode,
        }));
        rows.value = flattenedData;
        pagination.value.totalPage = response.metadata.totalPage;
      } else {
        showTable.value = false;
      }
      console.log("response", rows.value);
    } else {
      showTable.value = false;

      const messages = response.message;
      const formattedMessages = messages
        .map((message) => `<li>${message}</li>`)
        .join("");
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: formattedMessages,
      };
    }
  });
};

const onShowProduct = async () => {
  store.commit("setStatusLoading", true);

  const body = {
    page: 1,
    limit: 10,
  };
  await _apiProduct.search(body, (response) => {
    if (response.statusCode === 200) {
      dataInput.value.product = response.data.map((item) => {
        return {
          specialID: item.specialID,
          id: item.id,
          name: item.name,
          price: item.price,
          type: item.type,
        };
      });
      dataInput.value.listProductAll = response.data;
      dataInput.value.product = response.data;
    } else {
      const messages = response.message;
      const formattedMessages = messages
        .map((message) => `<li>${message}</li>`)
        .join("");
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: formattedMessages,
      };
    }
  });
  dataInput.value.province = province
    .map((item) => {
      return { label: item.name_th, value: item.id };
    })
    .sort((a, b) => a.label.localeCompare(b.label, "th"));
};

function setCurrentDate() {
  const today = new Date().toISOString().substr(0, 10);
  formProduct.value.periodDate = today;
}
const onChangeProduct = (productID) => {
  if (productID !== "") {
    formProduct.value.price = dataInput.value.listProductAll
      .find((item) => item.id == productID)
      .price?.toLocaleString();
    formProduct.value.productID = productID;
    formProduct.value.price = "0.00";
    formProduct.value.quantity = "0";
    formProduct.value.remain = formProduct.value.quantity;
    // formProduct.value.periodDate = "";
    formProduct.value.productName = dataInput.value.name;
    formProduct.value.typeAction = "ฝาก";
    setCurrentDate();

    // console.log("formProduct", formProduct.value);
    // console.log("dataInput", dataInput.value.product[0].name);
    // console.log("dataInput---->", dataInput.value.product);
  } else {
    formProduct.value.price = "0.00";
    formProduct.value.remain = "0.00";
    formProduct.value.quantity = "0";
    formProduct.value.periodDate = "";
    formProduct.value.remain = formProduct.value.quantity;
    // formProduct.value.discription = "";
    formProduct.value.productName = "";
    formProduct.value.typeAction = "";
    // formProduct.value.discription = "";
    setCurrentDate();
  }
};

const onChangeSupplier = async (phone) => {
  store.commit("setStatusLoading", true);

  const body = {
    page: 1,
    limit: 1,
    filterModel: {
      logicOperator: "and",
      items: [
        {
          field: "phone",
          operator: "equals",
          value: phone,
        },
      ],
    },
  };
  await _apiSupplier.search(body, (response) => {
    if (response.statusCode === 200) {
      if (response.data.length > 0) {
        console.log("**");
        formDepositActive.value = false;
        formSupplier.value.id = response.data[0].id;
        formSupplier.value.firstName = response.data[0].firstName;
        formSupplier.value.lastName = response.data[0].lastName;
        formSupplier.value.address = response.data[0].address;
        formSupplier.value.province = response.data[0].province;
        formSupplier.value.district = response.data[0].distric;
        formSupplier.value.subDistrict = response.data[0].subDistric;
        formSupplier.value.zipCode = response.data[0].zipCode;
        formSupplier.value.phone = response.data[0].phone;

        console.log("formSupplier", formSupplier.value);
      } else {
        formAlert.value = {
          status: true,
          title: "เเจ้งเตือน",
          body: "ไม่พบรายชื่อลูกค้าในระบบ กรุณาเพิ่มลูกค้าใหม่",
        };
        formDepositActive.value = true;
        formSupplier.value = {
          id: "",
          firstName: "",
          lastName: "",
          address: "",
          province: "",
          district: "",
          subDistrict: "",
          zipCode: "",
          phone: phone,
        };
      }
      store.commit("setStatusLoading", false);
    } else {
      const messages = response.message;
      const formattedMessages = messages
        .map((message) => `<li>${message}</li>`)
        .join("");
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: formattedMessages,
      };
      formDepositActive.value = true;
      clearData();

      store.commit("setStatusLoading", false);
    }
  });
};

const onChangeProvince = async (provinceID) => {
  const filterDistrict = district.filter(
    (item) => item.province_id == provinceID
  );
  dataInput.value.district = filterDistrict.map((item) => {
    return { label: item.name_th, value: item.id };
  });
  formSupplier.value.district = "";
  formSupplier.value.subDistrict = "";
  formSupplier.value.zipCode = "";
};

const onChangeDistrict = async (districtID) => {
  const filterSubDistrict = subDistrict.filter(
    (item) => item.amphure_id == districtID
  );
  dataInput.value.subDistrict = filterSubDistrict.map((item) => {
    return { label: item.name_th, value: item.id };
  });
  formSupplier.value.subDistrict = "";
  formSupplier.value.zipCode = "";
};

const onChangeSubDistrict = async (subDistrictID) => {
  const zipCode = subDistrict.find((item) => item.id == subDistrictID).zip_code;
  formSupplier.value.zipCode = zipCode;
};

function isEmpty(value) {
  return value === null || value === undefined || value === "";
}

function validateFormProduct(product) {
  return (
    !isEmpty(product.quantity) &&
    !isEmpty(product.price) &&
    !isEmpty(product.productID) &&
    !isEmpty(product.periodDate) &&
    !isEmpty(product.remain) &&
    !isEmpty(product.productID)
  );
}

function validateFormSupplier(supplier) {
  return (
    !isEmpty(supplier.firstName) &&
    !isEmpty(supplier.lastName) &&
    !isEmpty(supplier.address) &&
    !isEmpty(supplier.subDistrict) &&
    !isEmpty(supplier.district) &&
    !isEmpty(supplier.province) &&
    !isEmpty(supplier.zipCode) &&
    !isEmpty(supplier.phone)
  );
}

function onChangeQuantity(newValue) {
  formProduct.value.quantity = newValue;
  formProduct.value.remain = newValue;
}

// Watch การเปลี่ยนแปลงในค่า quantity และ remain
watch(() => formProduct.value.quantity, onChangeQuantity);
watch(() => formProduct.value.remain, onChangeQuantity);

const onSubmit = async () => {
  const resultValidatePhone = validatePhone();
  if (resultValidatePhone) {
    console.log("***onSubmit***");
    store.commit("setStatusLoading", true);
    if (
      !validateFormProduct(formProduct.value) ||
      !validateFormSupplier(formSupplier.value)
    ) {
      console.log(
        "validateFormProduct",
        validateFormProduct(formProduct.value)
      );
      console.log(
        "validateFormSupplier",
        validateFormSupplier(formSupplier.value)
      );
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: "กรุณากรอกข้อมูลให้ครบถ้วน",
      };
      store.commit("setStatusLoading", false);
      return;
    } else if (formProduct.value.quantity === "0") {
      formAlert.value = {
        status: true,
        title: "เกิดข้อผิดพลาด",
        body: "จํานวนสินค้าต้องไม่เป็น 0",
      };
      store.commit("setStatusLoading", false);
      return;
    } else {
      const body = {
        //------transaction_import------//
        quantity: formProduct.value.quantity.toString(),
        price: Number(formProduct.value.price),
        remain: Number(formProduct.value.remain),
        periodDate: formProduct.value.periodDate,
        // priceDeposit:1152.05,
        typeAction: formProduct.value.typeAction,
        //--------product----------------//
        product_id: Number(formProduct.value.productID),
        //--------supplier---------------//
        firstName: formSupplier.value.firstName,
        lastName: formSupplier.value.lastName,
        address: formSupplier.value.address,
        distric:
          formDepositActive.value === false
            ? formSupplier.value.district
            : district.find((item) => item.id === formSupplier.value.district)
                .name_th,
        province:
          formDepositActive.value === false
            ? formSupplier.value.province
            : province.find((item) => item.id === formSupplier.value.province)
                .name_th,
        subDistric:
          formDepositActive.value === false
            ? formSupplier.value.subDistrict
            : subDistrict.find(
                (item) => item.id === formSupplier.value.subDistrict
              ).name_th,
        zipCode: formSupplier.value.zipCode.toString(),
        phone: formSupplier.value.phone,
      };

      await _apiDepositImport.createDepositImport(body, (response) => {
        if (response.statusCode === 200) {
          formAlert.value = {
            status: true,
            title: "เเจ้งเตือน",
            body: "บันทึกข้อมูลเรียบร้อย",
          };
          formDepositActive.value = false;
          clearData();
          onLoadData();
          onShowProduct();
        } else {
          const messages = response.message;
          const formattedMessages = messages
            .map((message) => `<li>${message}</li>`)
            .join("");
          formAlert.value = {
            status: true,
            title: "เกิดข้อผิดพลาด",
            body: formattedMessages,
          };
        }
      });
      console.log(body);
      store.commit("setStatusLoading", false);
    }
  } else {
    formAlert.value = {
      status: true,
      title: "เกิดข้อผิดพลาด",
      body: "กรุณาตรวจสอบหมายเลขโทรศัพท์",
    };
  }
};

const validatePhone = () => {
  if (!isNaN(Number(formSupplier.value.phone))) {
    return true;
  }
  return false;
};

const filterNumericInput = (event) => {
  const value = event.target.value;
  const numericValue = value.replace(/\D/g, ""); // กรองตัวอักษรที่ไม่ใช่ตัวเลขออก
  event.target.value = numericValue;
  formProduct.value.quantity = numericValue;
};

onMounted(async () => {
  store.commit("setStatusLoading", true);
  clearData();
  await onLoadData();
  await onShowProduct();
  store.commit("setStatusLoading", false);
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
            >รับสินค้า (ฝากเก็บ)</span
          >
        </div>
        <div class="w-full bg-white rounded-xl py-3">
          <div class="flex justify-between px-6">
            <span class="text-lg font-semibold text-red-800">ข้อมูลสินค้า</span>
            <div
              @click="clearData()"
              class="flex space-x-2 items-center rounded-full px-3 bg-red-100 cursor-pointer"
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
              <span class="text-sm font-bold text-red-800">ล้างฟอร์ม</span>
            </div>
          </div>
          <hr class="mt-2 mx-6" style="border: 1px solid #c2796a" />
          <div class="px-12 flex flex-wrap pt-10">
            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ชื่อสินค้า</span>
              <select
                v-model="formProduct.productID"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                @change="(event) => onChangeProduct(event.target.value)"
              >
                <option
                  v-for="(item, index) in dataInput.product"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ประเภทสินค้า</span>
              <input
                disabled
                type="text"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                v-model="formProduct.typeAction"
              />
            </div>
            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold"
                >ระยะเวลาการฝาก</span
              >
              <input
                type="date"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                v-model="formProduct.periodDate"
              />
            </div>
            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ราคาค่าฝาก</span>
              <input
                type="number"
                class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                v-model="formProduct.price"
              />
              <span class="w-1/4 text-red-800 font-semibold">บาท</span>
            </div>
            <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">ปริมาณ</span>
              <input
                class="h-8 w-3/4 focus:outline-red-400 rounded bg-red-100 px-3"
                type="number"
                v-model="formProduct.quantity"
                @input="filterNumericInput($event)"
              />
              <span class="w-1/4 text-red-800 font-semibold">กิโลกรัม</span>
            </div>
            <!-- <div
              class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            >
              <span class="w-1/4 text-red-800 font-semibold">จำนวนคงเหลือ</span>
              <input
                class="h-8 w-3/4 focus:outline-red-400 rounded bg-red-100 px-3"
                type="number"
                v-model="formProduct.remain"
                disabled
              />
              <span class="w-1/4 text-red-800 font-semibold">กิโลกรัม</span>
            </div> -->
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
          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">เบอร์โทร</label>
            <input
              inputmode="numeric"
              placeholder="กรอกเบอร์โทรศัพท์ (10 หลัก)"
              pattern="[0-9]*"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.phone"
              @input="limitLength($event)"
              @blur="(event) => onChangeSupplier(event.target.value)"
            />
          </div>
          <!-- <div
            v-if="formDepositActive"
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
            hidden
          >
            <label class="w-auto text-red-800 font-semibold"
              >รหัสผู้จัดจำหน่าย</label
            >
            <input
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.id"
            />
          </div>
          <div
            v-else
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold"
              >รหัสผู้จัดจำหน่าย</label
            >
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.id"
            />
          </div> -->
          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">ชื่อ</label>
            <input
              v-if="formDepositActive"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.firstName"
            />
            <input
              v-else
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.firstName"
            />
          </div>
          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">สกุล</label>
            <input
              v-if="formDepositActive"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.lastName"
            />
            <input
              v-else
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.lastName"
            />
          </div>

          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">ที่อยู่</label>
            <input
              v-if="formDepositActive"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.address"
            />
            <input
              v-else
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.address"
            />
          </div>
          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">จังหวัด</label>
            <select
              v-if="formDepositActive"
              v-model="formSupplier.province"
              @change="(event) => onChangeProvince(event.target.value)"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            >
              <option value="">------เลือก------</option>
              <option
                v-for="(item, index) in dataInput.province"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <input
              v-else
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.province"
            />
          </div>
          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">อำเภอ</label>
            <select
              v-if="formDepositActive"
              v-model="formSupplier.district"
              @change="(event) => onChangeDistrict(event.target.value)"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            >
              <option value="">------เลือก------</option>
              <option
                v-for="(item, index) in dataInput.district"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <input
              v-else
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.district"
            />
          </div>
          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">ตำบล</label>
            <select
              v-if="formDepositActive"
              v-model="formSupplier.subDistrict"
              @change="(event) => onChangeSubDistrict(event.target.value)"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            >
              <option value="">------เลือก------</option>
              <option
                v-for="(item, index) in dataInput.subDistrict"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <input
              v-else
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.subDistrict"
            />
          </div>
          <div
            class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6"
          >
            <label class="w-1/4 text-red-800 font-semibold">รหัสไปรษณีย์</label>
            <input
              disabled
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formSupplier.zipCode"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center my-6">
        <buttonPrimaryOutline label="บันทึกข้อมูล" @click="onSubmit" />
      </div>
    </div>
  </div>
  <div v-if="showTable" class="rounded-xl mb-10 overflow-auto mx-5">
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
