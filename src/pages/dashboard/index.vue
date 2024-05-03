<script setup>
import tabVersion1 from '../../components/tabs/tab-version1.vue';
// import outlineBlueBtn from '../../components/button/btn-blue-outline.vue'
import testTabs1 from './test-tab1.vue';
import testTab2 from './test-tab2.vue';
const tabs = [
    { label: "รายการสั่งซื้อ", component: testTabs1 },
    { label: "รายการเบิก", component: testTab2 },
]



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

        <div class="mt-6">
            <tabVersion1 :tabs="tabs"/>
        </div>
       
    </div>
    <!-- <div class="rounded-xl bg-white px-6 ">
        <span class="text-3xl font-bold text-lime-500">Testttt</span>
        <outlineBlueBtn :text="'Search'" />
    </div> -->
</template>
