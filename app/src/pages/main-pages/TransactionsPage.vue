<script setup>
import TopBudgetBar from '@/components/budget-page/TopBudgetBar.vue';
import LatestTransactionsCard from '@/components/home-page/LatestTransactionsCard.vue'
import NewTransactionCard from '@/components/home-page/NewTransactionCard.vue'
import BudgetStatisticsCard from '@/components/budget-page/BudgetStatisticsCard.vue';
</script>

<template> 
  <div class="bg-[#F6F6F6] flex flex-col w-full h-screen">
    <TopBudgetBar />
    <div class="ml-[185px] flex flex-row  gap-[30px] justify-center items-center mt-[40px]"> 
      <div class="flex flex-col justify-center items-center gap-[30px]">
        <NewTransactionCard />
        <LatestTransactionsCard title="All transactions" />
      </div>
      <BudgetStatisticsCard />      
    </div>
  </div>
</template>