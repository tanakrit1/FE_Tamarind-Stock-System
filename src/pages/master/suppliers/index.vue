<script setup>
// import ButtonPrimaryOutline from '../../../components/buttons/button-primary-outline.vue';
import buttonPrimary from "../../../components/buttons/button-primary.vue";
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
import { onMounted, ref } from "vue";
import tableManage from "../../../components/tables/table-manage.vue";
import province from "../../../assets/address/thai_provinces.json";
import district from "../../../assets/address/thai_amphures.json";
import subDistrict from "../../../assets/address/thai_tambons.json";
import _apiSupplier from "../../../api/master-supplier";
import store from "../../../store";
import Alert from "../../../components/alert/alert.vue";
import paginationPage from "../../../components/pagination/pagination-page.vue";

const pagination = ref({
    page: 1,
    limit: 5,
    totalPage: 0,
});

const columns = [
  { field: "specialID", label: "รหัส", width: "10%" },
  { field: "firstName", label: "ชื่อ", width: "15%" },
  { field: "lastName", label: "สกุล", width: "15%" },
  { field: "address", label: "ที่อยู่", width: "15%" },
  { field: "subDistric", label: "ตำบล", width: "15%" },
  { field: "distric", label: "อำเภอ", width: "15%" },
  { field: "province", label: "จังหวัด", width: "15%" },
  { field: "zipCode", label: "ไปรษณีย์", width: "10%" },
];
const rows = ref([
  // { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
  // { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
  // { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
  // { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
  // { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
  // { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
]);

const modalAlert = ref({
  status: false,
  title: "",
  body: "",
});

const modeModal = ref("add");
const rowAction = ref(null);
const ddl = ref({
  province: [],
  district: [],
  subDistrict: [],
});
const formModal = ref({
  in_specialID: "",
  in_firstName: "",
  in_lastName: "",
  in_phone: "",
  in_province: "",
  in_district: "",
  in_subDistrict: "",
  in_zipCode: "",
  in_address: "",
});

onMounted(async () => {
  store.commit("setStatusLoading", true);
  ddl.value.province = province;
  await onLoadData();
  modalAlert.value = {
    status: false,
    title: "",
    body: "",
  };
  store.commit("setStatusLoading", false);
});

const onCloseAlert = () => {
  modalAlert.value.status = false;
};

const onClearFormModal = () => {
  formModal.value = {
    in_specialID: "",
    in_firstName: "",
    in_lastName: "",
    in_phone: "",
    in_province: "",
    in_district: "",
    in_subDistrict: "",
    in_zipCode: "",
    in_address: "",
  };
};

const onLoadData = async () => {
  const body = {
    page: pagination.value.page,
    limit: pagination.value.limit,
  };
  await _apiSupplier.search(body, (response) => {
    rows.value = response.data;
    pagination.value.totalPage = response.metadata.totalPage;
  });
};

const onChangePagination = (val) =>{
  pagination.value.page = val;
  onLoadData();yarn
}

const onChangeProvince = async (provinceID) => {
  const filterDistrict = district.filter(
    (item) => item.province_id == provinceID
  );
  ddl.value.district = filterDistrict;
  formModal.value.in_district = "";
  formModal.value.in_subDistrict = "";
  formModal.value.in_zipCode = "";
};

const onChangeDistrict = async (districtID) => {
  const filterSubDistrict = subDistrict.filter(
    (item) => item.amphure_id == districtID
  );
  ddl.value.subDistrict = filterSubDistrict;
  formModal.value.in_subDistrict = "";
  formModal.value.in_zipCode = "";
};

const onChangeSubDistrict = async (subDistrictID) => {
  const zipCode = subDistrict.find((item) => item.id == subDistrictID).zip_code;
  formModal.value.in_zipCode = zipCode;
};

const onClickEdit = (row) => {
  rowAction.value = row;
  onOpenModal("edit");
};

const onClickRemove = async (row) => {
  await _apiSupplier.delete(row.id, async (response) => {
    if (response.statusCode === 200) {
      modalAlert.value = {
        status: true,
        title: "สำเร็จ",
        body: "ลบข้อมูลสำเร็จ",
      };
      await onLoadData();
    } else {
      const mapValidation = response.message.map((item) => {
        return `<li>${item}</li>`;
      });
      modalAlert.value = {
        status: true,
        title: "กรุณาตรวจสอบ",
        body: mapValidation.join(""),
      };
    }
  });
};

