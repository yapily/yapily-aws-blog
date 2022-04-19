<template>
  <div class="container">
    <template v-if="!demoSelected">
      <h1>Select which type of demo</h1>
      <div class="row d-flex justify-content-around">
        <div class="col-lg-6">
          <div class="card m-2 cursor" @click="demoType('ais')">
            <div class="d-flex" id="card-one-title">
              <h2 class="card-title highlight">Data</h2>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card m-2 cursor" @click="demoType('pis')">
            <div class="d-flex" id="card-two-title">
              <h2 class="card-title highlight">Payments</h2>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="demoSelected">
      <InstitutionsList
        :institutions="institutions"
        @institutionSelected="institutionSelected"
      />
    </template>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import InstitutionsList from "@/components/InstitutionsList";
import { useInstitutions } from "../../hooks/useInstitutions";

const router = useRouter();
const selectedDemo = ref("");
const demoSelected = ref(false);

const { fetchInstitutions, institutions } = useInstitutions();
// call fetchInstitutions function when page is mounted
onMounted(async () => {
  await fetchInstitutions();
});

const demoType = (type) => {
  selectedDemo.value = type;
  demoSelected.value = true;
};

//institutionsList component emits the institution Id when clicked
const institutionSelected = (institutionId) => {
  // if user selected the Data demo continue to consent page
  if (selectedDemo.value === "ais") {
    router.push(`/institutions/${institutionId}`);
  }
  // if user selected the payment demo continue to enter payee details page
  if (selectedDemo.value === "pis") {
    router.push(`/payment?institutionId=${institutionId}`);
  }
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
