<template>
  <div class="mt-5 mr-5 ml-5">
    <b-form @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
        <b-form-input
          id="input-1"
          :value="nombre"
          @input="updateNombre"
          v-model="form.nom"
          required
          placeholder="Nombre"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Apellido:" label-for="input-2">
        <b-form-input
          id="input-2"
          :value="apellido"
          @input="updateApellido"
          v-model="form.ape"
          required
          placeholder="Apellido"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Teléfono:" label-for="input-3">
        <b-form-input
          id="input-3"
          :value="telefono"
          @input="updateTelefono"
          v-model="form.tel"
          required
          placeholder="Teléfono"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Servicio:" label-for="input-4">
        <b-form-select
          id="input-4"
          :value="servicio"
          @input="updateServicio"
          v-model="form.serv"
          :options="options"
          required
          placeholder="Servicio"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Fecha:" label-for="input-5"  for="example-datepicker">
       <b-form-datepicker 
       id="example-datepicker" 
       v-model="form.fecha" 
       class="mb-2"></b-form-datepicker>
      </b-form-group>

       <b-form-group id="input-group-6" label="Hora:" label-for="input-6">
       <b-form-timepicker 
       v-model="form.hora" 
       locale="en">
       </b-form-timepicker>
      </b-form-group>

      <b-button variant="primary" v-on:click="newCita()" class="mt-3 mr-3 mb-3">Submit</b-button>
      <b-button type="reset" variant="danger" class="mt-3 mb-3">Reset</b-button>
    </b-form>
    <!--<b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/pluggins/eventBus";
export default {
  name: "CitasForm",
  data() {
    return {
      form: {
        nom: "",
        ape: "",
        tel: "",
        fecha: "",
        hora: "",
        serv: ""
      },
      options: [
        { text: "Selecciona una", value: null },
        "Corte de cabello",
        "Uñas",
        "Maquillaje"
      ],
      show: true,
    };
  },
  computed: {
    ...mapState({
      nombre: (state) => state.currentNombre,
      apellido: (state) => state.currentApellido,
      telefono: (state) => state.currentTelefono,
      servicio: (state) => state.currentServicio,
      //fecha: (state) => state.currentFecha,
      //hora: (state) => state.currentHora
    }),
  },
  methods: {
    newCita() {
      this.$store.dispatch("citas/crearCita", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.nom = "";
      this.form.ape = "";
      this.form.tel = "";
      this.form.serv = "";
      this.form.fecha = "";
      this.form.hora = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    updateNombre(value) {
      this.$store.commit("citas/SET_CURRENT_NOMBRE", value);
    },
    updateApellido(value) {
      this.$store.commit("citas/SET_CURRENT_APELLIDO", value);
    },
    updateTelefono(value) {
      this.$store.commit("citas/SET_CURRENT_TEL", value);
    },
    updateServicio(value) {
      this.$store.commit("citas/SET_CURRENT_SERV", value);
    },/*
    updateFecha(value) {
      this.$store.commit("citas/SET_CURRENT_FECHA", value);
    },
    updateHora(value) {
      this.$store.commit("citas/SET_CURRENT_HORA", value);
    }*/
    
  },
  created() {
    EventBus.$on("EditEvent", function(data) {
      alert(data.cardId);
    });

    const vueInstance = this;
    EventBus.$on("AppointmentCreateSuccess", function() {
      vueInstance.$bvToast.toast("Appointment Updated", {
        title: `Appointment Created`,
        variant: "success",
        solid: true,
      });
    });
    EventBus.$on("AppointmentCreateError", function(message) {
      vueInstance.$bvToast.toast(message, {
        title: "Error",
        variant: "danger",
        solid: true,
      });
    });
  },
  beforeDestroy() {
    EventBus.$off("EditEvent");
    EventBus.$off("AppointmentSuccess");
    EventBus.$off("AppointmentError");
  },
};
</script>
