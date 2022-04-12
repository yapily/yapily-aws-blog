<template>
  <div class="container card">
    <template v-if="institutions && institutions.length">
      <InstitutionsList :institutions="institutions" />
    </template>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { toRefs, onMounted, ref } from "vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { API } from "aws-amplify";
import InstitutionsList from "@/components/InstitutionsList.vue";
const { user } = toRefs(useAuthenticator());
const institutions = ref([]);
onMounted(async () => {
  await fetchInstitutions();
  console.log(user.value.attributes.sub);
});
const fetchInstitutions = async () => {
  const res = await API.get("awsblogapi", "/v1/institutions");
  institutions.value = res.data;
};
</script>
