<script setup>
// import outlineBlueBtn from '../../components/button/btn-blue-outline.vue'
</script>

<template>
    <div class="px-36">
        <div class="flex justify-between space-x-24">
            <div class="rounded-xl bg-white px-10 py-6 h-36 w-1/3" style="background-color: #C2796A;">
                <p class="text-white mb-3 font-semibold">จำนวนเงินทั้งหมด</p>
                <span class="text-5xl font-bold text-white">฿</span>
                <span class="text-5xl font-bold text-white ml-3">15,000</span>
            </div>
            <div class="rounded-xl bg-white px-10 py-6 h-36 w-1/3" style="background-color: #D37961;">
                <p class="text-white mb-3 font-semibold">จำนวนรายงานสั่งซื้อทั้งหมด</p>
                <!-- <span class="text-5xl font-bold text-white">฿</span> -->
                <span class="text-5xl font-bold text-white ml-3">4,500</span>
            </div>
            <div class="rounded-xl bg-white px-10 py-6 h-36 w-1/3" style="background-color: #9C857F;">
                <p class="text-white mb-3 font-semibold">จำนวนลูกค้าทั้งหมด</p>
                <span class="text-5xl font-bold text-white">2,450</span>
                <span class="text-5xl font-bold text-white ml-3">คน</span>
            </div>
        </div>
    </div>
    <!-- <div class="rounded-xl bg-white px-6 ">
        <span class="text-3xl font-bold text-lime-500">Testttt</span>
        <outlineBlueBtn :text="'Search'" />
    </div> -->
</template>
