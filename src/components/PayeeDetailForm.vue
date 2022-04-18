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
        class="input mb-5"
        id="accountNumber"
        name="sortCode"
        v-model="payeeDetails.accountNumber"
        placeholder="Sort code"
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
});

const makePayment = () => {
  emit("submitPayeeDetails", payeeDetails);
};
</script>
