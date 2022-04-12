<template>
  <div>callback</div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, toRefs } from "vue";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-vue";
const route = useRoute();
const router = useRouter();
const { user } = toRefs(useAuthenticator());

console.log(route.query);
onMounted(async () => {
  await API.post("awsblogapi", `/v1/accounts`, {
    body: {
      userId: user.value.attributes.sub,
      institutionId: route.query.institution,
      consentToken: route.query.consent,
    },
  });
  router.push("/accounts");
});
</script>
