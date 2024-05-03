<script setup>
import { ref } from 'vue';
const props = defineProps(['tabs'])
const indexActive = ref(0)
console.log("tab--> ", props.tabs)

</script>

<template>
    <div class="">
        <div class="flex space-x-8 px-8">
            <div class="flex flex-col cursor-pointer" v-for="(tab, index) in props.tabs" :key="index" @click="indexActive = index">
                <span :class="{ 'text-red-700 font-semibold': true }">{{ tab.label }}</span>
                <div>
                    <hr v-if="indexActive === index" style="width: 100%; height: 3px; background-color: #C22D2D">
                </div>
            </div>
        </div>
        <hr class="relative bottom-0 left-0 right-0 z-40" style="width: 100%; border-color: #C79191">

        <div class="pt-6">
            <component :is="props.tabs[indexActive].component" />
        </div>
    </div>
</template>



<style></style>