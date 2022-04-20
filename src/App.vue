<template>
  <Authenticator>
    <Header />
    <svg
      v-if="$route.name !== 'callback'"
      viewBox="0 0 1449 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.33054e-05 0L1.63317e-05 79.5C1.60336e-05 82.9145 10.1629 80.1478 35.0026 73.3857C76.9426 61.9683 160.723 39.1608 308.071 15.4829C440.988 -3.36792 683.232 -7.18613 948.488 44.9885C1195.64 93.6018 1360.72 92.3419 1431.97 91.7982C1438.42 91.749 1444.1 91.7057 1449 91.7057V0H2.33054e-05Z"
        fill="#F0F0EB"
      ></path>
    </svg>

    <router-view class="middle-content mb-5" />
    <Footer />
  </Authenticator>
</template>

<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>
<style lang="scss">
@import "./assets/default.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

[data-amplify-container] {
  margin: 4rem auto;
}
.middle-content {
  min-height: calc(100vh - 500px);
}
</style>
