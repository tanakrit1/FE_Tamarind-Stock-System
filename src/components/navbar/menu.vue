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
                name: 'List',
                path: '/xxx'
            },
            {
                name: 'Report',
                path: '/yyy'
            },
            {
                name: 'Setting',
                path: '/zzz'
            }
        ]
    },
    {
        name: 'สินค้าออก',
        menu: [
            {
                name: 'List',
                path: '/xxx'
            },
            {
                name: 'Report',
                path: '/yyy'
            },
            {
                name: 'Setting',
                path: '/zzz'
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
                <button v-if="item?.menu.length === 0" type="button" class="font-bold text-black hover:text-gray-500 text-xl"
                    @click="onChangePage(item?.path)">
                    {{ item.name }}
                </button>
                <div v-else class="relative" @mouseover="onHoverItem(item?.menu)" @mouseleave="menuList = []">
                    <button type="button" class="font-bold text-black hover:text-gray-500 text-xl">
                        {{ item.name }}
                    </button>
                    <div v-if="menuList === item?.menu && menuList.length > 0" class="absolute left-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1" role="none">
                            <template v-for="(menuItem, key) in item.menu" :key="key">
                                <a @click="onChangePage(menuItem.path)" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" >{{ menuItem.name }}</a>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<style></style>