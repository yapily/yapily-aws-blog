<template>
  <form @submit.prevent="makePayment">
    <div class="d-flex flex-column">
      <label for="fullName">Full Name: </label>
      <input
        type="text"
        class="input mb-3"
        id="fullName"
        name="fullName"
        v-model="payeeDetails.fullName"
        placeholder="Full name"
      />
      <label for="sortCode">Sort code: </label>
      <input
        type="number"
        class="input mb-3"
        id="sortCode"
        name="sortCode"
        v-model="payeeDetails.sortCode"
        placeholder="Sort code"
      />
      <label for="accountNumber">Account number: </label>
      <input
        type="number"
        class="input mb-3"
        id="accountNumber"
        name="accountNumber"
        v-model="payeeDetails.accountNumber"
        placeholder="Sort code"
      />
      <label for="amount">Amount: </label>
      <input
        type="number"
        class="input mb-5"
        id="amount"
        name="amount"
        v-model="payeeDetails.amount"
        placeholder="Amount"
      />
      <input type="submit" class="button primary" />
    </div>
  </form>
</template>

<script setup>
import { reactive, defineEmits } from "vue";

const emit = defineEmits(["submitPayeeDetails"]);

const payeeDetails = reactive({
  fullName: "",
  sortCode: "",
  accountNumber: "",
  amount: 0.01,
});

const makePayment = () => {
  emit("submitPayeeDetails", payeeDetails);
};
</script>
