<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Button from 'primevue/Button'
import {useToast} from 'primevue/useToast'
import Toast from 'primevue/Toast'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import HotelService from '../services/hotel.service'
import RoomService from '../services/room.service'
import RoomTypeService from '../services/roomtype.service'
import CityService from '../services/city.service'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Vselect from 'vue-select'
const toast = useToast()

const hoteles = ref([]);
const rooms = ref([]);
const deptos = ref([]);
const depto = ref('');
const ciudades = ref([]);
const tipos = ref([]);
const acomodaciones = ref([]);
const tituloModal = ref("Nuevo Hotel");
const tituloModal2 = ref("Habitaciones Hotel");
const pagina = ref(1);
const porPagina = ref(10);
const total = ref(0);
const visible = ref(false);
const visibleRooms = ref(false);
const loading = ref(false);
const data = reactive({
  id: '',
  name: '',
  address: '',
  city_id: '',
  document: '',
  rooms: '',
});
const data2 = reactive({
  id: '',
  name: '',
  hotel_id: '',
  room_type_id: '',
  acomodation_id: '',
});

const editar = async (hotel)=>{
    tituloModal.value = 'Editar Hotel: '+hotel.name
    depto.value = hotel.city.department_id;
    await loadCiudades()
    Object.assign(data,hotel); 
}

const editarHabitacion = async (hab)=>{
    Object.assign(data2,hab); 
    await loadAcomodaciones();
}

const loadCiudades = async ()=>{
  ciudades.value = await CityService.indexCiudad(depto.value);
  let opt = data;
  opt.city_id = '';
  Object.assign(data,opt);
}

const guardarHotel = async ()=>{
    loading.value = true
    let errors = '';
    if(data.name == ''){
      errors+='\n- El Nombre del Hotel';
    }
    if(data.address == ''){
      errors+='\n- La Direcci\u00f3n del Hotel';
    }
    if(data.city_id == ''){
      errors+='\n- La Ciudad del hotel';
    }
    if(data.document == ''){
      errors+='\n- El NIT del Hotel';
    }
    if(data.rooms == ''){
      errors+='\n- El N\u00famero de Habitaciones del Hotel';
    }
    if(errors){
      toast.add({ severity: 'error', summary: 'Faltan datos', detail: 'Falta digitar:'+errors, life: 3000 });
      loading.value = false;
    }else{
      let response = null
      let tituAct = 'creado';
      if(data.id){
        response = await HotelService.update(data.id,data);
        tituAct = 'actualizado';
      }else{
        response = await HotelService.create(data);
      }
      if(typeof response.errors == 'undefined'){
        toast.add({ severity: 'success', summary: 'Mis Hoteles', detail: 'Hotel '+tituAct+' exitosamente', life: 3000 });
        loading.value = false;
        await loadHotels()
      }else{
        Object.values(response.errors).forEach(error => {
          toast.add({ severity: 'error', summary: 'Error', detail: error[0], life: 3000 });
        })
        loading.value = false;
      }      
    }
}
const guardarHabitacion = async ()=>{
  loading.value = true
    let errors = '';
    if(data2.name == ''){
      errors+='\n- El Nombre de la habitaci\u00f3n';
    }
    if(data2.room_type_id == ''){
      errors+='\n- El Tipo de habitaci\u00f3n';
    }
    if(data2.acomodation_id == ''){
      errors+='\n- La Acomodaci\u00f3n';
    }
    if(errors){
      toast.add({ severity: 'error', summary: 'Faltan datos', detail: 'Falta digitar:'+errors, life: 3000 });
      loading.value = false;
    }else{
      let response = null
      let tituAct = 'creado';
      if(data2.id){
        response = await RoomService.update(data2.id,data2);
        tituAct = 'actualizado';
      }else{
        response = await RoomService.create(data2);
      }
      if(typeof response.errors == 'undefined'){
        toast.add({ severity: 'success', summary: 'Mis Hoteles', detail: 'Habitaci\u00f3n '+tituAct+' exitosamente', life: 3000 });
        loading.value = false;
        await loadHabitaciones(data)
      }else{
        Object.values(response.errors).forEach(error => {
          toast.add({ severity: 'error', summary: 'Error', detail: error[0], life: 3000 });
        })
        loading.value = false;
      }
    }
}
const nuevo = ()=>{
  const nh = {
    id: '',
    name: '',
    address: '',
    city_id: '',
    document: '',
    rooms: '',
  }
  tituloModal.value = 'Nuevo Hotel'
  Object.assign(data,nh)
  visible.value = true;
}

const loadHotels = async ()=>{
  let ht = await HotelService.index({
      page: pagina.value,
      perPage: porPagina.value,
    });
    visible.value = false;
    hoteles.value = ht.data;
    pagina.value = ht.current_page;
    porPagina.value = ht.per_page;
    total.value = ht.total;
}

const paginar = async (page)=>{
  pagina.value = page.page+1;
  porPagina.value = page.rows;
  await loadHotels()
}

