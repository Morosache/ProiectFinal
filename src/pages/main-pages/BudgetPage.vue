<script setup>
import AddBudgetCard from '@/components/budget-page/AddBudgetCard.vue';
import BudgetStatisticsCard from '@/components/budget-page/BudgetStatisticsCard.vue';
import LatestBudgetCard from '@/components/budget-page/LatestBudgetCard.vue';
import TopBudgetBar from '@/components/budget-page/TopBudgetBar.vue';
import { useIncome } from '@/stores/incomeStore.js'

const incomeStore = useIncome();

</script>

<template>
  <div class="bg-[#F6F6F6] flex flex-col w-full h-screen">
    <TopBudgetBar />
    <div class="flex flex-row ml-[185px] justify-center items-center flex-wrap mt-[10px]">
      <div class=" flex flex-col justify-between items-center">
        <AddBudgetCard />
        <LatestBudgetCard :incomes="incomeStore.incomes" />
      </div>
      <BudgetStatisticsCard />
    </div>
  </div>
</template>