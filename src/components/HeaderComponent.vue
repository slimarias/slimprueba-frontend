<template>
    <div>
        <Menubar :model="menuItems" />
    </div>
</template>
<script setup lang="ts">
    import Menubar from 'primevue/Menubar';
    import { useRouter } from 'vue-router';
    import AuthService from '../services/auth.service'
    import swal from 'sweetalert2';

    const route = useRouter();

    const menuItems = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            to: {name:'Home'},
        },
        {
            label: 'Acerca De',
            icon: 'pi pi-fw pi-user',
            to: {name:'About'},
        },
        {
            label: 'Cerrar Sesion',
            icon: 'pi pi-fw pi-sign-out',
            command: ()=>{
                swal.fire({
                    title: 'Salir',
                    html: 'Desea Cerrar Sesi&oacute;n?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                }).then(response=>{
                    if(response.isConfirmed){
                        AuthService.logout();
                        route.push({name: 'Login'})
                    }
                })
            }
        }
    ];
</script>