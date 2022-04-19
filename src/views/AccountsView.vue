<template>
  <div class="container card">
    <template v-if="!accounts.length">
      <h1 class="page-title">Accounts</h1>
      <p>No accounts added</p>
      <div class="placeholder empty-card">&nbsp;</div>
      <router-link to="/" class="button primary"
        >Connect Institution</router-link
      >
    </template>
    <template v-if="accounts.length">
      <!--  Account Information with Institution   -->
      <ul class="accounts-list">
        <li class="accounts-item">
          <div class="accounts-content no-icon-or-category">
            <div class="accounts-icon">
              <div class="icon-image">
                <img alt="institution" :src="institution.media[1].source" />
              </div>
            </div>
            <div class="accounts-text">
              <div class="accounts-title">
                {{ institution.name }}
              </div>
              <div class="accounts-subtitle">
                {{ sortCode }} {{ accountNumber }}
              </div>
            </div>
            <div class="accounts-value">
              <div class="accounts-figure">£{{ personalAccount.balance }}</div>
            </div>
          </div>
        </li>
      </ul>
      <!--  Transactions     -->
    </template>
    <h3>Transactions</h3>
    <div
      v-for="(transaction, index) in transactions"
      :key="index"
      class="transaction-item"
    >
      <TransactionList
        class="transaction-content"
        list-date="true"
        :transaction="transaction"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, toRefs } from "vue";
import TransactionList from "@/components/TransactionList.vue";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-vue";
const { user } = toRefs(useAuthenticator());
const accounts = ref([]);
const institution = ref({});
const transactions = ref([]);
onMounted(async () => {
  const userConsents = await API.get(
    "awsblogapi",
    `/v1/accounts/${user.value.attributes.sub}`
  );
  // pre select first object in array for demo purposes
  console.log(userConsents);
  const { consentToken, institutionId } = userConsents[0];

  if (consentToken) {
    await API.get("awsblogapi", `/v1/accounts?consent=${consentToken}`).then(
      (res) => {
        accounts.value = res.data;
      }
    );
  }
  if (institutionId) {
    institution.value = await API.get(
      "awsblogapi",
      `/v1/institution/${institutionId}`
    );
  }
  if (personalAccount.value) {
    await API.get(
      "awsblogapi",
      `/v1/accounts/${personalAccount.value.id}/transactions?consent=${consentToken}`
    ).then((res) => {
      transactions.value = res.data;
    });
  }
});
const personalAccount = computed(() => {
  return accounts.value.filter(
    (account) => account.accountType.toLowerCase() === "current"
  )[0];
});
const sortCode = computed(() => {
  return personalAccount.value.accountIdentifications.filter(
    (acc) => acc.type === "SORT_CODE"
  )[0].identification;
});
const accountNumber = computed(() => {
  return personalAccount.value.accountIdentifications.filter(
    (acc) => acc.type === "ACCOUNT_NUMBER"
  )[0].identification;
});
</script>
<style lang="scss">
.icon-image {
  width: 45px;
  height: 45px;
}
</style>
