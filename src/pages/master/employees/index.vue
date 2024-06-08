<script setup>
// import ButtonPrimaryOutline from '../../../components/buttons/button-primary-outline.vue';
import buttonPrimary from '../../../components/buttons/button-primary.vue';
import buttonPrimaryOutline from '../../../components/buttons/button-primary-outline.vue';
import { onMounted, ref } from 'vue';
import tableManage from '../../../components/tables/table-manage.vue';
import _apiUser from '../../../api/master-user'
import store from '../../../store';
import Alert from '../../../components/alert/alert.vue';
import paginationPage from '../../../components/pagination/pagination-page.vue';

const pagination = ref({
    page: 1,
    limit: 5,
    totalPage: 0
});

const columns = [
    { field: "employeeID", label: "รหัสพนักงาน", width: "10%" },
    { field: "firstName", label: "ชื่อ", width: "20%" },
    { field: "lastName", label: "สกุล", width: "20%" },
    { field: "username", label: "ชื่อผู้ใช้", width: "20%" },
    { field: "role", label: "สิทธิ์", width: "30%" },

]
// const rows = ref([
//     { employeeID: "0000", firstName: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
// ])
const rows = ref([])
const modalAlert = ref({
    status: false,
    title: "",
    body: "",
})

const formModal = ref({
    in_employeeID: "",
    in_username: "",
    in_password: "",
    in_confirmPassword: "",
    in_firstName: "",
    in_lastName: "",
    in_role: "ผู้ดูแลระบบ"
})
const modeModal = ref("add")
const rowAction = ref(null)



const onClearFormModal = () => {
    formModal.value = {
        in_employeeID: "",
        in_username: "",
        in_password: "",
        in_confirmPassword: "",
        in_firstName: "",
        in_lastName: "",
        in_role: "ผู้ดูแลระบบ"
    }
}

const onClickEdit = (row) => {
    rowAction.value = row
    onOpenModal("edit")

}

// const onClickRemove = async (row) => {
//     await _apiUser.delete(row.username, async (response) => {
//         if (response.statusCode === 200) {
//             modalAlert.value = {
//                 status: true,
//                 title: "สำเร็จ",
//                 body: "ลบข้อมูลสำเร็จ"
//             }
//             await onLoadData()
//         } else {
//             const mapValidation = response.message.map(item => {
//                 return `<li>${item}</li>`
//             })
//             modalAlert.value = {
//                 status: true,
//                 title: "กรุณาตรวจสอบ",
//                 body: mapValidation.join('')
//             }
//         }
//     })
// }

const onOpenModal = (mode) => {
    modeModal.value = mode
    if (mode === "add") {
        onClearFormModal()
    } else {
        formModal.value = {
            in_employeeID: rowAction.value.employeeID,
            in_username: rowAction.value.username,
            // in_password: rowAction.value.password,
            // in_confirmPassword: rowAction.value.confirmPassword,
            in_firstName: rowAction.value.firstName,
            in_lastName: rowAction.value.lastName,
            in_role: rowAction.value.role
        }
    }
    document.getElementById("modal-employee").showModal()
}

const fnValidationPassword = () => {
    if (formModal.value.in_password === formModal.value.in_confirmPassword) {
        return true
    } else {
        modalAlert.value = {
            status: true,
            title: "กรุณาตรวจสอบ",
            body: "กรุณาตรวจสอบรหัสผ่าน"
        }
    }
}

const onSubmitModal = async () => {
    const fnValid = fnValidationPassword()
    if (fnValid) {
        if (modeModal.value === "add") {
            const body = {
                employeeID: formModal.value.in_employeeID,
                username: formModal.value.in_username,
                password: formModal.value.in_password,
                firstName: formModal.value.in_firstName,
                lastName: formModal.value.in_lastName,
                role: formModal.value.in_role
            }
            await _apiUser.create(body, async (response) => {
                if (response.statusCode === 200) {
                    modalAlert.value = {
                        status: true,
                        title: "สำเร็จ",
                        body: "บันทึกข้อมูลสำเร็จ"
                    }
                    onCloseModal()
                    await onLoadData()
                } else {
                    const mapValidation = response.message.map(item => {
                        return `<li>${item}</li>`
                    })
                    modalAlert.value = {
                        status: true,
                        title: "กรุณาตรวจสอบ",
                        body: mapValidation.join('')
                    }
                }

            })
        } else {
            const body = {
                employeeID: formModal.value.in_employeeID,
                username: formModal.value.in_username,
                password: formModal.value.in_password,
                firstName: formModal.value.in_firstName,
                lastName: formModal.value.in_lastName,
                role: formModal.value.in_role
            }
            await _apiUser.update(body, rowAction.value.username, async (response) => {
                if (response.statusCode === 200) {
                    modalAlert.value = {
                        status: true,
                        title: "สำเร็จ",
                        body: "แก้ไขข้อมูลสำเร็จ"
                    }
                    onCloseModal()
                    await onLoadData()
                } else {
                    const mapValidation = response.message.map(item => {
                        return `<li>${item}</li>`
                    })
                    modalAlert.value = {
                        status: true,
                        title: "กรุณาตรวจสอบ",
                        body: mapValidation.join('')
                    }
                }
            })
        }
    }
}

