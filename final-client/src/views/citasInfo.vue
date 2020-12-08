<template>
  <div>
    <h1 class="mt-5">Citas Agendadas</h1>
    <div class="col-sm mt-5 ml-5">
      <b-card-group deck>
        <card
          v-for="cita in getCitaList"
          :title="cita.nombre"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          :key="cita._id"
        >
          <b-card-text>{{ cita.nombre }}</b-card-text>
          <b-card-text>{{ cita.apellido }}</b-card-text>
          <b-card-text>{{ cita.telefono }}</b-card-text>
          <b-card-text>{{ cita.servicio }}</b-card-text>
          <b-card-text>{{ cita.fecha }}</b-card-text>
          <b-card-text>{{ cita.hora }}</b-card-text>

          <b-button
            variant="danger"
            class="mr-3"
            v-b-modal.my-modal
            v-on:click="showDeleteModal(cita)"
          >
            Eliminar
          </b-button>
          <b-modal id="my-modal">
            <p class="my-4">¿Seguro que desea eliminar?</p>
          </b-modal>
        </card>
      </b-card-group>
    </div>
  </div>
</template>
<script>
//import Axios from "axios";
//import productComponent from '@/components/producto';
//import EventBus from '@/pluggins/eventBus'
import card from "@/components/card";
import { mapGetters } from "vuex";

export default {
  name: "CitasInfo",
  data() {
    return {};
  },
  components: {
    card,
  },
  computed: {
    ...mapGetters("citas", ["getCitaList"]),
  },
  methods: {
    async getCitaInfo(citaId) {
      await this.$store.dispatch("citas/infoCita", { citaId: citaId });
    },
    showDeleteModal(citaId) {
      this.$store.dispatch("citas/eliminarCita", { citaId: citaId });
    }
  },
  mounted() {
    this.$store.dispatch("citas/infoCita");
  },
};
</script>
<style scoped></style>
