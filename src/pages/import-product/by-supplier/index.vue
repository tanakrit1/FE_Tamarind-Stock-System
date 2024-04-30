<script setup>
import TableHistory from './table-history.vue';

</script>

<template>
    <div class="flex md:justify-center">
        <div class="sm:w-1/1 md:w-2/3 flex flex-col space-y-3 mb-10">
            <span class="text-2xl font-bold">รับสินค้า (ผู้จัดจำหน่าย)</span>
            <div class="w-full bg-white rounded-xl py-3 ">
                <div class="px-6">
                    <span class="text-lg font-semibold">ข้อมูลสินค้า</span>
                </div>
                <hr class="mt-2" style="border: 2px solid #C2C2C2">
                <div class="px-12 flex flex-wrap pt-10">
                    <div class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6">
                        <span class="w-1/4">รหัสสินค้า</span>
                        <input class="h-8 w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3" type="text"/>
                    </div>

                    <div class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6">
                        <span class="w-1/4">ชื่อสินค้า</span>
                        <input class="h-8 w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3" type="text"/>
                    </div>

                    <div class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6">
                        <span class="w-1/4">ประเภทสินค้า</span>
                        <input class="h-8 w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3" type="text"/>
                    </div>

                    <div class="lg:basis-1/2  basis-full space-x-3 flex items-center px-6 mb-6">
                        <span class="w-1/4">รายละเอียด</span>
                        <textarea class="w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3 py-2" rows="1" type="text"></textarea>
                        <!-- <input class="h-8 w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3" type="text"/> -->
                    </div>

                    <div class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6">
                        <span class="w-1/4">วันที่รับสินค้าเข้าคลัง</span>
                        <input class="h-8 w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3" type="date"/>
                    </div>

                    <div class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6">
                        <span class="w-1/4">ราคา</span>
                        <input class="h-8 w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3" type="text"/>
                    </div>

                    <div class="lg:basis-1/2 basis-full space-x-3 flex items-center px-6 mb-6">
                        <span class="w-1/4">ปริมาณ</span>
                        <input class="h-8 w-3/4 outline outline-red-300 focus:outline-red-400 rounded bg-red-100 px-3" type="text"/>
                    </div>
        
                </div>


                <div class="flex justify-center my-6">
                    <button type="button" class="px-8 py-2 outline outline-red-700 rounded-full hover:bg-red-100">บันทึกข้อมูล</button>
                </div>

            </div>

            <div class="pt-8 rounded-xl mb-10 overflow-auto rounded-xl">
                <TableHistory/>
            </div>
            
        </div>
    </div>
</template>



<style></style>