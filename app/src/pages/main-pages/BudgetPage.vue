<script setup>
import AddBudgetCard from "@/components/budget-page/AddBudgetCard.vue"
import BudgetStatisticsCard from "@/components/budget-page/BudgetStatisticsCard.vue"
import LatestBudgetCard from "@/components/budget-page/LatestBudgetCard.vue"
import TopBudgetBar from "@/components/budget-page/TopBudgetBar.vue"
import { useIncome } from "@/stores/incomeStore.js"

const incomeStore = useIncome()

</script>

<template>
  <div class="flex h-screen w-full flex-col bg-[#F6F6F6]">
    <TopBudgetBar />
    <div class="mt-[10px] ml-[185px] flex flex-row flex-wrap items-center justify-center">
      <div class="flex flex-col items-center justify-between">
        <AddBudgetCard />
        <LatestBudgetCard :incomes="incomeStore.incomes" />
      </div>
      <BudgetStatisticsCard />
    </div>
  </div>
</template>
