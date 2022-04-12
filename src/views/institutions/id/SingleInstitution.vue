<template>
  <div class="container">
    <template v-if="institution && authRequestData">
      <InstitutionsConsent
        :institution="institution"
        :auth-data="authRequestData"
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
import { onBeforeUnmount, onMounted, onUpdated, ref, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const institution = ref({});
const loading = ref(false);
const { user } = toRefs(useAuthenticator());
const authRequestData = ref();
const interval = ref(null);
let startTime = null;

onMounted(async () => {
  loading.value = true;
  await fetchInstitution();
  await makeAuthRequest();
  startTime = new Date().getTime();
  loading.value = false;
});

onUpdated(() => {
  startInterval();
});
onBeforeUnmount(() => {
  clearInterval(interval.value);
});

const makeAuthRequest = async () => {
  await API.post("awsblogapi", "/v1/account-auth-requests", {
    body: {
      institutionId: id,
      callbackURL: `${window.origin}/callback/`,
      userId: user.value.attributes.sub,
    },
  }).then((res) => {
    authRequestData.value = res.data;
  });
};

const startInterval = () => {
  if (authRequestData.value && !loading.value) {
    interval.value = setInterval(async () => {
      if (new Date().getTime() - startTime > 300000) {
        // clear interval after 5 minutes
        clearInterval(interval.value);
        return;
      }
      const { id } = authRequestData.value;
      const result = await API.get("awsblogapi", `/v1/consents/${id}`);
      console.log(result);
      if (result.data && result.data?.status === "AUTHORIZED") {
        clearInterval(interval.value);
        // 'Your account has now been connected.
        setTimeout(async () => {
          clearInterval(interval.value);
          const { consentToken } = result.data;
          await API.post("awsblogapi", `/v1/accounts`, {
            body: {
              userId: user.value.attributes.sub,
              institutionId: id,
              consentToken,
            },
          }).then(() => {
            router.push("/accounts");
          });
        }, 3000);
      }
    }, 2000);
  }
};

const fetchInstitution = async () => {
  institution.value = await API.get("awsblogapi", `/v1/institution/${id}`);
};

const cancel = () => {
  clearInterval(interval.value);
  router.push("/");
};

const onContinue = () => {
  clearInterval(interval.value);
  window.open(`${authRequestData.value.authorisationUrl}`, "_blank");
};
</script>
