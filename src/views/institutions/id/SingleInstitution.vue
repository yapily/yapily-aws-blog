<template>
  <div class="container">
    <template v-if="institution && AISAuthRequestData">
      <InstitutionsConsent
        :institution="institution"
        :auth-data="AISAuthRequestData"
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
import { useAccountRequest } from "../../../../hooks/useAccountRequest";
import { API } from "aws-amplify";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const { loading } = useLoading();
const { user } = toRefs(useAuthenticator());
const { institution, fetchInstitution } = useInstitutions();
const { makeAISAccountRequest, AISAuthRequestData } = useAccountRequest();
onMounted(async () => {
  loading.value = true;
  await fetchInstitution(id);
  await makeAISAccountRequest(id, user);
  loading.value = false;
});

const { startInterval, terminateInterval, consentData } = useInterval({
  demoType: "ais",
});
onUpdated(() => {
  if (AISAuthRequestData.value && loading.value === false)
    startInterval({
      authRequestData: AISAuthRequestData,
      user,
      institutionId: id,
    });
});

// watch consentData variable until value is received from interval
watch(consentData, async (newData) => {
  // at this point consent has been authorised so continue logic here
  const { consentToken } = newData;
  await API.post("awsblogapi", `/v1/accounts`, {
    body: {
      userId: user.value.attributes.sub,
      institutionId: id,
      consentToken,
    },
  }).then(() => {
    router.push("/accounts");
  });
});
const cancel = () => {
  terminateInterval();
  router.push("/");
};

const onContinue = () => {
  // terminateInterval();
  window.open(`${AISAuthRequestData.value.authorisationUrl}`, "_blank");
};
</script>
