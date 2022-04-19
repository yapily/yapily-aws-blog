<template>
  <div id="footer" class="footer-content d-flex mt-auto flex-column">
    <div class="d-flex justify-content-between align-items-top">
      <div class="text">
        <h2 id="footer-title">More about Yapily at Yapily.com</h2>
      </div>
      <div class="icon">
        <svg
          width="80"
          height="80"
          fill="#fff"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          class="footerstyles__Logo-sc-11vzejv-13 fRnQRT"
        >
          <path
            d="M66.7873 0.00128453C59.5891 0.0990336 53.8319 6.01053 53.9274 13.2044L54.0461 21.9064C54.0647 23.4471 53.4734 24.932 52.4002 26.0374L51.9695 26.4796C50.894 27.5898 49.418 28.2275 47.8722 28.2461L46.643 28.2647C46.6454 28.2647 46.6453 28.2671 46.6453 28.2717C44.6083 26.9637 42.1756 26.2143 39.5728 26.2469C37.3426 26.2772 35.2544 26.8776 33.4385 27.9086C33.0358 27.89 32.64 27.8551 32.2326 27.8598L32.0929 27.8621C30.5541 27.883 29.0665 27.2942 27.963 26.219C26.8502 25.1414 26.217 23.6682 26.1937 22.1205L26.0727 12.8669C25.9749 5.67306 20.0617 -0.0848278 12.8612 0.010594C5.66296 0.106016 -0.0965499 6.01984 0.00122673 13.216C0.0966754 20.4122 6.01216 26.1678 13.2081 26.0724L21.9125 25.956C23.4537 25.935 24.9389 26.5262 26.0447 27.6014L26.4894 28.0297C27.5975 29.1096 28.2331 30.5874 28.254 32.1305L28.2727 33.357C28.2773 33.3547 28.282 33.3523 28.2866 33.35C27.4066 35.1165 26.9154 37.1087 26.941 39.2196C26.9759 41.7425 27.7488 44.0838 29.0386 46.0527C29.0362 46.2948 29.0106 46.5345 29.0106 46.7812L29.013 46.9185C29.0316 48.4592 28.4426 49.9441 27.3671 51.0472C26.2915 52.1621 24.8155 52.7951 23.2697 52.816L14.0159 52.9371C6.81533 53.0302 1.05815 58.944 1.15359 66.1425C1.24904 73.341 7.16686 79.0943 14.3628 78.9988C21.5633 78.9057 27.3205 72.9896 27.2227 65.7911L27.1086 57.0914C27.0877 55.553 27.679 54.0658 28.7522 52.9603L29.1806 52.5205C30.2608 51.408 31.7344 50.7726 33.2825 50.754L34.5071 50.7377C34.5047 50.7284 34.4978 50.7168 34.4931 50.7051C36.146 51.4522 37.9805 51.8688 39.9127 51.8409C46.9829 51.7478 52.6353 45.9387 52.5422 38.8728C52.5259 37.5951 52.3164 36.3616 51.9509 35.2026C52.0696 34.2274 52.1488 33.236 52.1371 32.2236V32.0839C52.1185 30.5455 52.7075 29.0584 53.7807 27.9552C54.8563 26.8427 56.3322 26.2097 57.8804 26.1864L67.1365 26.0654C74.3348 25.9676 80.0943 20.0561 79.9988 12.8576C79.9011 5.66142 73.9856 -0.0987919 66.7873 0.00128453Z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="legal d-flex flex-column w-75 mt-auto">
      <h4 id="footer-copyright">
        © 2022 Yapily Ltd. 2 Westland Pl, London N1 7LP. All Rights Reserved.
      </h4>
      <p id="footer-legal">
        Yapily Ltd company no. 10842280. Safeconnect Ltd, a Yapily Ltd entity,
        is regulated by the UK Financial Conduct Authority under the Payment
        Services Regulations 2017 as an Authorised Payment Institution to
        provide account information services and payment initiation services
        (Firm Reference Number: 827001)
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.footer-content {
  min-height: 350px;
  background-color: #272826;
  padding: 45px 80px;
  text-align: left;
  h2 {
    color: #fff;
  }
  .legal {
    p,
    h4 {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
