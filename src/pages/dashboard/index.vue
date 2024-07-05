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
import _apiDashboard from "../../api/dashboard"
import store from '../../store';

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
const cardSum = ref({
    salesToDay: 12560,
    salesToMonth: 1200,
    customerToMonth: 13000
})

const tabChartStockActive = ref("buy")

const valueChart1 = ref({
    name: [],
    data: []
})
const valueChart2 = ref({
    name: [],
    data: []
})

const valueChart3 = ref({
    name: [],
    data: []
})

const setChart = async () => {
    optionChart1.value = {
        // title: {
        //     text: 'สินค้าคงคลัง'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: valueChart1.value.name
        },
        series: [
            {
                // name: '',
                type: 'bar',
                data: valueChart1.value.data,
                color: "#FFFFFF"
            },
        ]
    };

    optionChart2.value = {
        // title: {
        //     text: 'สินค้าคงคลัง'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: valueChart2.value.name
        },
        series: [
            {
                // name: '',
                type: 'bar',
                data: valueChart2.value.data,
                color: "#FFFFFF"
            },
        ]
    };

    optionChart3.value = {
        // title: {
        //     text: 'สินค้าคงคลัง'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: valueChart3.value.name
        },
        series: [
            {
                // name: '',
                type: 'bar',
                data: valueChart3.value.data,
                color: "#FFFFFF"
            },
        ]
    };
}

const onChangeTabStock = (value) => {
    tabChartStockActive.value = value
}

onMounted(async () => {
    store.commit("setStatusLoading", true);
    await _apiDashboard.getData({}, async ({ data }) => {
        // const option1 = { name: [], value: [] }
        console.log("data--> ", data)
        for (let i = 0; i < data.remaining.length; i++) {
            valueChart1.value.name.push(data.remaining[i].name)
            valueChart1.value.data.push(data.remaining[i].remaining_ซื้อขาย)

            valueChart2.value.name.push(data.remaining[i].name)
            valueChart2.value.data.push(data.remaining[i].remaining_ฝากเก็บ)
        }

        for(let i=0;i<data.productsToDeliverToday.length;i++){
            valueChart3.value.name.push(data.productsToDeliverToday[i].name)
            valueChart3.value.data.push(data.productsToDeliverToday[i].exportToday_ซื้อขาย)
        }

        cardSum.value = {
            salesToDay: data.saleToday,
            salesToMonth: data.saleMonth,
            customerToMonth: data.totalCustomerMonth
        }

        await setChart()
        tabChartStockActive.value = "buy"
        store.commit("setStatusLoading", false);
    })
    

})

</script>

<template>
    <div class="px-36 pb-10">
        <div class="flex justify-between space-x-24">
            <div class="rounded-xl bg-white px-10 py-6 h-36 w-1/3" style="background-color: #C2796A;">
                <p class="text-white mb-3 font-semibold">ยอดขาย(วันนี้)</p>
                <span class="text-5xl font-bold text-white">฿</span>
                <span class="text-5xl font-bold text-white ml-3">{{ cardSum.salesToDay.toLocaleString() }}</span>
            </div>
            <div class="rounded-xl bg-white px-10 py-6 h-36 w-1/3" style="background-color: #D37961;">
                <p class="text-white mb-3 font-semibold">ยอดขาย(ภายในเดือน)</p>
                <span class="text-5xl font-bold text-white">฿</span>
                <span class="text-5xl font-bold text-white ml-3">{{ cardSum.salesToMonth.toLocaleString() }}</span>
            </div>
            <div class="rounded-xl bg-white px-10 py-6 h-36 w-1/3" style="background-color: #9C857F;">
                <p class="text-white mb-3 font-semibold">จำนวนลูกค้าทั้งหมด(ภายในเดือน)</p>
                <span class="text-5xl font-bold text-white">{{ cardSum.customerToMonth.toLocaleString() }}</span>
                <span class="text-5xl font-bold text-white ml-3">คน</span>
            </div>
        </div>
        <div class="mt-10">
            <div class="flex mb-2">
                <div :class="{ 'border-r-2 font-bold py-2 px-8 rounded-l-lg cursor-pointer bg-white': true, 'tab-active': tabChartStockActive == 'buy' }"
                    @click="onChangeTabStock('buy')">
                    สินค้าคงคลัง(ซื้อ-ขาย)
                </div>
                <div :class="{ 'border-r-2 font-bold py-2 px-8  cursor-pointer bg-white': true, 'tab-active': tabChartStockActive == 'deposit' }"
                    @click="onChangeTabStock('deposit')">
                    สินค้าคงคลัง(ฝากเก็บ)
                </div>
                <div :class="{ 'font-bold py-2 px-8 rounded-r-lg cursor-pointer bg-white': true, 'tab-active': tabChartStockActive == 'orderAmountToday' }"
                    @click="onChangeTabStock('orderAmountToday')">
                    ยอดสั่งซื้อวันนี้(ชิ้น)
                </div>
            </div>
            <!-- <p class="text-2xl font-bold text-red-800">สินค้าคงคลัง</p> -->
            <div v-if="tabChartStockActive == 'buy'" class=" bg-red-800 pl-10 pr-10 pb-10 pt-0 rounded-lg "
                :style="'background-color: #D9ADA1; border-left-width: 15px;border-left-color: #A2422C;' + 'height: ' + valueChart1.name.length * 35 + 'px'">
                <v-chart class="chart1" :option="optionChart1" autoresize />
            </div>

            <div v-else-if="tabChartStockActive == 'deposit'" class=" bg-red-800 pl-10 pr-10 pb-10 pt-0 rounded-lg "
                :style="'background-color: #D9ADA1; border-left-width: 15px;border-left-color: #A2422C;' + 'height: ' + valueChart1.name.length * 35 + 'px'">
                <v-chart class="chart2" :option="optionChart2" autoresize />
            </div>

            <div v-else class=" bg-red-800 pl-10 pr-10 pb-10 pt-0 rounded-lg "
                :style="'background-color: #D9ADA1; border-left-width: 15px;border-left-color: #A2422C;' + 'height: ' + valueChart1.name.length * 35 + 'px'">
                <v-chart class="chart3" :option="optionChart3" autoresize />
            </div>

        </div>

        <!-- <div class="mt-10 flex justify-between space-x-16">
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
        </div> -->
    </div>
    <!-- <div class="rounded-xl bg-white px-6 ">
        <span class="text-3xl font-bold text-lime-500">Testttt</span>
        <outlineBlueBtn :text="'Search'" />
    </div> -->
</template>
<style scoped>
/* .chart1 {
    height: 600px;
    width: 100%;
} */

.tab-active {
    background-color: #A2422C;
    color: white;
}


</style>