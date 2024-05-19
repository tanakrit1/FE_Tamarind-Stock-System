<script setup>
import { watch } from 'vue';
import buttonPrimaryOutline from '../buttons/button-primary-outline.vue';
import buttonPrimary from '../buttons/button-primary.vue';

const props = defineProps(["titleMessage", "bodyMessage", "status"])
const emit = defineEmits()

watch(() => props.status, (val) => {
    if (val == true) {
        document.getElementById("confirm-modal").showModal()
    }else{
        document.getElementById("confirm-modal").close()
    }
})

const onResultConfirm = (result) => {
    emit('resultConfirm', result)
}
// const onCloseModalConfirm = (result) => {
//     console.log("resultB--> ", result)
//     // emit('closeModalConfirm', result)
// }




</script>
<template>
    <div>
        <dialog id="confirm-modal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">{{ props.titleMessage }}</h3>
                <p class="py-4">{{ props.bodyMessage }}</p>
                <div class="modal-action">
                        <buttonPrimary label="ใช่" @click="onResultConfirm(true)" />
                        <buttonPrimaryOutline label="ไม่ใช่"  @click="onResultConfirm(false)"/>
                </div>
            </div>
        </dialog>
    </div>
</template>


<style></style>