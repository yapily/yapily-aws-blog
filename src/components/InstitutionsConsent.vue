<template>
  <div class="row">
    <div v-if="institution" class="col-12">
      <div class="bank_content">
        <h2 class="mb-4 mt-2">How would you like to log in?</h2>
        <div class="content">
          <p>Continue with mobile app</p>
          <div class="qr-code-card">
            <div>
              <p v-if="institution && loading">
                Connecting with {{ institution.name }}...
              </p>

              <p v-if="!loading">Scan the QR code</p>
            </div>
            <div class="qr-code-container">
              <div v-if="isLoading" class="spinner-container">
                <div class="spinner-container-icon m-auto">Loading...</div>
              </div>
              <img
                v-if="!isLoading && authData && authData.qrCodeUrl"
                alt="qr code"
                class="qr-code-img"
                :src="authData.qrCodeUrl"
              />
            </div>
          </div>
          <div v-if="!loading" class="desktop-action mb-2">
            <p class="text-center">or</p>
            <div class="d-flex justify-center">
              <button class="button primary" @click="onContinue">
                Continue on desktop
              </button>
              <button class="button secondary ml-3" @click="onCancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";

export default {
  name: "InstitutionsConsent",
  props: {
    institution: { type: Object, required: true },
    isLoading: { type: Boolean, required: true },
    authData: { type: Object, required: true },
  },
  setup(props, { emit }) {
    const loading = toRefs(props).isLoading;
    const onCancel = () => {
      emit("cancelled");
    };

    const onContinue = () => {
      emit("continue");
    };

    return {
      onCancel,
      onContinue,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
.qr-code-card {
  @extend .text-center;
}
</style>
