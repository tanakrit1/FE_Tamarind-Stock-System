<script setup>
const props = defineProps(['text'])

</script>

<template>
    <button type="button" class="outline outline-2 outline-blue-700 px-6 py-1 hover:bg-blue-100 rounded-full">
        {{ props?.text }}
    </button>
</template>
