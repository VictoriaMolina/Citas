<template>
  <div class="home">
    <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="Salón Victoria"
      img-src="https://xto5417wdyi1sj59j35kiadt-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/Banner_sundara.jpg"
    ></b-carousel-slide>
    
  </b-carousel>
  <b-button variant="dark" class="mt-5" v-on:click="crearCita()">Agendar cita</b-button>
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