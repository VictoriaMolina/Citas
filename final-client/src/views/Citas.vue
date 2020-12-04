<template>
  <div class="mt-5 mr-5 ml-5">
    <div v-show="cita">
      <h1>Citas View</h1>
      
      <b-table striped hover :items="getCitaList" class="mt-5"></b-table>
    </div>
    <router-view v-show="!cita"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Citas",
  data() {
    return {
      cita: true,
    };
  },
  components: {},
  computed: {
    ...mapGetters("citas", ["getCitaList"]),
  },
  methods: {
    editarCita() {
      this.$router.push(`citas/actualizarCita`);
    },
    showDeleteModal(citaId) {
      this.$store.dispatch('citas/eliminarCita', {citaId: citaId});
    },
  },
  mounted() {
    this.$store.dispatch("citas/getCitasList");
  },
};
</script>
