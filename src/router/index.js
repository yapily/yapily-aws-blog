import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleInstitution from "../views/institutions/id/SingleInstitution";
import CallbackView from "../views/CallbackView.vue";
import AccountsView from "../views/AccountsView.vue";
import PaymentDemo from "../views/demoType/payment/PaymentView.vue";
import PaymentConsent from "../views/demoType/payment/PaymentConsentView.vue";
import PaymentDetail from "../views/PaymentDetailView.vue";

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
  {
    path: "/payment/detail",
    name: "PaymentDetail",
    component: PaymentDetail,
  },
  {
    path: "/payment/:institutionId/consent",
    name: "PaymentConsent",
    component: PaymentConsent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  mode: "history",
  routes,
});

export default router;
