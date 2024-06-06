<script setup>
// import ButtonPrimaryOutline from '../../../components/buttons/button-primary-outline.vue';
import buttonPrimary from "../../../components/buttons/button-primary.vue";
import buttonPrimaryOutline from "../../../components/buttons/button-primary-outline.vue";
import { onMounted, ref } from "vue";
import tableManage from "../../../components/tables/table-manage.vue";
import _apiProduct from "../../../api/master-products";
import Alert from "../../../components/alert/alert.vue";
import store from "../../../store";
import paginationPage from "../../../components/pagination/pagination-page.vue";

const pagination = ref({
  page: 1,
  limit: 1,
  totalPage: 0,
});

const columns = [
  { field: "specialID", label: "รหัสสินค้า", width: "20%" },
  { field: "name", label: "ชื่อสินค้า", width: "20%" },
  { field: "type", label: "ประเภทสินค้า", width: "20%" },
  { field: "price", label: "ราคาราคาขื้อเข้า", width: "20%" },
  { field: "priceOut", label: "ราคาขายออก", width: "20%" },
  // { field: "permission", label: "สิทธิ์", width: "17%" },
];
// const rows = ref([
//     { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
//     { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
//     { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
//     { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
//     { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
//     { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },

// ])

const rows = ref([]);

const formModal = ref({
  in_id: "",
  in_specialID: "",
  in_name: "",
  in_price: "",
  in_price_out: "",
  in_type: "",
});
const modeModal = ref("add");
const rowAction = ref(null);

const modalAlert = ref({
  status: false,
  title: "",
  body: "",
});

const onClearFormModal = () => {
  formModal.value = {
    in_id: "",
    in_specialID: "",
    in_name: "",
    in_price: "",
    in_price_out: "",
    in_type: "",
  };
};

const onClickEdit = (row) => {
  console.log("onClickEdit--> ", row);
  rowAction.value = row;
  onOpenModal("edit");
};

const onClickRemove = async (row) => {
  console.log("onClickRemove--> ", row);
  await _apiProduct.delete(row.id, async (response) => {
    if (response.statusCode === 200) {
      modalAlert.value = {
        status: true,
        title: "สำเร็จ",
        body: "ลบข้อมูลสำเร็จ",
      };
      await onLoadData();
    } else {
      //   console.log("response.message --> ", response.message);
      let mapValidation = "";
      if (Array.isArray(response.message)) {
        mapValidation = response.message
          .map((item) => {
            return `<li>${item}</li>`;
          })
          .join("");
      } else {
        mapValidation = response.message; // Assuming response.message is a string
      }
      modalAlert.value = {
        status: true,
        title: "กรุณาตรวจสอบ",
        body: mapValidation,
      };
    }
  });
};

const onOpenModal = (mode) => {
  modeModal.value = mode;
  if (mode === "add") {
    onClearFormModal();
  } else {
    console.log("edit--> ", rowAction.value);
    formModal.value = {
      in_id: rowAction.value.id,
      in_specialID: rowAction.value.specialID,
      in_name: rowAction.value.name,
      in_price: Number(rowAction.value.price),
      in_price_out: Number(rowAction.value.priceOut),
      in_type: rowAction.value.type,
    };
  }
  document.getElementById("modal-employee").showModal();
};

const onSubmitModal = async () => {
  console.log("***Submit***");
  if (modeModal.value === "add") {
    console.log("***Add***");
    const body = {
      specialID: formModal.value.in_specialID,
      name: formModal.value.in_name,
      price: Number(formModal.value.in_price),
      priceOut: Number(formModal.value.in_price_out),
      type: formModal.value.in_type,
    };
    await _apiProduct.create(body, async (response) => {
      console.log("responseCreate --> ", response);
      if (response.statusCode === 200) {
        console.log("responseCreate --> ", response);
        modalAlert.value = {
          status: true,
          title: "สำเร็จ",
          body: "บันทึกข้อมูลสำเร็จ",
        };

        onCloseModal();
        await onLoadData();
      } else {
        let mapValidation = "";
        if (Array.isArray(response.message)) {
          mapValidation = response.message
            .map((item) => {
              return `<li>${item}</li>`;
            })
            .join("");
        } else {
          mapValidation = response.message; // Assuming response.message is a string
        }
        modalAlert.value = {
          status: true,
          title: "กรุณาตรวจสอบ",
          body: mapValidation,
        };
      }
    });
  } else {
    console.log("***Edit***");
    const body = {
      //   id: formModal.value.in_id,
      //   specialID: formModal.value.in_specialID,
      name: formModal.value.in_name,
      price: Number(formModal.value.in_price),
      priceOut: Number(formModal.value.in_price_out),
      type: formModal.value.in_type,
    };
    await _apiProduct.update(body, rowAction.value.id, async (response) => {
      console.log("responseUpdate --> ", response);
      if (response.statusCode === 200) {
        console.log("responseUpdate --> ", response);
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
  document.getElementById("modal-employee").close();
};

const onCloseAlert = () => {
  modalAlert.value.status = false;
};

const onLoadData = async () => {
  const body = {
    page: pagination.value.page,
    limit: pagination.value.limit,
  };
  await _apiProduct.search(body, (response) => {
    if (response.statusCode === 200) {
      console.log("response --> ", response);
      rows.value = response.data;
      pagination.value.totalPage = response.metadata.totalPage;
    }
  });
};

const onChangePagination = (val) => {
  pagination.page = val;
  onLoadData();
};

onMounted(async () => {
  store.commit("setStatusLoading", true);
  await onLoadData();
  onClearFormModal();
  store.commit("setStatusLoading", false);
});
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
              viewBox="0 0 16 16"
            >
              <path
                fill="#A2422C"
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"
              />
            </svg>
            <span class="text-2xl font-bold text-red-800"
              >กำหนดข้อมูลสินค้า</span
            >
          </div>

          <div class="flex space-x-3">
            <buttonPrimary
              label="เพิ่มสินค้า"
              icon="plus"
              @click="onOpenModal('add')"
            />
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

    <!-- ----------------------------------------------------------------------------------------------------------------- -->

    <dialog id="modal-employee" class="modal">
      <div class="modal-box w-11/12 max-w-3xl">
        <h3 class="font-bold text-lg">
          {{ modeModal === "add" ? "เพิ่มสินค้า" : "แก้ไขสินค้า" }}
        </h3>
        <hr class="mt-2" style="border: 1px solid #c2796a" />
        <div class="py-4 flex flex-wrap">
          <div class="basis-1/2 px-3 space-y-2" v-if="modeModal === 'edit'">
            <label>รหัสสินค้า</label><br />
            <input
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formModal.in_specialID"
              disabled
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2">
            <label>ชื่อสินค้า</label><br />
            <input
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formModal.in_name"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2">
            <label for="productType">ประเภทสินค้า</label><br />
            <select
              name="productType"
              id="productType"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formModal.in_type"
            >
              <option value="ซื้อ-ขาย">ซื้อ-ขาย</option>
              <option value="ฝาก">ฝาก</option>
            </select>
          </div>

          <div class="basis-1/2 px-3 space-y-2">
            <label>ราคาขื้อเข้า</label><br />
            <input
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formModal.in_price"
            />
          </div>
          <div class="basis-1/2 px-3 space-y-2">
            <label>ราคาขายออก</label><br />
            <input
              type="text"
              class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
              v-model="formModal.in_price_out"
            />
          </div>
          
        </div>
        <div class="modal-action">
          <buttonPrimary
            :label="modeModal == 'add' ? 'เพิ่ม' : 'แก้ไข'"
            @click="onSubmitModal"
          />
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