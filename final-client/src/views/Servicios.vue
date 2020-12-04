<template>
  <div class="mt-5 mr-5 ml-5">
    <div v-show = "servicio">
      <h1>Servicios View</h1>
      <b-button variant="info" v-on:click="crearServicio()">Crear Servicio</b-button>
      <b-card-group columns class="mt-5">
        <serviceCard
          v-for="service in getServiceList"
          :cardTitle="service.nombre"
          :cardImage="service.imagen"
          :cardDesc="service.descripcion"
          :cardPrice="service.price"
          :needEdit="true"
          :cardId="service._id"
          :key="service._id"
        >
          <b-button
            variant="danger"
            class="mr-3"
            v-on:click="showDeleteModal(service)"
            v-b-modal.modal-1
          >
            Eliminar
          </b-button>

          <b-modal id="modal-1" title="Services">
            <p class="my-4">¿Desea eliminar?</p>
          </b-modal>
        </serviceCard>
      </b-card-group>
    </div>
    <router-view v-show = "!servicio"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import serviceCard from "@/components/serviceCard";
import EventBus from "@/pluggins/eventBus";

export default {
  name: "Servicios",
  data() {
    return {
     servicio: true
    };
  },
  components: {
    serviceCard,
  },
  computed: {
    ...mapGetters("servicios", ["getServiceList"]),
  },
  methods: {
    crearServicio() {
      this.dish = false
      this.$router.push("servicios/nuevo");
    },
    editarServicio() {
      this.$router.push(`servicios/edit`);
    },
    showDeleteModal(servicioId) {
      this.$store.dispatch('servicios/eliminarServicio', {servicioId: servicioId});
    },
  },
  created() {
    const vueinstance = this;
    EventBus.$on("EditEvent", function(data) {
      alert(data.cardId);
      vueinstance.editarServicio(data.cardId)
    });
  },
  mounted() {
    this.$store.dispatch("servicios/getServicesList");

  },
};
</script>
