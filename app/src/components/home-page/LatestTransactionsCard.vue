<script setup>
import { History } from 'lucide-vue-next';
import HomeTransactionCard from './HomeTransactionCard.vue';
import { useTransaction } from '@/stores/transactionsStore';
import { computed } from 'vue'
const transactionStore = useTransaction(); 
import { useRoute } from 'vue-router'

const route = useRoute();

const props = defineProps ({
  title: String
})

const latestTransactions = computed(() => {
  if(route.path ==='/home-page'){
    return [...transactionStore.transactions].reverse().slice(0,3)
  }
   else {
    return [...transactionStore.transactions].reverse()
  }
})

</script>

<template>
  <div
    id="latest-transaction"
    class="bg-white w-[550px] rounded-[10px] max-h-[400px] overflow-y-auto"
  >
    <div
      id="transaction-card-upper"
      class="flex flex-row justify-between items-center h-[40px]"
    >
      <span class="font-semibold ml-[30px] text-[15px]">{{ title }}</span>
      <router-link to="/transactions-page">
        <History class="mr-[30px] w-[20px] h-[20px]" />
      </router-link>
    </div>
    <div class="flex flex-col ">
      <div>
        <HomeTransactionCard
          v-for="transaction in latestTransactions"
          :key="transaction.id"
          :transaction="transaction"
          :transactionId="transaction.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#latest-transaction {
    border: 1px solid rgb(219, 216, 216);
}

#transaction-card-upper {
    border-bottom: 1px solid rgb(219, 216, 216);
}

p {
    font-size: 12px;
}
</style>