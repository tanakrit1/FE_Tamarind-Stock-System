<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getLoginStorage } from '../../helpers/set-storage';

const itemBegin = [
    {
        name: 'หน้าแรก',
        path: '/',
        menu: [],
        show: true,
    },
    {
        name: 'รับสินค้า',
        show: true,
        menu: [
            {
                name: 'รับสินค้าจากผู้จัดจำหน่าย',
                path: '/import-by-supplier'
            },
            {
                name: 'รับสินค้าจากการฝาก',
                path: '/import-by-deposit'
            },
        ]
    },
    {
        name: 'สินค้าออก',
        show: true,
        menu: [
            {
                name: 'ขายสินค้า',
                path: '/by-customer'
            },
            {
                name: 'เบิกเพื่อแปรรูปสินค้า',
                path: '/by-tranform'
            },
            {
                name: 'เบิกสินค้าจากการฝากเก็บ',
                path: '/by-deposit'
            },
        ]
    },
    {
        name: 'ข้อมูลพื้นฐาน',
        show: true,
        menu: [
            {
                name: 'ผู้ใช้งาน',
                path: '/master-employee'
            },
            {
                name: 'สินค้า',
                path: '/master-product'
            },
            {
                name: 'ผู้จัดจำหน่าย',
                path: '/master-supplier'
            },
            {
                name: 'ลูกค้า',
                path: '/master-customer'
            }
        ]
    },
    {
        name: 'รายงาน',
        show: true,
        menu: [
            {
                name: 'รายงานการนำเข้าสินค้า',
                path: '/report/product-list'
            },
            {
                name: 'รายงานการนำออกสินค้า',
                path: '/report/order-list'
            },
            {
                name: 'รายงานสินค้าคงเหลือ',
                path: '/report/stock-list'
            },
        ]
    },
    
]
const $router = useRouter()
const itemNavbar = ref([])
const menuList = ref([])

const onHoverItem = (menu) => {
    menuList.value = menu
}

const onChangePage = (path) => {
    $router.push(path)
}

onMounted(() => {
    itemNavbar.value = itemBegin
    const profile = getLoginStorage().profile
    console.log("profile--> ", profile)
    if( profile?.role == "ผู้ดูแลระบบ" ){
        itemNavbar.value = itemBegin
    }else{
        const menuNameShow = ["หน้าแรก", "รับสินค้า", "สินค้าออก"]
        itemNavbar.value = itemBegin.filter(item => menuNameShow.includes(item.name))
    }
})

</script>

<template>
    <div class="relative inline-block text-left" >
        <div class="flex space-x-10" >
            <template v-for="(item, index) in itemNavbar" :key="index">
                <button v-if="item?.menu.length === 0" type="button" class="font-bold text-white hover:text-black text-xl"
                    @click="onChangePage(item?.path)">
                    {{ item.name }}
                </button>
                <div v-else class="relative" @mouseover="onHoverItem(item?.menu)" @mouseleave="menuList = []">
                    <button type="button" class="font-bold text-white hover:text-black text-xl">
                        {{ item.name }}
                    </button>
                    <div v-if="menuList === item?.menu && menuList.length > 0" class="absolute left-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1" role="none" style="background-color: #A2422C">
                            <template v-for="(menuItem, key) in item.menu" :key="key">
                                <a @click="onChangePage(menuItem.path)" class="font-bold text-white block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-xl hover:text-black" >{{ menuItem.name }}</a>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<style></style>