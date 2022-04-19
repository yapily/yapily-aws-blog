<template>
  <div class="container card">
    <h2>Payee Details</h2>
    <PayeeDetailForm @submitPayeeDetails="makePayment" />
  </div>
</template>

<script setup>
import PayeeDetailForm from "@/components/PayeeDetailForm.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const makePayment = (payeeDetails) => {
  sessionStorage.setItem("payeeDetails", JSON.stringify(payeeDetails));
  router.push(`/payment/${route.query.institutionId}/consent`);
};
</script>
