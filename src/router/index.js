import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleInstitution from "../views/institutions/id/SingleInstitution";
import CallbackView from "../views/CallbackView.vue";
import AccountsView from "../views/AccountsView.vue";
import PaymentDemo from "../views/demoType/payment/PaymentView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/institutions/:id",
    name: "singleInstitution",
    component: SingleInstitution,
  },
  {
    path: "/callback",
    name: "callback",
    component: CallbackView,
  },
  {
    path: "/accounts",
    name: "accounts",
    component: AccountsView,
  },
  {
    path: "/payment",
    name: "paymentDemo",
    component: PaymentDemo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  mode: "history",
  routes,
});

export default router;
