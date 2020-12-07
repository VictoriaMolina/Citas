import axios from "axios";
import EventBus from "@/pluggins/eventBus";
const state = {
  listaCitas: [],
  currentNom: "",
  currentApe: "",
  currentTel: "",
  currentCitaId: ""
};
const getters = {
  getCitaList: (state) => state.listaCitas,
};
const actions = {
  // eslint-disable-next-line no-empty-pattern
  crearCita({}, data) {
    axios
      .post("http://localhost:3000/citas/nuevo", {
        nom: data.nom,
        ape: data.ape,
        tel: data.tel,
        fecha: data.fecha,
        hora: data.hora
      })
      .then(async function(response) {
        if (response.status === "200") {
          EventBus.$emit("Success");
        } else {
          EventBus.$emit("Error", response.data.message);
        }
      })
      .catch(function(error) {
        EventBus.$emit("Error", error.message);
      });
  },
  async getCitasList({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/citas/lista");

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        console.log(response.data);
        commit("SET_CITA_LISTA", response.data.data);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  // eslint-disable-next-line no-empty-pattern
  actualizarCita({ state }) {
    const vueInstance = this;
    axios
      .post("http://localhost:3000/citas/actualizar", {
        citaId: state.currentCitaId,
        nom: state.currentNom,
        ape: state.currentApe,
        tel: state.currentTel,
        fecha: state.currentFecha
      })
      .then(function(response) {
        if (response.status === "200") {
          vueInstance.$bvToast.toast("success", {
            title: `success`,
            variant: "success",
            solid: true,
          });
        } else {
          vueInstance.$bvToast.toast(response.data.message, {
            title: "Error",
            variant: "danger",
            solid: true,
          });
        }
      })
      .catch(function(error) {
        vueInstance.$bvToast.toast(error.message, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      });
  },
  // eslint-disable-next-line no-empty-pattern
  eliminarCita({}, data) {
    axios
      .post("http://localhost:3000/citas/eliminar", {
        citaId: data.citaId,
      })
      .then(async function(response) {
        if (response.status === "200") {
          EventBus.$emit("Success");
        } else {
          EventBus.$emit("Error", response.data.message);
        }
      })
      .catch(function(error) {
        EventBus.$emit("Error", error.message);
      });
  },
};
const mutations = {
  SET_CITA_LISTA(state, cita) {
    state.listaCitas = cita;
  },
  SET_CURRENT_NOMBRE(state, nombre) {
    state.currentNom = nombre;
  },
  SET_CURRENT_APELLIDO(state, apellido) {
    state.currentApe = apellido;
  },
  SET_CURRENT_TEL(state, telefono) {
    state.currentTel = telefono;
  },
  /*SET_CURRENT_FECHA(state, fecha) {
    state.currentFecha = fecha;
  },*/
};

export default {
  namespaced: true,
  state: {
    ...state,
  },
  getters: {
    ...getters,
  },
  actions: {
    ...actions,
  },
  mutations: {
    ...mutations,
  },
};
