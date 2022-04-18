<template>
  <div class="container">
    <h1>Select which type of demo</h1>
    <div class="row d-flex justify-content-around">
      <div class="col-lg-6">
        <div class="card m-2 cursor" @click="$router.push('/demo/ais')">
          <div class="d-flex" id="card-one-title">
            <h2 class="card-title highlight">Data</h2>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card m-2 cursor" @click="$router.push('/demo/pis')">
          <div class="d-flex" id="card-two-title">
            <h2 class="card-title highlight">Payments</h2>
          </div>
        </div>
      </div>
    </div>

    <!--    <template v-if="institutions && institutions.length">-->
    <!--      <InstitutionsList :institutions="institutions" />-->
    <!--    </template>-->
  </div>
</template>

<script setup>
// @ is an alias to /src
import { toRefs, onMounted, ref } from "vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { API } from "aws-amplify";
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
<style lang="scss" scoped>
h1 {
  font-size: 80px;
}
p {
  font-size: 20px;
  font-weight: 400;
}
.highlight {
  color: #0727d3;
}
.card-title {
  width: 100%;

  h2 {
    text-align: center;
    font-size: 48px;
    font-weight: 600;
  }
}
.card {
  box-shadow: 2px 2px 10px #ccc;
  cursor: pointer;
}
.cards-icons {
  max-height: 62px;
  max-width: 62px;
  min-height: 62px;
  min-width: 62px;
}
.text-content {
  font-size: 20px;
}
</style>
