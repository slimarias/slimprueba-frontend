<script setup lang="ts">
    import { onMounted, onBeforeUpdate, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import HeaderComponent from '../components/HeaderComponent.vue'
    import FooterComponent from '../components/FooterComponent.vue'
    const loggedIn = ref(localStorage.getItem('user'));
    const route = useRouter();
    onMounted(async ()=>{
        loggedIn.value = localStorage.getItem('user')
        if(!loggedIn.value)
            route.push({name: 'Login'})
    })
    onBeforeUpdate(async ()=>{
        loggedIn.value = localStorage.getItem('user')
        if(!loggedIn.value)
            route.push({name: 'Login'})
    })
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <HeaderComponent v-if="loggedIn" />
            </div>
            <div class="col-12 mt-3">
                <h3 v-html="$route.meta.title"></h3>
                <router-view/>                
            </div>
            <div class="col-12">
                <FooterComponent />
            </div>
        </div>        
    </div>
</template>