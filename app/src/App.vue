<script setup>
import SideMenu from './components/home-page/SideMenu.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="flex">
    <SideMenu v-if="!['/','/login','/reset-password', '/reset-succesful', '/register', '/enter-code', '/forgot-your-password'].includes(route.path)" />
    <router-view />
  </div>
</template>

<style scoped>
@import "tailwindcss";
@import "bootstrap-icons";
</style>
