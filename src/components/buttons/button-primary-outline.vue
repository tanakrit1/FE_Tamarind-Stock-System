<script setup>
const props = defineProps(["label"])
const emit = defineEmits(["onClick"])


</script>

<template>
    <button type="button" @click="emit('onClick')"
        class="font-semibold px-8 py-2 outline outline-red-700 rounded-full text-red-800 hover:bg-red-100">{{ props.label }}</button>
</template>



<style></style>