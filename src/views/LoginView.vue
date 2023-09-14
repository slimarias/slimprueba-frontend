<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import {useToast} from 'primevue/useToast';
import AuthService from '../services/auth.service';
import Toast from 'primevue/Toast';
import Button from 'primevue/Button';
const toast = useToast();
const route = useRouter();

const user = reactive({
    email: '',
    password: '',
});

const loading = ref(false);

const login = async ()=> {
    loading.value=true;
    let err = false;
    if(user.email==''){
        err=true;
        toast.add({ severity: 'error', summary: 'Faltan datos', detail: 'Falta digitar el E-mail', life: 3000 });
    }
    if(user.password==''){
        err=true;
        toast.add({ severity: 'error', summary: 'Faltan datos', detail: 'Falta digitar la contrase\u00f1a', life: 3000 });
    }
    if(!err){
        let usr = await AuthService.login(user);
        if(usr){
            toast.add({ severity: 'success', summary: 'Bienvenido', detail: 'Bienvenido, '+usr.user.first_name+' '+usr.user.last_name, life: 2000 });
            setTimeout(() => {
                loading.value=false;
                route.push({name: 'Home'});
            }, 2000);
        }else{
            toast.add({ severity: 'error', summary: 'Faltan datos', detail: 'Datos de usuario y contrase\u00f1a inv\u00e1lidos', life: 3000 });            
            loading.value=false;
        }
    }else{
        loading.value=false;
    }
}
</script>
<template>
    <div class="row justify-content-center">
        <Toast />
        <div class="col-12 col-sm-6 p-3">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <h4>Iniciar Sesi&oacute;n</h4>
                </div>         
                <div class="mb-3">
                    <InputText type="email" v-model="user.email" id="email" placeholder="E-mail" class="w-100" />
                </div>
                <div class="mb-3">
                    <InputText type="password" v-model="user.password" id="password" placeholder="Contrase&ntilde;a" class="w-100" />
                </div>
                <div class="mb-3">
                    <Button type="submit" :loading="loading" label="Iniciar Sesi&oacute;n" />
                </div>
            </form>
        </div>
    </div>    
</template>