const onOpenModal = async (mode) => {
  modeModal.value = mode;
  if (mode === "add") {
    onClearFormModal();
  } else {
    const provinceValue = province.find(
      (item) => item.name_th == rowAction.value.province
    )?.id;

    const districtValue = district.find(
      (item) => item.name_th == rowAction.value.distric
    )?.id;
    const subDistrictValue = subDistrict.find(
      (item) => item.name_th == rowAction.value.subDistric
    )?.id;
    await onChangeProvince(provinceValue);
    await onChangeDistrict(districtValue);
    await onChangeSubDistrict(subDistrictValue);
    formModal.value = {
      in_specialID: rowAction.value.specialID,
      in_firstName: rowAction.value.firstName,
      in_lastName: rowAction.value.lastName,
      in_phone: rowAction.value.phone,

      in_province: provinceValue,
      in_district: districtValue,
      in_subDistrict: subDistrictValue,
      in_zipCode: rowAction.value.zipCode,
      in_address: rowAction.value.address,
    };
  }
  document.getElementById("modal-supplier").showModal();
};

const onSubmitModal = async () => {
  if (modeModal.value === "add") {
    const body = {
      firstName: formModal.value.in_firstName,
      lastName: formModal.value.in_lastName,
      address: formModal.value.in_address,
      subDistric:
        subDistrict.find((item) => item.id == formModal.value.in_subDistrict)
          ?.name_th || "",
      distric:
        district.find((item) => item.id == formModal.value.in_district)
          ?.name_th || "",
      province:
        province.find((item) => item.id == formModal.value.in_province)
          ?.name_th || "",
      zipCode: formModal.value.in_zipCode.toString(),
      phone: formModal.value.in_phone.toString(),
    };
    await _apiSupplier.create(body, async (response) => {
      if (response.statusCode === 200) {
        modalAlert.value = {
          status: true,
          title: "สำเร็จ",
          body: "บันทึกข้อมูลสำเร็จ",
        };
        onCloseModal();
        await onLoadData();
      } else {
        const mapValidation = response.message.map((item) => {
          return `<li>${item}</li>`;
        });
        modalAlert.value = {
          status: true,
          title: "กรุณาตรวจสอบ",
          body: mapValidation.join(""),
        };
      }
    });
  } else {
    const body = {
      firstName: formModal.value.in_firstName,
      lastName: formModal.value.in_lastName,
      address: formModal.value.in_address,
      subDistric:
        subDistrict.find((item) => item.id == formModal.value.in_subDistrict)
          ?.name_th || "",
      distric:
        district.find((item) => item.id == formModal.value.in_district)
          ?.name_th || "",
      province:
        province.find((item) => item.id == formModal.value.in_province)
          ?.name_th || "",
      zipCode: formModal.value.in_zipCode.toString(),
      phone: formModal.value.in_phone.toString(),
    };
    await _apiSupplier.update(body, rowAction.value.id, async (response) => {
      if (response.statusCode === 200) {
        modalAlert.value = {
          status: true,
          title: "สำเร็จ",
          body: "บันทึกข้อมูลสำเร็จ",
        };
        onCloseModal();
        await onLoadData();
      } else {
        const mapValidation = response.message.map((item) => {
          return `<li>${item}</li>`;
        });
        modalAlert.value = {
          status: true,
          title: "กรุณาตรวจสอบ",
          body: mapValidation.join(""),
        };
      }
    });
  }
};

const onCloseModal = () => {
  document.getElementById("modal-supplier").close();
};
</script>