const onCloseModal = () => {
    document.getElementById("modal-employee").close()
}

const onCloseAlert = () => {
    modalAlert.value.status = false
}

const onLoadData = async () => {
    const body = {
        page: pagination.value.page,
        limit:  pagination.value.limit,
    }
    await _apiUser.search(body, response => {
        rows.value = response.data
        pagination.value.totalPage = response.metadata.totalPage
    })
}

const onChangePagination = (val) => {
  pagination.page = val;
  onLoadData();
};
onMounted(async () => {
    store.commit('setStatusLoading', true)
    await onLoadData()
    onClearFormModal()
    store.commit('setStatusLoading', false)
})

</script>

<template>
    <div>
        <div class="flex md:justify-center">
            <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-10 space-y-10">
                <div class="flex justify-between">
                    <div class="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="#A2422C"
                                d="M12 2a5 5 0 1 1-5 5l.005-.217A5 5 0 0 1 12 2m2 12a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5z" />
                        </svg>
                        <span class="text-2xl font-bold text-red-800">กำหนดข้อมูลผู้ใช้งาน</span>
                    </div>

                    <div class="flex space-x-3">
                        <buttonPrimary label="เพิ่มผู้ใช้งาน" icon="plus" @click="onOpenModal('add')" />
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

                <div class="rounded-xl mb-10 overflow-auto ">
                    <tableManage :columns="columns" :rows="rows" :rowEdit="true"
                        @onClickEdit="onClickEdit"  />
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
            <div class="modal-box w-11/12 max-w-3xl ">
                <h3 class="font-bold text-lg">{{ modeModal === 'add' ? 'เพิ่มผู้ใช้งาน' : 'แก้ไขผู้ใช้งาน' }}</h3>
                <hr class="mt-2" style="border: 1px solid #c2796a">
                <div class="py-4 flex flex-wrap">
                    <div class="basis-1/5 px-3 space-y-2 mb-3">
                        <label class="font-semibold">รหัสผู้ใช้งาน</label><br>
                        <input type="text" class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                            v-model="formModal.in_employeeID" />
                    </div>
                    <div class="basis-2/5 px-3 space-y-2 mb-3">
                        <label class="font-semibold">ชื่อ</label><br>
                        <input type="text" class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                            v-model="formModal.in_firstName" />
                    </div>
                    <div class="basis-2/5 px-3 space-y-2 mb-3">
                        <label class="font-semibold">สกุล</label><br>
                        <input type="text" class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                            v-model="formModal.in_lastName" />
                    </div>
                    <div class="basis-2/6 px-3 space-y-2 mb-3">
                        <label class="font-semibold">ชื่อผู้ใช้</label><br>
                        <input type="text" class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                            v-model="formModal.in_username" />
                    </div>
                    <div class="basis-2/6 px-3 space-y-2 mb-3">
                        <label class="font-semibold">รหัสผ่าน</label><br>
                        <input type="password" class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                            v-model="formModal.in_password" />
                    </div>
                    <div class="basis-2/6 px-3 space-y-2 mb-3">
                        <label class="font-semibold">ยืนยันรหัสผ่าน</label><br>
                        <input type="password" class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3"
                            v-model="formModal.in_confirmPassword" />
                    </div>

                    <div class="basis-1/2 px-3 space-y-2 mb-3">
                        <label class="font-semibold">สิทธิ์การใช้งานระบบ</label><br>
                        <div class="flex flex-col space-y-2">
                            <div class="flex space-x-3">
                                <input type="radio" name="role" value="ผู้ดูแลระบบ" class="radio radio-primary"
                                    v-model="formModal.in_role" />
                                <label class="font-semibold">ผู้ดูแลระบบ</label>
                            </div>
                            <div class="flex space-x-3">
                                <input type="radio" name="role" value="ผู้ใช้งาน" class="radio radio-primary"
                                    v-model="formModal.in_role" />
                                <label class="font-semibold">ผู้ใช้งาน</label>
                            </div>

                        </div>

                    </div>



                </div>
                <div class="modal-action">
                    <buttonPrimary :label="modeModal == 'add' ? 'เพิ่ม' : 'แก้ไข'" @click="onSubmitModal" />
                    <buttonPrimaryOutline label="ปิด" @click="onCloseModal" />
                </div>
            </div>
        </dialog>

        <Alert :titleMessage="modalAlert.title" :bodyMessage="modalAlert.body" :status="modalAlert.status"
            @close-alert-modal="onCloseAlert" />
    </div>
</template>



<style></style>