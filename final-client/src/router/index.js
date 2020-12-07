import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/citas",
    name: "Citas",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Citas.vue"),
  },
  {
    path: "/servicios",
    name: "Servicios",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Servicios.vue"),
  },
  {
    path: "/servicios/nuevo",
    name: "ServiciosForm",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/serviciosForm.vue"),
  },
  {
    path: "/servicios/edit",
    name: "Edit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/serviciosForm.vue"),
  },
  {
    path: "/form",
    name: "Form",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/citasForm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
