<script setup>
import navbar from './components/navbar/index.vue';
import loader from './components/loader/index.vue'
import Login from './pages/login/index.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getLoginStorage, removeLoginStorage } from './helpers/set-storage';
const $store = useStore()
const $router = useRouter()
const loginMode = ref(false)

const onSigninSuccess = () => {
    loginMode.value = true
    $router.push('/')
}

const onLogoutSuccess = () => {
    removeLoginStorage()
    loginMode.value = false
    $router.push('/login')
}

const fnCheckLogin = () => {
    const loginStorage = getLoginStorage()
    if( loginStorage?.token && loginStorage?.profile ){
        loginMode.value = true
    }else{
        loginMode.value = false
        $router.push('/login')
    }
}

onMounted(() => {
    fnCheckLogin()
})
</script>

<template>
    <loader :status="$store.state.statusLoading" />
    <div v-if="loginMode">
        <navbar @logout-success="onLogoutSuccess"/>
        <div class="h-screen overflow-y-auto pt-24" style="background-color: #F1D6CF;">
            <router-view />
        </div>
    </div>

    <div v-else>
        <Login @login-success="onSigninSuccess" />
    </div>

</template>

<style scoped></style>
