<template>
  <div class="the-content">
    <div v-if="status === 'FAILED'">
      <div class="d-flex align-items-center">
        <h2 class="pt-3 pl-3">There was an error completing the payment</h2>
      </div>
      <hr class="mt-2" />
      <div class="mt-4">
        <h3>Payment Id: {{ paymentId }}</h3>
      </div>
    </div>
    <div v-else-if="status === 'PENDING'">
      <div class="d-flex align-items-center">
        <h2 class="pt-3 pl-3">Payment Pending</h2>
      </div>
      <hr class="mt-2" />
      <div class="mt-4">
        <h3>Amount: £{{ amount }}</h3>
        <h3 class="mt-4">Paid To: {{ payee }}</h3>
        <h3>Payment Id: {{ paymentId }}</h3>
      </div>
    </div>
    <div v-else-if="status === 'COMPLETED'">
      <div class="d-flex align-items-center">
        <h2 class="pt-3 pl-3">Payment Successful</h2>
      </div>
      <hr class="mt-2" />
      <div class="mt-4">
        <h3>Amount: £{{ amount }}</h3>
        <h3 class="mt-4">Paid To: {{ payee }}</h3>
        <h3>Payment Id: {{ paymentId }}</h3>
      </div>
    </div>
    <div v-else>
      <div class="d-flex align-items-center">
        <h2 class="pt-3 pl-3">Your payment status is {{ status }}</h2>
      </div>
      <hr class="mt-2" />
      <div class="mt-4">
        <h3>Payment Id: {{ paymentId }}</h3>
      </div>
    </div>
    <small
      >Please note down your payment ID for future reference and status
      checking</small
    >
    <div class="d-flex align-items-center justify-content-center mt-2">
      <router-link to="/" class="button primary" style="text-decoration: none"
        >Home</router-link
      >
    </div>

    <hr class="mt-2" />
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaymentDetail",
  props: {
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payee: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: false,
    },
    tracingId: {
      type: String,
      required: false,
    },
  },
});
</script>
<style></style>
