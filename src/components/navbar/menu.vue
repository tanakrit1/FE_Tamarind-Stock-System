<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter()
const itemNavbar = ref([
    {
        name: 'หน้าแรก',
        path: '/',
        menu: []
    },
    {
        name: 'รับสินค้า',
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
        menu: [
            {
                name: 'ขายสินค้า',
                path: '/export-by-supplier'
            },
            {
                name: 'นำสินค้าออก (จากการฝาก)',
                path: '/export-by-deposit'
            },
        ]
    },
    {
        name: 'ข้อมูลพื้นฐาน',
        menu: [
            {
                name: 'พนักงาน',
                path: '/master/employee'
            },
            {
                name: 'สินค้า',
                path: '/master/product'
            },
            {
                name: 'ผู้จัดจำหน่าย',
                path: '/master/supplier'
            },
            {
                name: 'ลูกค้า',
                path: '/master/customer'
            }
        ]
    },
    {
        name: 'รายงาน',
        menu: [
            {
                name: 'xxxx',
                path: '/xxx'
            },
            {
                name: 'yyyy',
                path: '/yyy'
            },
            {
                name: 'zzzz',
                path: '/zzz'
            }
        ]
    },
    
])
const menuList = ref([])

const onHoverItem = (menu) => {
    console.log("--> ", menu)
    menuList.value = menu
}

const onChangePage = (path) => {
    console.log("path--> ", path)
    $router.push(path)
}

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
                        <div class="py-1" role="none">
                            <template v-for="(menuItem, key) in item.menu" :key="key">
                                <a @click="onChangePage(menuItem.path)" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" >{{ menuItem.name }}</a>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<style></style>