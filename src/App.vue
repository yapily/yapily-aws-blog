<template>
  <Authenticator>
    <Header />
    <router-view />
  </Authenticator>
</template>

<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import Header from "@/components/Header.vue";
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
</style>
