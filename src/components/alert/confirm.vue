<script setup>
import { watch } from 'vue';
import buttonPrimaryOutline from '../buttons/button-primary-outline.vue';
import buttonPrimary from '../buttons/button-primary.vue';

const props = defineProps(["titleMessage", "bodyMessage", "status"])
const emit = defineEmits()

watch(() => props.status, (val) => {
    if (val == true) {
        document.getElementById("alert-modal").showModal()
    }else{
        document.getElementById("alert-modal").close()
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
        <dialog id="alert-modal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">{{ props.titleMessage }}</h3>
                <p class="py-4">{{ props.bodyMessage }}</p>
                <div class="modal-action">
                        <!-- if there is a button in form, it will close the modal -->
                        <buttonPrimary label="ใช่" @click="onResultConfirm(true)" />
                        <buttonPrimaryOutline label="ไม่ใช่"  @click="onResultConfirm(false)"/>

                        <!-- <button class="rounded-full btn" @click="emit('close-alert-modal')">ใช่</button>
                        <button class="btn" @click="emit('close-alert-modal')">ไม่ใช่</button> -->
                </div>
            </div>
        </dialog>
    </div>
</template>


<style></style>