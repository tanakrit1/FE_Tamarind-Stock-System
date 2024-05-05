<script setup>
import ButtonPrimaryOutline from '../../../components/buttons/button-primary-outline.vue';
import ButtonPrimary from '../../../components/buttons/button-primary.vue';

</script>

<template>
    <div class="flex md:justify-center">
        <div class="sm:w-1/1 md:w-2/3 flex flex-col mb-10 space-y-10">
            <div class="flex justify-between">
                <div class="flex space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="#A2422C"
                            d="M12 2a5 5 0 1 1-5 5l.005-.217A5 5 0 0 1 12 2m2 12a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5z" />
                    </svg>
                    <span class="text-2xl font-bold text-red-800">กำหนดข้อมูลผู้ใช้งาน</span>
                </div>

                <div class="flex space-x-3">
                    <label class="text-xl font-semibold text-red-800">ค้นหา</label>
                    <input type="text" class="h-8 w-50 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3"/>
                </div>
                
            </div>
        </div>
    </div>
</template>



<style></style>