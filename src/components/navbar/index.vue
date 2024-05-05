6+3<script setup>
import { onMounted, ref } from 'vue';
import { getLoginStorage } from '../../helpers/set-storage';
import menuItem from './menu.vue'
const emit = defineEmits()
const profile = ref(null)

const onLogOut = () => {
    emit("logout-success")
}

onMounted(() => {
    const sessionStorage = getLoginStorage()
    profile.value = sessionStorage?.profile
})

</script>

<template>
    <div class="h-16 top-0 absolute w-full flex items-center justify-between px-6" style="background-color: #A2422C">
        <div class="flex space-x-8 items-center">
            <img src="../../assets/images/logo.png" class="rounded-full h-14 w-12 cursor-pointer" />
            <menuItem>
            </menuItem>
        </div>
        <div class="flex space-x-4 ">
            <div class="flex flex-col justify-end">
                <span class="font-bold text-white">{{ `${profile?.firstName} ${profile?.lastName}` }}</span>
                <span class="font-bold text-white">{{ profile?.role }}</span>
            </div>
            <button class="flex items-center space-x-3 px-6  text-white hover:text-black" @click="onLogOut">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 8 8">
                    <path fill="currentColor" d="M3 0v1h4v5H3v1h5V0zm1 2v1H0v1h4v1l2-1.5z" />
                </svg>
            </button>
        </div>
    </div>
</template>



<style></style>