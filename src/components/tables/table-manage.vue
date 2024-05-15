<script setup>
import { ref } from 'vue';
import confirm from '../alert/confirm.vue';
const props = defineProps(['columns', 'rows', 'rowEdit', 'rowRemove'])
const emit = defineEmits()
const rowClick = ref({})
const formModalConfirm = ref({
    titleMessage: "xxxxx",
    bodyMessage: "xxxxx",
    status: false
})

const onCloseModalConfirm = (result) => {
    if( result === true ){  
        emit('onClickRemove', rowClick.value)
        formModalConfirm.value.status = false
    }else{
        formModalConfirm.value.status = false
    }
    
}

const onClickRemove = (rowData) => {
    rowClick.value = rowData
    formModalConfirm.value.status = true
}


</script>

<template>
    <table class="table ">
        <thead>
            <tr style="background-color: #A2422C;">
                <th v-for="(column, index) in props.columns" :key="index" class="text-white text-lg"
                    :style="`width: ${column.width}`">{{ column.label }}</th>
                <th v-if="props.rowEdit || props.rowRemove"></th>
            </tr>
        </thead>
        <tbody class="bg-white">
            <tr v-for="(row, index) in props.rows" :key="index">
                <td v-for="(column, index) in props.columns" :key="index" class="font-semibold">{{ row[column.field] }}</td>
                <td v-if="props.rowEdit || props.rowRemove">
                    <div class="flex space-x-6 ">
                        <button class="rounded-full hover:bg-red-100 px-2 py-2" v-if="props.rowEdit"
                            @click="emit('onClickEdit', row)">
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 22H21.625M18.5 9.5L22.25 5.75L17.25 0.75L13.5 4.5M18.5 9.5L6 22H1V17L13.5 4.5M18.5 9.5L13.5 4.5"
                                    stroke="#C2796A" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>

                        <button class="rounded-full hover:bg-red-100 px-2 py-2" v-if="props.rowRemove"
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


                    </div>
                </td>
            </tr>
        </tbody>

        <confirm :status="formModalConfirm.status" :titleMessage="formModalConfirm.titleMessage"
            :bodyMessage="formModalConfirm.bodyMessage" @resultConfirm="onCloseModalConfirm" />
    </table>



</template>



<style></style>