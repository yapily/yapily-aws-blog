<template>
  <div class="row mb-3">
    <label class="col-12 col-md-4 col-lg-3" for="fullName">Full name</label>
    <div class="col-12 col-md-8 col-lg-9">
      <input
        class="field-input"
        id="fullName"
        v-model="payeeDetails.fullName"
        type="text"
        name="senderFullName"
        @focus="onFocus"
        maxlength="150"
      />
    </div>
  </div>
  <div class="row mb-3">
    <label class="col-12 col-md-4 col-lg-3">Sort code</label>
    <div class="col-12 col-md-8 col-lg-9">
      <div class="d-flex align-items-center align-content-center">
        <input
          class="field-input"
          id="payeeSortCodeA"
          v-model="payeeDetails.sortCodeA"
          name="payeeSortCodeA"
          maxlength="2"
          @keypress="onlyForNumber"
          @keyup="focusNextField"
          @click="onFocusSortCode"
          clearOnFocus
          focusnext="payeeSortCodeB"
        />
        -
        <input
          class="field-input"
          id="payeeSortCodeB"
          v-model="payeeDetails.sortCodeB"
          name="payeeSortCodeB"
          maxlength="2"
          @keypress="onlyForNumber"
          @keyup="focusNextField"
          @click="onFocusSortCode"
          clearOnFocus
          focusnext="payeeSortCodeC"
        />
        -
        <input
          class="field-input"
          id="payeeSortCodeC"
          v-model="payeeDetails.sortCodeC"
          name="payeeSortCodeC"
          maxlength="2"
          @keypress="onlyForNumber"
          @keyup="focusNextField"
          focusnext="accountNumber"
          @click="onFocusSortCode"
          clearOnFocus
        />
      </div>
    </div>
  </div>
  <div class="row mb-3">
    <label class="col-12 col-md-4 col-lg-3" for="accountNumber"
      >Account number</label
    >
    <div class="col-12 col-md-8 col-lg-9">
      <input
        class="field-input"
        id="accountNumber"
        v-model="payeeDetails.accountNumber"
        type="text"
        name="payeeAccountNumber"
        @focus="onFocus"
        maxlength="150"
      />
    </div>
  </div>
  <div class="row mb-3">
    <label class="col-12 col-md-4 col-lg-3" for="amount">Amount</label>
    <div class="col-12 col-md-8 col-lg-9">
      <input
        class="field-input"
        id="amount"
        v-model="payeeDetails.amount"
        type="text"
        name="amount"
        @focus="onFocus"
        maxlength="150"
      />
    </div>
  </div>
  <div class="row mb-3">
    <label class="col-12 col-md-4 col-lg-3"></label>
    <div class="col-12 col-md-8 col-lg-9">
      <button class="d-flex button primary" @click.prevent="makePayment">
        Next
      </button>
    </div>
  </div>
  <div class="row mb-3">
    <label class="col-12 col-md-4 col-lg-3"></label>
    <div class="col-12 col-md-8 col-lg-9">
      <small
        v-for="(error, index) in errors"
        :key="index"
        class="d-flex"
        style="color: red"
        >{{ error }}</small
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, defineEmits, ref } from "vue";

const emit = defineEmits(["submitPayeeDetails"]);

const errors = ref([]);
const payeeDetails = reactive({
  fullName: "",
  sortCode: "",
  sortCodeA: "",
  sortCodeB: "",
  sortCodeC: "",
  accountNumber: "",
  amount: 1,
  reference: "Yapily-AWS-test",
});

const onFocus = (event) => {
  const el = event.target;
  el.classList.remove("error");
};
const onlyForNumber = ($event) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  const el = $event.target;
  el.classList.remove("error");
  if (!(keyCode > 47 && keyCode < 58)) {
    $event.preventDefault();
  }
};
const focusNextField = ($event) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  const focusNextValue = $event.target.getAttribute("focusnext");

  let focusNext = document.getElementById(`${focusNextValue}`);
  if ($event.target.maxLength === $event.target.value.length) {
    if (focusNext && keyCode !== 9 && keyCode !== 16) {
      focusNext.select();
    }
  }
};

const onFocusSortCode = (event) => {
  event.preventDefault();
  const el = event.target;
  el.classList.remove("error");
  el.select();
};
const validateForm = () => {
  if (
    !payeeDetails.sortCodeA ||
    !payeeDetails.sortCodeB ||
    !payeeDetails.sortCodeC
  ) {
    errors.value.push("Sort code is required");
  }
  if (!payeeDetails.accountNumber) {
    errors.value.push("Account number is required");
  }
  if (!payeeDetails.fullName) {
    errors.value.push("Full name is required");
  }

  if (!payeeDetails.accountNumber) {
    errors.value.push("Amount is required");
  }
};
const makePayment = () => {
  errors.value = [];
  validateForm();
  if (
    payeeDetails.sortCodeA &&
    payeeDetails.sortCodeB &&
    payeeDetails.sortCodeC
  ) {
    payeeDetails.sortCode = `${payeeDetails.sortCodeA}${payeeDetails.sortCodeB}${payeeDetails.sortCodeC}`;
  }
  if (!errors.value.length) emit("submitPayeeDetails", payeeDetails);
};
</script>
