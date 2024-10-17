6+3
<script setup>
import { onMounted, ref } from 'vue';
import { getLoginStorage } from '../../helpers/set-storage';
import buttonPrimary from '../buttons/button-primary.vue';
import buttonPrimaryOutline from '../buttons/button-primary-outline.vue';
// import confirm from '../alert/confirm.vue';
import menuItem from './menu.vue'
import { useRouter } from 'vue-router';
const $router = useRouter()
const emit = defineEmits()
const profile = ref(null)
const statusConfirm = ref(false)
const formModalConfirm = ref({
    titleMessage: "",
    bodyMessage: "",
    status: false
})


const onCoonfirmLogout = () => {
    formModalConfirm.value = {
        titleMessage: "ออกจากระบบ",
        bodyMessage: "ท่านต้องการออกจากระบบใช่หรือไม่ ?"
    }
    document.getElementById("confirm-logout").showModal()
    // statusConfirm.value = true
}

// const onLogOut = () => {
//     emit("logout-success")
// }

const onResultConfirm = (result) => {
    console.log("res---> ", result)
    formModalConfirm.value.status = result
    // statusConfirm.value = result
    if (result === true) {
        emit("logout-success")
    } else {
        statusConfirm.value = false
        document.getElementById("confirm-logout").close()
    }
}

onMounted(() => {
    const sessionStorage = getLoginStorage()
    profile.value = sessionStorage?.profile
})

</script>

<template>
    <div class="h-16 top-0 absolute w-full flex items-center justify-between px-6 "
        style="background-color: #A2422C; z-index: 100">
        <div class="flex space-x-8 items-center">
            <img src="../../assets/images/logo3.png" class="rounded-full h-14 w-14 cursor-pointer" @click="$router.push('/')" />
            <menuItem>
            </menuItem>
        </div>
        <div class="flex space-x-4 ">
            <div class="flex flex-col justify-end">
                <span class="font-bold text-white">{{ `${profile?.firstName} ${profile?.lastName}` }}</span>
                <span class="font-bold text-white">{{ profile?.role }}</span>
            </div>
            <button class="flex items-center space-x-3 px-6  text-white hover:text-black" @click="onCoonfirmLogout">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 8 8">
                    <path fill="currentColor" d="M3 0v1h4v5H3v1h5V0zm1 2v1H0v1h4v1l2-1.5z" />
                </svg>
            </button>
        </div>

        <!-- <confirm :titleMessage="formModalConfirm.titleMessage" :bodyMessage="formModalConfirm.bodyMessage" :status="formModalConfirm.status" @resultConfirm="resultConfirm" /> -->

        <dialog id="confirm-logout" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">{{ formModalConfirm.titleMessage }}</h3>
                <p class="py-4">{{ formModalConfirm.bodyMessage }}</p>
                <div class="modal-action">
                    <button type="button" @click="onResultConfirm(true)"
                        class="font-semibold px-8 py-2 border-red-800 rounded-full text-white bg-red-800 hover:bg-white hover:text-red-800 hover:outline hover:outline-1 ">
                        <div class="flex justify-center items-center space-x-3">
                            <span>ใช่</span>
                        </div>
                    </button>
                    <button type="button" @click="onResultConfirm(false)"
                        class="font-semibold px-8 py-2 border border-2 border-red-800 rounded-full text-red-800 hover:bg-red-800 hover:text-white">
                        ไม่ใช่
                    </button>
                    <!-- <buttonPrimary label="ใช่" @click="onResultConfirm(true)" />
                    <buttonPrimaryOutline label="ไม่ใช่" @click="onResultConfirm(false)" /> -->
                </div>
            </div>
        </dialog>
    </div>

</template>



<style></style>