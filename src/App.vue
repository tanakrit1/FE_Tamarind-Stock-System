<script setup>
import navbar from './components/navbar/index.vue';
import loader from './components/loader/index.vue'
import Login from './pages/login/index.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
const $store = useStore()
const $router = useRouter()
const loginMode = ref(false)

const onSigninSuccess = () => {
    loginMode.value = true
    $router.push('/')
}

onMounted(() => {
    $router.push('/login')
})
</script>

<template>
    <loader :status="$store.state.statusLoading" />
    <div v-if="loginMode">
        <navbar />
        <div class="h-screen overflow-y-auto pt-20">
            99
            <router-view />
        </div>
    </div>

    <div v-else>
        <Login @signin-success="onSigninSuccess" />
    </div>

</template>

<style scoped></style>
