<template>
  <div class="mt-5 mr-5 ml-5">
    <b-form @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Servicio:" label-for="input-1">
        <b-form-input
          id="input-1"
          :value="nombre"
          @input="updateNombre"
          v-model="form.nom"
          required
          placeholder="Servicio"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Descripción:" label-for="input-2">
        <b-form-input
          id="input-2"
          :value="descripcion"
          @input="updateDescripcion"
          v-model="form.desc"
          required
          placeholder="Descripción"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Imagen:" label-for="input-3">
        <b-form-input
          id="input-3"
          :value="imagen"
          @input="updateImagen"
          v-model="form.imagen"
          required
          placeholder="Imagen"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Costo:" label-for="input-4">
        <b-form-input
          id="input-4"
          :value="costo"
          @input="updateCosto"
          v-model="form.costo"
          required
          placeholder="Costo"
        ></b-form-input>
      </b-form-group>

      <b-button variant="primary" v-on:click="newService()" class="mr-3">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/pluggins/eventBus";
export default {
  name: "ServiciosForm",
  data() {
    return {
      edit: false,
      form: {
        nom: "",
        desc: "",
        imagen: "",
        costo: ""
      },
      show: true,
    };
  },
  computed: {
    ...mapState({
      nombre: (state) => state.currentNombre,
      descripcion: (state) => state.currentDescripcion,
      imagen: (state) => state.currentImagen,
      costo: (state) => state.currentCosto
    }),
  },
  methods: {
    newService() {
      console.log(this.edit);
      if(this.edit === false) {
        this.$store.dispatch("servicios/crearServicio", this.form);
      } else {
        this.$store.dispatch("servicios/editar", this.form);
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.nom = "";
      this.form.desc = "";
      this.form.imagen = "";
      this.form.costo = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    updateNombre(value) {
      this.$store.commit("servicios/SET_CURRENT_NAME", value);
    },
    updateDescripcion(value) {
      this.$store.commit("servicios/SET_CURRENT_DESC", value);
    },
    updateImagen(value) {
      this.$store.commit("servicios/SET_CURRENT_IMG", value);
    },
    updateCosto(value) {
      this.$store.commit("servicios/SET_CURRENT_COSTO", value);
    },
    editarServicio(servicioId) {
      this.$router.push(`servicios/editar/${servicioId}`);
    },
  },
  created() {
    const vueInstance = this;
    EventBus.$on("Success", function() {
      vueInstance.$bvToast.toast("Updated", {
        title: `Created`,
        variant: "success",
        solid: true,
      });
    });
    EventBus.$on("Error", function(message) {
      vueInstance.$bvToast.toast(message, {
        title: "Error",
        variant: "danger",
        solid: true,
      });
    });
  },
  beforeDestroy() {
    EventBus.$off("EditEvent");
    EventBus.$off("Success");
    EventBus.$off("Error");
  },
  mounted() {
    if(this.$route.params.id !== null  && this.$route.params.id !== undefined) {
      this.edit = true
    }
  },
};
</script>