const loadHabitaciones = async (hotel)=>{
  tituloModal2.value = "Habitaciones del Hotel "+hotel.name
  let hr = await RoomService.index({
      hotel: hotel.id,
  });
  rooms.value = hr;
  let ht = await RoomTypeService.index({});
  tipos.value = ht;
  Object.assign(data,hotel);
  let dt2 = {
    id: '',
    name: '',
    hotel_id: data.id,
    room_type_id: '',
    acomodation_id: '',
  }
  Object.assign(data2,dt2)
}

const loadAcomodaciones = async ()=>{
  acomodaciones.value = await RoomTypeService.show(data2.room_type_id);
  let opt = data2;
  if(!data2.id)
    opt.acomodation_id = '';
  Object.assign(data2,opt);
}

onMounted(async ()=>{
    await loadHotels();
    deptos.value = await CityService.indexDepto();
})
</script>
<template>
  <div class="row">
      <Toast />
      <div class="col-12 justify-content-end d-flex mb-3">
          <Button label="Nuevo Hotel" icon="pi pi-file" @click="nuevo" severity="success" />
      </div>
      <div class="col-12">
        <DataTable :value="hoteles">
            <Column field="id" header="#"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="address" header="Direccion"></Column>
            <Column field="city.name" header="Ciudad"></Column>
            <Column field="rooms" header="# Habs"></Column>
            <Column header="Acciones">
              <template #body="slotProps">
                  <Button icon="pi pi-pencil" severity="success" @click="editar(slotProps.data);visible = true" v-tooltip="'Editar Hotel'" />
                  &nbsp;&nbsp;
                  <Button icon="pi pi-file" severity="warning" @click="loadHabitaciones(slotProps.data);visibleRooms = true" v-tooltip="'Ver Habitaciones'" />
              </template>
            </Column>
        </DataTable>

      </div>
      <div class="col-12 my-3">
          <Paginator :rows="porPagina" :rowsPerPageOptions="[10, 20, 50]" :totalRecords="total" @page="paginar"  />
      </div>
      <Dialog v-model:visible="visible" modal :header="tituloModal" :style="{ width: '80vw' }">
        <form @submit.prevent="guardarHotel">
          <div class="row">
            <div class="col-12 col-sm-6 mb-3">
                <InputText type="text" v-model="data.name" id="name" placeholder="Nombre" class="w-100" />
            </div>
            <div class="col-12 col-sm-6 mb-3">
                <InputText type="text" v-model="data.address" id="address" placeholder="Direcci&oacute;n" class="w-100" />
            </div>
            <div class="col-12 col-sm-6 mb-3">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <!--Deptos-->
                    <Vselect placeholder="Departamento" @option:selected="loadCiudades" :reduce="option => option.id" :options="deptos" label="name" v-model="depto"></Vselect>
                  </div>
                  <div class="col-12 col-md-6">
                    <!--Ciudades-->
                    <Vselect placeholder="Ciudad" :reduce="option => option.id" :options="ciudades" label="name" v-model="data.city_id"></Vselect>
                  </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 mb-3">
                <InputText type="text" v-model="data.document" id="document" placeholder="NIT" class="w-100" />
            </div>
            <div class="col-12 col-sm-6 mb-3">
                <InputText type="number" v-model="data.rooms" id="rooms" placeholder="# Habitaciones" class="w-100" />
            </div>
            <div class="col-12">
                <Button label="Guardar Hotel" icon="pi pi-save" type="submit" :loading="loading" severity="success" />
            </div>
          </div>
        </form>
      </Dialog>
      <Dialog v-model:visible="visibleRooms" modal :header="tituloModal2" :style="{ width: '80vw' }">
        <form @submit.prevent="guardarHabitacion">
          <div class="row">
            <div class="col-12 mb-3">
                <InputText type="text" v-model="data2.name" id="name2" placeholder="Nombre" class="w-100" />
            </div>
            <div class="col-12 mb-3">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <!--Tipos de Habitacion-->
                    <Vselect placeholder="Tipo Habitaci&oacute;n" @option:selected="loadAcomodaciones" :reduce="option => option.id" :options="tipos" label="name" v-model="data2.room_type_id"></Vselect>
                  </div>
                  <div class="col-12 col-md-6">
                    <!--Acomodaciones-->
                    <Vselect placeholder="Acomodaci&oacute;n" :reduce="option => option.id" :options="acomodaciones" label="name" v-model="data2.acomodation_id"></Vselect>
                  </div>
                </div>
            </div>
            <div class="col-12">
                <Button label="Guardar Habitaci&oacute;n" icon="pi pi-save" type="submit" :loading="loading" severity="success" />
            </div>
            <div class="col-12 my-3">
              <DataTable :value="rooms">
                <Column field="id" header="#"></Column>
                <Column field="name" header="Nombre"></Column>
                <Column field="room_type.name" header="Tipo"></Column>
                <Column field="acomodation.name" header="Acomodaci&oacute;n"></Column>
                <Column header="Acciones">
                  <template #body="slotProps">
                      <Button icon="pi pi-pencil" severity="success" @click="editarHabitacion(slotProps.data)" v-tooltip="'Editar Habitaci&oacute;n'" />
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </form>
      </Dialog>
  </div>
</template>