<template>
  <div class="container">
    <template v-if="institution && PaymentRequestData">
      <InstitutionsConsent
        :institution="institution"
        :auth-data="PaymentRequestData"
        :is-loading="loading"
        @cancelled="cancel"
        @continue="onContinue"
      />
    </template>
  </div>
</template>

<script setup>
// @ is an alias to /src
import InstitutionsConsent from "@/components/InstitutionsConsent";
import { onMounted, toRefs, onUpdated, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import useInterval from "../../../../hooks/useInterval";
import { useLoading } from "../../../../hooks/useLoading";
import { useInstitutions } from "../../../../hooks/useInstitutions";
import { usePaymentRequest } from "../../../../hooks/usePaymentRequest";
// import { API } from "aws-amplify";
import { usePayment } from "../../../../hooks/usePayment";
import { API } from "aws-amplify";

const router = useRouter();
const route = useRoute();

const id = route.params.institutionId; // get institutionId from url
const { loading } = useLoading();
const { user } = toRefs(useAuthenticator());
const { institution, fetchInstitution } = useInstitutions();
const { makePaymentRequest, PaymentRequestData } = usePaymentRequest();
const { makePayment, paymentDetail } = usePayment();
const { startInterval, terminateInterval, consentData } = useInterval();
const paymentDetails = JSON.parse(sessionStorage.getItem("payeeDetails")); // get payment details from session storage

onMounted(async () => {
  // fetch institution details and make payment request when page is mounted
  loading.value = true;
  await fetchInstitution(id);
  if (paymentDetails) {
    // check if we have payment detail first before making a consent request
    await makePaymentRequest({ id, user, paymentDetails });
    loading.value = false;
  }
});

onUpdated(() => {
  // start the interval to check for consent status once if payment consent request was successful
  if (PaymentRequestData.value && loading.value === false)
    startInterval({
      authRequestData: PaymentRequestData,
      user,
    });
});

// watch consentData variable until value is received from interval
watch(consentData, async (newData) => {
  // at this point consent has been authorised so continue logic here
  const { consentToken } = newData;
  await makePayment({ consent: consentToken, paymentDetails }); // make the payment to the payee
});

// watch the paymentDetail
watch(paymentDetail, async (newValue) => {
  // payment should be done by this point save payment details to the database
  const { consentToken } = consentData.value;
  await API.post("awsblogapi", `/v1/save-payment`, {
    body: {
      userId: user.value.attributes.sub,
      institutionId: id,
      paymentConsentToken: consentToken,
      paymentId: newValue.id,
    },
  }).then(() => {
    router.push("/payment/detail");
    sessionStorage.clear();
  });
});
const cancel = () => {
  // clear the interval and go back home
  terminateInterval();
  router.push("/");
};

const onContinue = () => {
  window.open(`${PaymentRequestData.value.authorisationUrl}`, "_blank"); // open bank login page in new tab
};
</script>
