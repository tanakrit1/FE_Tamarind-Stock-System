<script setup>
import { ref, watch } from 'vue';
import confirm from '../alert/confirm.vue';
const props = defineProps(['columns', 'rows', 'rowEdit', 'rowRemove', 'rowTranform', 'trickerClear'])
const emit = defineEmits()
const rowClick = ref({})
const formModalConfirm = ref({
    titleMessage: "xxxxx",
    bodyMessage: "YYYY",
    status: false
})

const onCloseModalConfirm = (result) => {
    if (result === true) {
        emit('onClickRemove', rowClick.value)
        formModalConfirm.value.status = false
    } else {
        formModalConfirm.value.status = false
    }

}

const onClickRemove = (rowData) => {
    rowClick.value = rowData
    // formModalConfirm.value.status = true
    formModalConfirm.value = {
        titleMessage: "ลบข้อมูล",
        bodyMessage: "ท่านต้องการลบข้อมูลนี้ใช่หรือไม่ ?",
        status: true
    }
}

const onClickTranform = (row) => {
    rowClick.value = row
    console.log("---> ", document.body.scrollHeight)
    // document.getElementById('btn-save').scrollIntoView({
    //     behavior: 'smooth'
    // });

    window.scrollTo({
        bottom: document.body.scrollHeight,
        behavior: 'smooth'
    });
    emit('onClickTranform', row)
}

watch(() => props.trickerClear, () => {
    rowClick.value = {}
})


</script>

<template>
    <table class="table ">
        <thead>
            <tr style="background-color: #A2422C;">
                <th v-for="(column, index) in props.columns" :key="index" class="text-white text-lg"
                    :style="`width: ${column.width}`">{{ column.label }}</th>
                <th v-if="props.rowEdit || props.rowRemove || props.rowTranform"></th>
            </tr>
        </thead>
        <tbody class="bg-white">
            <tr v-for="(row, index) in props.rows" :key="index"
                :class="{ 'hover:bg-red-100': true, 'bg-red-100': rowClick.id === row.id }">
                <td v-for="(column, index) in props.columns" :key="index" class="font-semibold">{{ row[column.field] }}
                </td>
                <td v-if="props.rowEdit || props.rowRemove || props.rowTranform">
                    <div class="flex space-x-6 ">
                        <button type="button" class="rounded-full hover:bg-red-100 px-2 py-2" v-if="props.rowEdit"
                            @click="emit('onClickEdit', row)">
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 22H21.625M18.5 9.5L22.25 5.75L17.25 0.75L13.5 4.5M18.5 9.5L6 22H1V17L13.5 4.5M18.5 9.5L13.5 4.5"
                                    stroke="#C2796A" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>

                        <button type="button" class="rounded-full hover:bg-red-100 px-2 py-2" v-if="props.rowRemove"
                            @click="onClickRemove(row)">
                            <svg width="23" height="23" viewBox="0 0 30 30" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.5 3.75C1.5 2.50735 2.50735 1.5 3.75 1.5H26.25C27.4926 1.5 28.5 2.50735 28.5 3.75C28.5 4.99265 27.4926 6 26.25 6H3.75C2.50735 6 1.5 4.99265 1.5 3.75Z"
                                    fill="#C2796A" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M3.51646 8.72926C3.07138 9.20853 3.12726 9.96289 3.23901 11.4716L3.72472 18.0287C4.06894 22.6757 4.24105 24.9992 5.62488 26.5274C5.85727 26.784 6.11143 27.0201 6.38454 27.2328C8.01075 28.5 10.3406 28.5 15.0004 28.5C19.6601 28.5 21.9899 28.5 23.6162 27.2328C23.8894 27.0201 24.1435 26.784 24.3758 26.5274C25.7597 24.9992 25.9318 22.6757 26.276 18.0287L26.7617 11.4716C26.8735 9.96289 26.9294 9.20853 26.4842 8.72926C26.0392 8.25 25.2827 8.25 23.77 8.25H6.23082C4.71796 8.25 3.96154 8.25 3.51646 8.72926Z"
                                    fill="#F1D6CF" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.5531 14.5795C11.9925 14.1402 12.7048 14.1402 13.1441 14.5795L15.0003 16.4356L16.8564 14.5795C17.2957 14.1402 18.0081 14.1402 18.4474 14.5795C18.8868 15.0189 18.8868 15.7311 18.4474 16.1704L16.5913 18.0267L18.4474 19.8828C18.8868 20.3221 18.8868 21.0345 18.4474 21.4738C18.0081 21.9132 17.2957 21.9132 16.8564 21.4738L15.0003 19.6176L13.1441 21.4738C12.7048 21.9132 11.9925 21.9132 11.5531 21.4738C11.1138 21.0345 11.1138 20.3221 11.5531 19.8828L13.4093 18.0267L11.5531 16.1704C11.1138 15.7311 11.1138 15.0189 11.5531 14.5795Z"
                                    fill="#C2796A" />
                            </svg>
                        </button>

                        <button type="button" class="rounded-full hover:bg-red-100 px-2 py-2" v-if="props.rowTranform"
                            @click="onClickTranform(row)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
                                <path fill="#E69329" d="m11.7 21.6l5.1 9.9l9.5-3.9l4.4-12.7l-14.8.8z" />
                                <circle cx="15" cy="36" r="7.8" fill="#C2796A" />
                                <g fill="#C2796A">
                                    <path
                                        d="M15 27c-5 0-9 4-9 9s4 9 9 9s9-4 9-9s-4-9-9-9m0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7s7 3.1 7 7s-3.1 7-7 7" />
                                    <path d="M14 33h2v8h-2z" />
                                </g>
                                <g fill="#FFB74D">
                                    <path
                                        d="M12.9 36c1 1.9 3.2 2.7 5.1 1.7l16.5-8.5c1-.5 1.7-1.2 2.2-1.9c1.7-3.2 5.6-10.7 8.2-17.2l-18.2 8.7l-4.8 7.2l-6.8 3.6c-2.6 1.3-3.4 4.2-2.2 6.4" />
                                    <path
                                        d="M30.2 3L13.7 9.3c-.7.2-1.5 1-2.2 1.7l-5.6 7.5c-1 1.5-1.2 3.4-.5 5.1c.4 1 1.7 3.4 3.1 6.1C10.1 28 12.4 27 15 27c.4 0 .9 0 1.3.1l-2.1-4.2l4.6-4.1h8s15.5-2.2 18.2-8.7z" />
                                </g>
                                <path fill="#FFCDD2"
                                    d="M18.2 36c-1.3.6-2.8 0-3.3-1.3c-.6-1.3 0-2.8 1.3-3.3c1.2-.6 3.2 4 2 4.6" />
                            </svg>
                        </button>


                    </div>
                </td>
            </tr>
        </tbody>

        <confirm :status="formModalConfirm.status" :titleMessage="formModalConfirm.titleMessage"
            :bodyMessage="formModalConfirm.bodyMessage" @resultConfirm="onCloseModalConfirm" />
    </table>



</template>



<style></style>