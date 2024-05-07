<script setup>
const props = defineProps(["label", "icon"])


</script>

<template>
    <button type="button"
        class="font-semibold px-8 py-2 border-red-800 rounded-full text-white bg-red-800 hover:bg-white hover:text-red-800 hover:outline hover:outline-1 ">
        <div class="flex justify-center items-center space-x-3">
            <svg v-if="props.icon=='plus'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                <path fill="#F1D6CF" fill-rule="evenodd"
                    d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm4 9a.75.75 0 0 1-.75-.75v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 1.5 0v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5A.75.75 0 0 1 8 11"
                    clip-rule="evenodd" />
            </svg>
            <span>{{ props.label }}</span>
        </div>
    </button>
</template>



<style scoped></style>