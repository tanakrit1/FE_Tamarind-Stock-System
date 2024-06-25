<script setup>
import { onMounted, ref } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart, BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
    BarChart,
    GridComponent,
    PieChart,
    LineChart,
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

const optionChart1 = ref({})
const optionChart2 = ref({})
const optionChart3 = ref({})

const setChart = () => {
    optionChart1.value = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    optionChart2.value = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    }
}

onMounted(() => {
    setChart()
})

</script>

<template>
    <div class="px-36 pb-10">
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

        <div class="mt-10 bg-red-800 p-10 rounded-lg "
            style="background-color: #D9ADA1; border-left-width: 15px;border-left-color: #A2422C">
            <v-chart class="chart" :option="optionChart1" autoresize />
        </div>

        <div class="mt-10 flex justify-between space-x-16">
            <div class="grow">
                <p class="text-2xl font-bold text-red-800">จังหวัดที่ซื้อมากที่สุด</p>
                <div class="px-10  rounded-lg bg-white" style="border-left-width: 15px; border-left-color: #68524D">
                    <v-chart style="height: 400px; width: 100%;" :option="optionChart2" autoresize />
                </div>
            </div>

            <div class="grow">
                <p class="text-2xl font-bold text-red-800">สินค้าที่เหลือในคลัง</p>
                <div class="px-10  rounded-lg bg-white" style="border-left-width: 15px; border-left-color: #68524D">
                    <v-chart style="height: 400px; width: 100%;" :option="optionChart2" autoresize />
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="rounded-xl bg-white px-6 ">
        <span class="text-3xl font-bold text-lime-500">Testttt</span>
        <outlineBlueBtn :text="'Search'" />
    </div> -->
</template>
<style scoped>
.chart {
    height: 300px;
    width: 100%;
}
</style>