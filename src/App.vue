<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import ProfileEditModal from "./components/globals/ProfileEditModal.vue";

</script>

<template>
  <main>
    <router-view />
  </main>
  <ProfileEditModal />
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

p,
h1,
h2,
h3,
h4,
h5 {
  margin-bottom: unset;
}

div {
  word-wrap: break-word;
}
</style>