<template>
  <div>
    <div class="flex md:justify-center">
      <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-10 space-y-10">
        <div class="flex justify-between">
          <div class="flex space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 20 20"
            >
              <path
                fill="#A2422C"
                d="M17 7v2.401a3 3 0 0 0-3.727 4.609A2.5 2.5 0 0 0 11 16.5q0 .25.038.5H5.5A2.5 2.5 0 0 1 3 14.5V7zm-2.5-4A2.5 2.5 0 0 1 17 5.5V6H3v-.5A2.5 2.5 0 0 1 5.5 3zm3 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 4.5c0 1.245-1 2.5-3.5 2.5S12 17.75 12 16.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5"
              />
            </svg>
            <span class="text-2xl font-bold text-red-800"
              >กำหนดข้อมูลผู้จัดจำหน่าย</span
            >
          </div>

          <div class="flex space-x-3">
            <buttonPrimary
              label="เพิ่มผู้จัดจำหน่าย"
              icon="plus"
              @click="onOpenModal('add')"
            />
            <!-- <button type="button" class="rounded-full " style="background-color: #A2422C">
                            <div class="flex space-x-3 items-center px-10 py-2 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                                    <path fill="#F1D6CF" fill-rule="evenodd"
                                        d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm4 9a.75.75 0 0 1-.75-.75v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 1.5 0v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5A.75.75 0 0 1 8 11"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-white font-semibold">เพิ่มข้อมูล</span>
                            </div>
                        </button> -->
          </div>
        </div>

        <div class="rounded-xl mb-10 overflow-auto">
          <tableManage
            :columns="columns"
            :rows="rows"
            :rowEdit="true"
            :rowRemove="true"
            @onClickEdit="onClickEdit"
            @onClickRemove="onClickRemove"
          />
        </div>
        <div class="flex justify-end">
          <paginationPage
            v-model:currentPage="pagination.page"
            :totalPages="pagination.totalPage"
            :limit="pagination.limit"
            @update:currentPage="onChangePagination"
          />
        </div>
      </div>
    </div>

    <!-- ----------------------------------------------------------------------------------------------------------------- -->

    <dialog id="modal-supplier" class="modal">
      <div class="modal-box w-11/12 max-w-3xl">
        <h3 class="font-bold text-lg">
          {{
            modeModal === "add" ? "เพิ่มผู้จัดจำหน่าย" : "แก้ไขผู้จัดจำหน่าย"
          }}
        </h3>
        <hr class="mt-2" style="border: 1px solid #c2796a" />
        <div class="py-4 flex flex-wrap">
          <div
            class="basis-1/2 px-3 space-y-2 mb-3"
            v-if="modeModal === 'edit'"
          >
            <label class="font-semibold">รหัสผู้จัดจำหน่าย</label><br />
            <input
              disabled
              v-model="formModal.in_specialID"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ชื่อ</label><br />
            <input
              v-model="formModal.in_firstName"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">สกุล</label><br />
            <input
              v-model="formModal.in_lastName"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">เบอร์โทร</label><br />
            <input
              v-model="formModal.in_phone"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ที่อยู่</label><br />
            <input
              v-model="formModal.in_address"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">จังหวัด</label><br />
            <select
              v-model="formModal.in_province"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              @change="(event) => onChangeProvince(event.target.value)"
            >
              <option value="">------เลือก------</option>
              <option
                v-for="(item, index) in ddl.province"
                :key="index"
                :value="item.id"
              >
                {{ item.name_th }}
              </option>
            </select>
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">อำเภอ</label><br />
            <select
              v-model="formModal.in_district"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              @change="(event) => onChangeDistrict(event.target.value)"
            >
              <option value="">------เลือก------</option>
              <option
                v-for="(item, index) in ddl.district"
                :key="index"
                :value="item.id"
              >
                {{ item.name_th }}
              </option>
            </select>
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">ตำบล</label><br />
            <select
              v-model="formModal.in_subDistrict"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              @change="(event) => onChangeSubDistrict(event.target.value)"
            >
              <option value="">------เลือก------</option>
              <option
                v-for="(item, index) in ddl.subDistrict"
                :key="index"
                :value="item.id"
              >
                {{ item.name_th }}
              </option>
            </select>
          </div>
          <div class="basis-1/2 px-3 space-y-2 mb-3">
            <label class="font-semibold">รหัสไปรษณีย์</label><br />
            <input
              v-model="formModal.in_zipCode"
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              readonly
            />
          </div>
        </div>
        <div class="modal-action">
          <buttonPrimary label="เพิ่ม" @click="onSubmitModal" />
          <buttonPrimaryOutline label="ปิด" @click="onCloseModal" />
        </div>
      </div>
    </dialog>

    <Alert
      :titleMessage="modalAlert.title"
      :bodyMessage="modalAlert.body"
      :status="modalAlert.status"
      @close-alert-modal="onCloseAlert"
    />
  </div>
</template>



<style></style>