6+3<script setup>
import menuItem from './menu.vue'

</script>

<template>
    <div class="h-16 top-0 absolute w-full bg-violet-600 flex items-center justify-between px-6">
        <div class="flex space-x-8 items-center">
            <img src="../../assets/images/logo.png" class="rounded-full h-14 w-12 cursor-pointer" />
            <menuItem>
            </menuItem>
        </div>
        <div class="flex space-x-4 ">
            <div class="flex flex-col justify-end">
                <span class="font-bold text-white">Tanakrit krut-am</span>
                <span class="font-bold text-white">Admin</span>
            </div>
            <div class="avatar">
                <div class="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>



<style></style>