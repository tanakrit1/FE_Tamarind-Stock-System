<script setup>
import { useRouter } from 'vue-router';
const emit = defineEmits()

// const $router = useRouter()
const onLogin = () => {
    emit('signin-success')
}
</script>

<template>
    <div class="w-screen h-screen flex flex-col lg:flex-row  lg:items-start lg:justify-start  bg-orange-50 ">
        <div class="pt-5 px-5 lg:px-40">
            <p class="text-3xl font-extrabold ">ระบบจัดการคลังสินค้ามะขาม</p>
            <p class="text-lg font-extrabold ">โครงการส่งเสริมธุรกิจพื้นบ้านจังหวัดอุตรดิตถ์</p>
        </div>
        <div class="flex lg:justify-start lg:items-start px-5 pt-32 lg:pt-24 lg:pl-40 lg:absolute">
            <img class="rounded-3xl " src="../../assets//images/banner-login.jpg" />
        </div>

        <!-- ------------------------------------------------------------------------------------------------- -->

        <form @submit.prevent="onLogin">
            <div class="flex justify-center items-center">
                <div class="absolute lg:right-40 rounded-3xl w-1/1 md:w-1/2 lg:w-1/3 shadow top-1/3 lg:top-1/4 px-10 lg:px-20 py-16 lg:py-24"
                    style="background-color: #A2422C; ">
                    <span class="text-3xl font-extrabold text-white">Sign In</span>
                    <div class="flex flex-col  space-y-1 mt-6 lg:mt-12">
                        <label class="text-white font-bold">Username</label>
                        <input
                            class="h-12 bg-inherit text-white outline-none border-b border-gray-400 px-2 hover:border-white focus:border-white"
                            type="text" />
                    </div>
                    <div class="flex flex-col space-y-1 mt-3 lg:mt-6">
                        <label class="text-white font-bold">Password</label>
                        <input
                            class="h-12 bg-inherit text-white outline-none border-b border-gray-400 px-2 hover:border-white focus:border-white"
                            type="password" />
                    </div>
                    <div class="flex flex-col space-y-1 mt-3 lg:mt-6">
                        <div class="flex items-center space-x-3">
                            <input type="checkbox" class="checkbox checkbox-primary bg-white" />
                            <label class="text-white ">จดจำผู้ใช้งานในระบบ</label>
                        </div>
                    </div>
                    <div class="mt-10">
                        <button type="submit" @click="onLogin"
                            class="bg-white rounded-full px-8 py-1 text-orange-700 hover:bg-orange-100">เข้าสู่ระบบ</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>



<style></style>