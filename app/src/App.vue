<script setup>
import SideMenu from './components/home-page/SideMenu.vue';
import { useRoute } from 'vue-router'
import { onMounted, computed, watch } from 'vue'
import { useTransaction } from './stores/transactionsStore';
import { useIncome } from './stores/incomeStore';
import { useTransfers } from './stores/transfersStore';
import { useWsStore } from './stores/wsStore'

const transactionStore = useTransaction()
const incomeStore = useIncome()
const transfersStore = useTransfers()
const route = useRoute()

const wsStore = useWsStore()
const wsTransaction = computed(() => wsStore.latestTransaction)

watch(wsTransaction, (newEvent) => {
  if (!newEvent) return

  if (newEvent.type === 'transaction:created') {
    const exists = transactionStore.transactions.some(t => t.id === newEvent.data.id)
    if (!exists) transactionStore.transactions.push(newEvent.data)
  } else if (newEvent.type === 'transaction:deleted') {
    transactionStore.transactions = transactionStore.transactions.filter(t => t.id !== newEvent.data.id)
  }
})

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
