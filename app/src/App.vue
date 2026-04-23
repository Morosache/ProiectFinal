<script setup>
import SideMenu from './components/home-page/SideMenu.vue';
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useTransaction } from './stores/transactionsStore';
import { useIncome } from './stores/incomeStore';
import { useTransfers } from './stores/transfersStore';

const transactionStore = useTransaction()
const incomeStore = useIncome()
const transfersStore = useTransfers()
const route = useRoute()

onMounted(async () => {
  await transactionStore.fetchTransactions()
  await incomeStore.fetchIncome()
  await transfersStore.fetchTransfers()
})
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
