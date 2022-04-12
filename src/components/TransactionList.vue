<template>
  <div>
    <div v-if="transaction.description" class="transaction-text">
      <div class="transaction-title">
        <span class="transaction-title-merchant">{{ niceDescription }}</span>
      </div>
      <div v-if="category" class="transaction-category">
        {{ category[0] }}
      </div>
    </div>

    <div class="transaction-value">
      <div
        class="transaction-figure"
        :class="{
          success: type === 'income',
          expense: type === 'expense',
        }"
      >
        £ {{ Math.abs(transaction.amount) }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "TransactionList",
  props: {
    transaction: {
      required: true,
    },
    accountsTotal: {
      required: false,
      type: Number,
    },
  },
  setup(props) {
    const transaction = computed(() => {
      return props.transaction;
    });

    const category = computed(() => {
      return (
        transaction?.value.enrichment?.categorisation?.categories ||
        transaction?.value?.category
      );
    });

    const merchantName = computed(() => {
      const merchantName =
        transaction?.value?.enrichment?.merchant?.merchantName.toLowerCase();

      return merchantName?.replace(/\w/, (c) => c.toUpperCase()) || "";
    });

    const niceDescription = computed(() => {
      return merchantName.value || transaction?.value?.description;
    });

    const type = computed(() => {
      const amount = transaction.value.amount.toString();
      if (amount.includes("-")) {
        return "expense";
      } else {
        return "income";
      }
    });

    return {
      category,
      niceDescription,
      type,
    };
  },
};
</script>
<style lang="scss" scoped>
.success {
  color: green;
}
.expense {
  color: red;
}
.transaction-category {
  text-align: left;
  font-size: 10px;
}
</style>
