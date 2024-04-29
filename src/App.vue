<script setup>
import navbar from './components/navbar/index.vue';
import loader from './components/loader/index.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
const $store = useStore()
const $router = useRouter()
const loginMode = ref(false)
onMounted(() => {
    $router.push('/login')
})
</script>

<template>
    <loader :status="$store.state.statusLoading" />
    <div v-if="loginMode">
        <navbar />
        <div class="h-screen overflow-y-auto pt-20">
            <router-view />
        </div>
    </div>

    <div v-else>
        <router-view />
    </div>

</template>

<style scoped></style>
