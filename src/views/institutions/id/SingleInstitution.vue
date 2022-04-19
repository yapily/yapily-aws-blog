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
import { onMounted, ref, toRefs, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import useInterval from "../../../../hooks/useInterval";
import { useLoading } from "../../../../hooks/useLoading";
import { useInstitutions } from "../../../../hooks/useInstitutions";
import { useAccountRequest } from "../../../../hooks/useAccountRequest";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const { loading } = useLoading();
const { user } = toRefs(useAuthenticator());
const authRequestData = ref();
const { institution, fetchInstitution } = useInstitutions();
const { makeAISAccountRequest, AISAuthRequestData } = useAccountRequest();
onMounted(async () => {
  loading.value = true;
  await fetchInstitution(id);
  await makeAISAccountRequest(id, user);
  loading.value = false;
});

const { startInterval, terminateInterval } = useInterval({
  demoType: "ais",
});
onUpdated(() => {
  if (authRequestData.value)
    startInterval({
      authRequestData: AISAuthRequestData,
      user,
    });
});

const cancel = () => {
  terminateInterval();
  router.push("/");
};

const onContinue = () => {
  terminateInterval();
  window.open(`${authRequestData.value.authorisationUrl}`, "_blank");
};
</script>
