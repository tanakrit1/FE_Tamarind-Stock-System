<script setup>
// import ButtonPrimaryOutline from '../../../components/buttons/button-primary-outline.vue';
import buttonPrimary from '../../../components/buttons/button-primary.vue';
import buttonPrimaryOutline from '../../../components/buttons/button-primary-outline.vue';
import { ref } from 'vue';
import tableManage from '../../../components/tables/table-manage.vue';

const columns = [
    { field: "id", label: "รหัสพนักงาน", width: "15%" },
    { field: "name", label: "ชื่อผู้ใช้", width: "17%" },
    { field: "position", label: "ตําแหน่ง", width: "17%" },
    { field: "department", label: "แผนก", width: "17%" },
    { field: "permission", label: "สิทธิ์", width: "17%" },
]
const rows = ref([
    { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
    { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
    { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
    { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
    { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },
    { id: "0000", name: "AAAAA", position: "BBBBB", department: "CCCCC", permission: "DDDDD" },

])

const modeModal = ref("add")
const rowAction = ref(null)

const onClickEdit = (row) => {
    console.log("onClickEdit--> ", row)
    onOpenModal("edit")
    rowAction.value = row
}

const onClickRemove = (row) => {
    console.log("onClickRemove--> ", row)
}

const onOpenModal = (mode) => {
    modeModal.value = mode
    if (mode === "add") {

    } else {

    }
    document.getElementById("modal-employee").showModal()
}

const onSubmitModal = () => {
    console.log("***Submit***")
    if( modeModal.value === "add"){
        console.log("***Add***")
    }else{
        console.log("***Edit***")
    }
}

const onCloseModal = () => {
    document.getElementById("modal-employee").close()
}

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
                    <tableManage :columns="columns" :rows="rows" :rowEdit="true" :rowRemove="true"
                        @onClickEdit="onClickEdit" @onClickRemove="onClickRemove" />
                </div>
            </div>
        </div>

        <!-- ----------------------------------------------------------------------------------------------------------------- -->

        <dialog id="modal-employee" class="modal">
            <div class="modal-box w-11/12 max-w-3xl ">
                <h3 class="font-bold text-lg">{{ modeModal === 'add' ? 'เพิ่มผู้ใช้งาน' : 'แก้ไขผู้ใช้งาน' }}</h3>
                <hr class="mt-2" style="border: 1px solid #c2796a">
                <div class="py-4 flex flex-wrap">
                    <div class="basis-1/2 px-3 space-y-2">
                        <label>99</label><br>
                        <input type="text" class="h-8 w-full focus:outline-red-400 rounded bg-red-100 px-3" />
                    </div>
                </div>
                <div class="modal-action">

                    <buttonPrimary label="เพิ่ม" @click="onSubmitModal" />
                    <buttonPrimaryOutline label="ปิด" @click="onCloseModal" />
                </div>
            </div>
        </dialog>


    </div>
</template>



<style></style>