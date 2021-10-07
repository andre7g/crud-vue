<template lang="es">
    <div>
        <v-card :elevation="0" class="v-sheet theme--light br-0">
            <v-card-title>
                <v-row class="col-md-12">
                    <v-col cols="12" sm="12" md="6">
                        Administración de Empleados
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-btn
                            color=""
                            dark
                            class="mb-2 float-right bg-light-blue"

                            @click="modalNuevo"
                        >
                            Crear nuevo empleado
                        </v-btn>
                    </v-col>

                </v-row>
                <v-row class="col-md-12 m-0 p-0">
                    <v-divider></v-divider>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12" md="8"></v-col>
                    <v-col cols="12" sm="12" md="4">
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Buscar"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-data-table
                        :headers="headers"
                        :items="empleados"
                        :search="search"
                        item-key="Id"
                        class="elevation-0"
                        :loading="tableLoading"
                        no-data-text="No hay datos para mostrar"

                        :items-per-page="10"
                        dense
                    >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.id }}</td>
                            <td>{{ item.nit }}</td>
                            <td>{{ item.primer_Nombre }}</td>
                            <td>{{ item.segundo_Nombre }}</td>
                            <td>{{ item.primer_Apellido }}</td>
                            <td>{{ item.segundo_Apellido }}</td>
                            <td>{{ item.direccion }}</td>
                            <td>{{ item.telefono }}</td>
                            <td>{{ item.puestos.puesto }}</td>
                            <td>{{ item.departamentos.departamento }}</td>
                            <td>{{ item.fecha_Nacimiento }}</td>
                            <td>{{ item.estados.estado }}</td>
                            <td>
                                <v-btn class="ma-2" small tile outlined color="indigo" @click="obtenerDatosItem(item.id)">
                                    <v-icon left>mdi-pencil</v-icon> Actualizar
                                </v-btn>
                            </td>
                        </tr>
                    </template>

                </v-data-table>
            </v-card-text>
        </v-card>
        <!-- Inicio:: Dialog para mostrar los datos del empleado-->
    <v-dialog
        v-model="dialog"
        max-width="800px"
        persistent
        transition="dialog-bottom-transition"

    >

        <v-card scrollable>
            <v-card-title>
                {{modalTitle}}

                <v-spacer></v-spacer>
                <v-btn
                    icon
                    :disabled="btnRegistroLoading"
                    @click="dialog = false; resetForm()"
                    class="float-right"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-form
                ref="form"
                v-on:submit.prevent="registrarItem"
                v-model="validForm"
                >
                <v-card-text>
                    <v-row>
                        <v-col  md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.primer_Nombre"
                                label="Primer Nombre"
                                :rules="[
                                    required(
                                        'Primer Nombre'
                                    ),
                                    maxLength(
                                        'Primer Nombre',
                                        45
                                    ),
                                    minLength(
                                        'Primer Nombre',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.segundo_Nombre"
                                label="Segundo Nombre"
                                :rules="[
                                    required(
                                        'Segundo Nombre'
                                    ),
                                    maxLength(
                                        'Segundo Nombre',
                                        45
                                    ),
                                    minLength(
                                        'Segundo Nombre',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.primer_Apellido"
                                label="Primer Apellido"
                                :rules="[
                                    required(
                                        'Primer Apellido'
                                    ),
                                    maxLength(
                                        'Primer Apellido',
                                        45
                                    ),
                                    minLength(
                                        'Primer Apellido',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.segundo_Apellido"
                                label="Segundo Apellido"
                                :rules="[
                                    required(
                                        'Segundo Apellido'
                                    ),
                                    maxLength(
                                        'Segundo Apellido',
                                        45
                                    ),
                                    minLength(
                                        'Segundo Apellido',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  md="12" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.nit"
                                label="Nit"
                                :rules="[
                                    required(
                                        'Nit'
                                    ),
                                    maxLength(
                                        'Nit',
                                        15
                                    ),
                                    minLength(
                                        'Nit',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row> 
                    <v-row>
                        <v-col  md="12" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.direccion"
                                label="Dirección"
                                :rules="[
                                    required(
                                        'Dirección'
                                    ),
                                    maxLength(
                                        'Dirección',
                                        100
                                    ),
                                    minLength(
                                        'Dirección',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row> 
                    <v-row>
                        <v-col  md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.telefono"
                                label="Teléfono"
                                :rules="[
                                    required(
                                        'Teléfono'
                                    ),
                                    maxLength(
                                        'Teléfono',
                                        15
                                    ),
                                    minLength(
                                        'Teléfono',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col  md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-text-field
                                outlined
                                autocomplete="off"
                                class="required"
                                dense
                                v-model="datosEmpleado.fecha_Nacimiento"
                                label="Fecha Nacimiento"
                                :rules="[
                                    required(
                                        'Fecha Nacimiento'
                                    ),
                                    maxLength(
                                        'Fecha Nacimiento',
                                        15
                                    ),
                                    minLength(
                                        'Fecha Nacimiento',
                                        3
                                    )
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row> 
                    <v-row>
                        <v-col cols="12" md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-autocomplete
                                        v-model="datosEmpleado.departamentos_Id"
                                        :items="departamentos"
                                        class="required"
                                        dense
                                        outlined
                                        :loading="selectDepartamentosLoaderVisible"
                                        label="Departamento"
                                        item-text="departamento"
                                        item-value="id"
                                        :rules="[
                                            selectRequired(
                                                'Departamento'
                                            )
                                        ]"
                                    ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="6" sm="12" xs="12" class="pt-1 pb-1">
                            <v-autocomplete
                                        v-model="datosEmpleado.puestos_Id"
                                        :items="puestos"
                                        class="required"
                                        dense
                                        outlined
                                        :loading="selectPuestosLoaderVisible"
                                        label="Puesto"
                                        item-text="puesto"
                                        item-value="id"
                                        :rules="[
                                            selectRequired(
                                                'Puesto'
                                            )
                                        ]"
                                    ></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  md="12" sm="12" class="pt-1 pb-1">
                             <label class="grey--text body-2">Estado</label>
                                <v-switch
                                    v-model="switchItemEstado"
                                    inset
                                    :label="switchItemEstado ? 'Activo' : 'Inactivo'"
                                    >
                                </v-switch>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                            <v-btn
                                color="grey lighten-5"
                                elevation="0"
                                class="mb-2 float-right grey lighten-5"
                                @click="dialog = false; resetForm()"
                                :disabled="btnRegistroLoading"
                            >
                                Cancelar
                            </v-btn>
                            <v-btn
                                color="primary"
                                class="mb-2 float-right"
                                type="submit"
                                :elevation="0"
                                :disabled="!validForm"
                                :loading="btnRegistroLoading"
                            >
                                {{btnRegistroText}}
                            </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>


    <!-- Fin:: Dialog para mostrar los datos del empleado-->

    <!--Dialog loader -->
    <dialog-loader
        :dialogVisible="dialogLoaderVisible"
        :text="dialogLoaderText"
    ></dialog-loader>
    <!---->

    <!--Inicio:: Snack alert-->
    <SnackAlert ref="snackalert"></SnackAlert>
    <!-- Fin:: Snack alert-->

    </div>
</template>
<script>
import validations from "@/utils/validations.js";

import { SET_BREADCRUMB } from "@/store/breadcrumbs.module";
import { OBTENER_EMPLEADOS,REGISTRAR_EMPLEADO,OBTENER_EMPLEADO,ACTUALIZAR_EMPLEADO } from "@/store/empleado.module";
import { OBTENER_PUESTOS } from "@/store/puestos.module";
import { OBTENER_DEPARTAMENTOS } from "@/store/departamentos.module";
//import { OBTENER_PAISES } from "@/core/services/store/pais.module";
import SnackAlert from '@/views/content/SnackAlert.vue';
import DialogLoader from "@/views/content/DialogLoader";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from "vue";
Vue.use(VueAxios, axios);
export default {
    name: "AdminDeptos",
    components: {
    SnackAlert,
    DialogLoader
    },
        data() {
        return {
            search: '',
            validForm:false,
            itemName : "Empleados",
            dialog: false,
            modalTitle: 'Registrar Empleado',
            btnRegistroLoading: false,
            dialogLoaderVisible: false,
            selectPuestosLoaderVisible:false,
            selectDepartamentosLoaderVisible:false,
            dialogLoaderText: 'Obteniendo informacion....',
            btnRegistroText: 'Registrar Empleado',
            accion: 1,
            empleados: [],
            departamentos: [],
            puestos: [],
            switchItemEstado: true,
            datosEmpleado: {
                id:0,
                primer_Nombre:'',
                segundo_Nombre:'',
                primer_Apellido:'',
                segundo_Apellido:'',
                puestos_Id:0,
                departamentos_Id:0,
                fecha_Nacimiento:'',
                estados_Id:0,
                nit:'',
                direccion:'',
                telefono:''
            },
            tableLoading: false,
            ...validations
        }
    },
    methods: {
        modalNuevo(){
            this.accion =1;
            this.modalTitle='Registrar Empleado';
            this.btnRegistroText='Registrar Empleado';
            this.dialog=true;
        },

        resetForm(){
            this.datosEmpleado = {
                id:0,
                primer_Nombre:'',
                segundo_Nombre:'',
                primer_Apellido:'',
                segundo_Apellido:'',
                puestos_Id:0,
                departamentos_Id:0,
                fecha_Nacimiento:'',
                estados_Id:0,
                nit:'',
                direccion:'',
                telefono:''
            }
            this.switchItemEstado = true;
        },

        //!Obtener empleados para el grid
        async obtnenerItems(){
            this.tableLoading = true;
            this.empleados=[];
             await this.$store
                 .dispatch(OBTENER_EMPLEADOS)
                 .then(res => {
                     this.empleados = this.$store.state.empleado.empleados;
                     this.tableLoading =false;
                 })
                 .catch(err => {
                     this.tableLoading = false;
                 });

        },

        obtenerDatosItem(Id){
            this.dialogLoaderVisible=true;
            this.datosEmpleado.id = Id;
            this.accion=2;
            this.modalTitle='Actualizar Empleado';
            this.btnRegistroText='Actualizar Empleado';

            this.$store
                .dispatch(OBTENER_EMPLEADO, Id)
                .then(() => {
                    this.datosEmpleado = this.$store.state.empleado.empleado;
                    this.datosEmpleado.estados_Id === 1 ? this.switchItemEstado = true : this.switchItemEstado = false;
                    this.dialog = true;
                    this.dialogLoaderVisible = false;
                })
                .catch(error => {
                    this.dialogLoaderVisible = false;
                    console.log(error)
                });
        },
        async obtenerDepartamentos(){
            this.departamentos=[];
            await this.$store
            .dispatch(OBTENER_DEPARTAMENTOS)
            .then(() => {
                this.departamentos = this.$store.state.departamentos.departamentos;
            })
            .catch(() => {});
        },
        async obtenerPuestos(){
            this.puestos=[];
            await this.$store
            .dispatch(OBTENER_PUESTOS)
            .then(() => {
                this.puestos = this.$store.state.puestos.puestos;
            })
            .catch(() => {});
        },
        registrarItem(){
            this.btnRegistroLoading=true;

            this.switchItemEstado ? this.datosEmpleado.estados_Id = 1 : this.datosEmpleado.estados_Id = 2;

            if(this.accion===1){
                this.datosEmpleado.id = 0;
                this.$store
                    .dispatch(REGISTRAR_EMPLEADO, this.datosEmpleado)
                    .then(res => {
                        if(res.status===200){
                            this.obtnenerItems();
                            this.dialog=false;
                            this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                            this.resetForm();
                            this.switchItemEstado = true;
                        } else {
                            this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                        }
                        this.btnRegistroLoading=false;
                    })
                    .catch(error => {
                        //console.log(error)
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', error);
                        this.btnRegistroLoading=false;
                    });

            } else {
                this.$store
                    .dispatch(ACTUALIZAR_EMPLEADO, this.datosEmpleado)
                    .then(res => {
                        //console.log(res)
                        if(res.status===200){
                            this.obtnenerItems();
                            this.dialog=false;
                            this.$refs.snackalert.SnackbarShow('success', 'Mensaje', res.mensaje);
                            this.resetForm();
                            this.switchItemEstado = true;
                        } else {
                            this.$refs.snackalert.SnackbarShow('warning', 'Alerta', res.mensaje);
                        }
                        this.btnRegistroLoading=false;
                    })
                    .catch(error => {
                        //console.log(error)
                        this.$refs.snackalert.SnackbarShow('warning', 'Alerta', error);
                        this.btnRegistroLoading=false;
                    });

            }
        }
    },
    mounted() {
        //Definir el nombre en el breadcrumb
        this.$store.dispatch(SET_BREADCRUMB, [
            { title: "Empleados" }
        ]);
    },

    created(){
        this.obtnenerItems();
        this.obtenerDepartamentos();
        this.obtenerPuestos();
    },

    computed: {
        headers() {
            return [
                {
                    text: "Id",
                    align: "start",
                    sortable: true,
                    value: "id"
                },
                {
                    text: "Ni",
                    value: "nit"
                },
                {
                    text: "Primer Nombre",
                    value: "primer_Nombre"
                },
                {
                    text: "Segundo Nombre",
                    value: "segundo_Nombre"
                },
                {
                    text: "Primer Apellido",
                    value: "primer_Apellido"
                },
                {
                    text: "Segundo Apellido",
                    value: "segundo_Apellido"
                },
                {
                    text: "Dirección",
                    value: "direccion"
                },
                {
                    text: "Teléfono",
                    value: "telefono"
                },
                {
                    text: "Puesto",
                    value: "puestos.puesto"
                },
                {
                    text: "Departamento",
                    value: "departamentos.departamento"
                },
                {
                    text: "Fecha Nacimiento",
                    value: "fecha_Nacimiento"
                },
                {
                    text: "Estado",
                    value: "estados.estado"
                },
                {
                    text: "Acciones",
                    value: "Acciones"
                }
            ]
        }
    }
}
</script>
<style lang="">

</style>