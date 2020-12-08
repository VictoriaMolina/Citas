<template>
  <div class="mt-5 mr-5 ml-5">
    <div>
      <h1>Agenda</h1>

      <b-table
        striped
        hover
        :items="getCitaList"
        class="mt-5"
        ref="selectableTable"
        selectable
        :select-mode="selectMode"
        @row-selected="onRowSelected"
        responsive="sm"
      >
        <template #cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&check;</span>
            <span class="sr-only">Selected</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template>
      </b-table>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Citas",
  data() {
    return {
      selectMode: "multi",
      selected: [],
    };
  },
  components: {},
  computed: {
    ...mapGetters("citas", ["getCitaList"]),
  },
  methods: {
    editarCita() {
      this.$store.dispatch(`citas/actualizarCita`);
    },
    showDeleteModal(citaId) {
      this.$store.dispatch("citas/eliminarCita", { citaId: citaId });
    },
    informacionCita() {
      this.$router.push("citas/info");
    },
    onRowSelected(items) {
      this.selected = items;
      this.informacionCita(this.selected._id);
      console.log("ID");
      console.log(this.selected);
    }
  },
  mounted() {
    this.$store.dispatch("citas/getCitasList");
  },
};
</script>
