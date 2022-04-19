<template>
  <div class="container card">
    <h2>Payee Details</h2>
    <PayeeDetailForm @submitPayeeDetails="makePayment" />
  </div>
</template>

<script setup>
import PayeeDetailForm from "@/components/PayeeDetailForm.vue";

const makePayment = (payeeDetails) => {
  sessionStorage.setItem("payeeDetails", JSON.stringify(payeeDetails));
  console.log(payeeDetails);
};
</script>
