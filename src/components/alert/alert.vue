<script setup>
import { watch } from 'vue';

const props = defineProps(["titleMessage", "bodyMessage", "status"])
const emit = defineEmits()

watch(() => props.status, (val) => {
    if (val == true) {
        document.getElementById("alert-modal").showModal()
    }else{
        document.getElementById("alert-modal").close()
    }
})
</script>
<template>
    <div>
        <dialog id="alert-modal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">{{ props.titleMessage }}</h3>
                <!-- {{ props.bodyMessage }} -->
                <div v-html="props.bodyMessage"></div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn" @click="emit('close-alert-modal')">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>


<style></style>