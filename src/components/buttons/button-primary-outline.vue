<script setup>
const props = defineProps(["label"])


</script>

<template>
    <button type="button" 
        class="font-semibold px-8 py-2 border border-2 border-red-800 rounded-full text-red-800 hover:bg-red-800 hover:text-white">{{ props.label }}</button>
</template>



<style></style>