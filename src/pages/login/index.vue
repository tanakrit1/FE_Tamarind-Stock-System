<script setup>
import { ref } from 'vue';
import _apiAuthen from '../../api/auth'
import { setLoginStorage } from '../../helpers/set-storage';
import Alert from '../../components/alert/alert.vue';
import store from '../../store';

const emit = defineEmits()
const formLogin = ref({
    username: '',
    password: ''
})
const formAlertModal = ref({
    status: false,
    titleMessage: "",
    bodyMessage: ""
})

const onCloseAlert = () => {
    formAlertModal.value.status = false
}

const onLogin = async () => {
    store.commit('setStatusLoading', true)
    await _apiAuthen.onLogin(formLogin.value, response => {
        console.log("response--> ", response)
        if (response?.statusCode === 200) {
            setLoginStorage(response.data.profile, response.data.access_token)
            emit('login-success')
        } else {
            formAlertModal.value = {
                status: true,
                titleMessage: "เกิดข้อผิดพลาด",
                bodyMessage: response?.data?.description
            }
        }
        store.commit('setStatusLoading', false)
    })
    // emit('login-success')
}
</script>

<template>
    <div class="w-screen h-screen flex flex-col lg:flex-row  lg:items-start lg:justify-start  bg-orange-50 ">
        <div class="pt-8 px-5 lg:px-40">
            <!-- <p class="text-3xl font-extrabold ">ระบบจัดการคลังสินค้ามะขาม</p> -->
            <p class="text-xl font-extrabold ">การเพิ่มขีดความสามารถในการประกอบการของเครือข่ายธุรกิจมะขามสามเกลอให้เข้มแข็ง </p>
            <p class="text-xl font-extrabold "> บนฐานการผลิตโดยชุมชนเพื่อชุมชน</p>
        </div>
        <div class="flex lg:justify-start lg:items-start px-5 pt-32 lg:pt-30 lg:pl-40 lg:absolute ">
            <img class="rounded-3xl border-4 border-[#A2422C]" src="../../assets/images/logo2.png" />
        </div>

        <!-- ------------------------------------------------------------------------------------------------- -->

        <form @submit.prevent="onLogin">
            <div class="flex justify-center items-center">
                <div class="absolute lg:right-40 rounded-3xl w-1/1 md:w-1/2 lg:w-1/3 shadow top-1/3 lg:top-1/4 px-10 lg:px-20 py-16 lg:py-24"
                    style="background-color: #A2422C; ">
                    <span class="text-3xl font-extrabold text-white">Sign In</span>
                    <div class="flex flex-col  space-y-1 mt-6 lg:mt-12">
                        <label class="text-white font-bold">Username</label>
                        <input v-model="formLogin.username"
                            class="h-12 bg-inherit text-white outline-none border-b border-gray-400 px-2 hover:border-white focus:border-white"
                            type="text" />
                    </div>
                    <div class="flex flex-col space-y-1 mt-3 lg:mt-6">
                        <label class="text-white font-bold">Password</label>
                        <input v-model="formLogin.password"
                            class="h-12 bg-inherit text-white outline-none border-b border-gray-400 px-2 hover:border-white focus:border-white"
                            type="password" />
                    </div>
                    <!-- <div class="flex flex-col space-y-1 mt-3 lg:mt-6">
                        <div class="flex items-center space-x-3">
                            <input type="checkbox" class="checkbox checkbox-primary bg-white" />
                            <label class="text-white ">จดจำผู้ใช้งานในระบบ</label>
                        </div>
                    </div> -->
                    <div class="mt-10 mb-2">
                        <button type="submit"
                            class="bg-white rounded-full px-8 py-1 text-orange-700 hover:bg-orange-100">เข้าสู่ระบบ</button>
                    </div>
                    <span class="text-white font-semibold pl-2 ">version 0.0.1</span>
                </div>
            </div>
        </form>

        <Alert @close-alert-modal="onCloseAlert" :status="formAlertModal.status" :titleMessage="formAlertModal.titleMessage"
            :bodyMessage="formAlertModal.bodyMessage" />
    </div>
</template>



<style></style>