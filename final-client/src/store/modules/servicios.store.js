import axios from "axios";
import EventBus from "@/pluggins/eventBus";
const state = {
  listaServicios: [],
  currentNombre: "",
  currentDescripcion: "",
  currentCosto: "",
  currentImagen: "",
  currentServicioId: ""
};
const getters = {
  getServiceList: (state) => state.listaServicios
};
const actions = {
  // eslint-disable-next-line no-empty-pattern
  crearServicio({}, data) {
    axios
      .post("http://localhost:3000/servicios/nuevo", {
        nom: data.nom,
        desc: data.desc,
        imagen: data.imagen,
        costo: data.costo
      })
      .then(async function(response) {
        if (response.status === "200") {
          EventBus.$emit("Success");
          //dispatch('getTaskListAction()');
        } else {
          EventBus.$emit("Error", response.data.message);
        }
      })
      .catch(function(error) {
        EventBus.$emit("Error", error.message);
      });
  },
  async getServicesList({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/servicios/lista");

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        console.log(response.data);
        commit("SET_SERVICE_LIST", response.data.data);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  // eslint-disable-next-line no-empty-pattern
  editar({ state }) {
    const vueInstance = this;
    axios
      .post("http://localhost:3000/servicios/actualizar", {
        servicioId: state.currentServicioId,
        nom: state.currentNombre,
        desc: state.currentDescripcion,
        img: state.currentImagen
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
  eliminarServicio({}, data) {
    axios.post("http://localhost:3000/servicios/eliminar", {
        servicioId: data.servicioId,
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
  }
};
const mutations = {
  SET_SERVICE_LIST(state, servicio) {
    state.listaServicios = servicio;
  },
  SET_CURRENT_NAME(state, newName) {
    state.currentNombre = newName;
  },
  SET_CURRENT_DESC(state, newDesc) {
    state.currentDescripcion = newDesc;
  },
  SET_CURRENT_IMG(state, newImg) {
    state.currentImagen = newImg;
  },
  SET_CURRENT_COSTO(state, newPrice) {
    state.currentCosto = newPrice;
  }
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
