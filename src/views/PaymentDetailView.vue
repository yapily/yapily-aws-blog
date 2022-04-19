<template>
  <PaymentDetail
    class="container"
    v-if="currentPaymentStatus"
    :status="currentPaymentStatus.status"
    :amount="currentPaymentStatus.amount"
    :payee="currentPaymentStatus.payeeDetails.name"
    :payment-id="currentPaymentStatus.id"
  />
</template>

<script setup>
import { computed, onMounted, ref, toRefs } from "vue";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import PaymentDetail from "@/components/PaymentDetail.vue";

const { user } = toRefs(useAuthenticator());
const paymentStatus = ref(null);

onMounted(async () => {
  const paymentDetails = await API.get(
    "awsblogapi",
    `/v1/payment/detail/${user.value.attributes.sub}`
  );
  // pre-select first object in array for demo purposes
  const { paymentConsentToken, paymentId } = paymentDetails[0];
  if (paymentConsentToken && paymentId) {
    await API.get(
      "awsblogapi",
      `/v1/payments/${paymentId}/details?consent=${paymentConsentToken}`
    ).then((res) => (paymentStatus.value = res.data));
  }
});

const currentPaymentStatus = computed(() => {
  return paymentStatus.value?.payments[0];
});
</script>
