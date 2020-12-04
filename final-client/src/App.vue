<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Salón Victoria</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/servicios" class="nav-link">Catálogo</router-link>
          <router-link to="/citas" class="nav-link">Agenda</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button 
            size="sm" 
            class="my-2 my-sm-0" 
            type="submit"
            v-on:click="crearCita()"
            >Agendar cita</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
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
    crearCita() {
      this.table = false;
      this.$router.push("/form");
    }
  },
  mounted() {
    this.$store.dispatch("citas/getCitasList");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
