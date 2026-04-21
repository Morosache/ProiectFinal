<script setup>
import BudgetBarChart from '../charts/BudgetBarChart.vue';
import BudgetPieChart from '../charts/BudgetPieChart.vue';
</script>

<template>
  <div class="flex justify-center">
    <div
      id="statistics-budget-card"
      class="w-[575px] h-[605px] bg-white mx-[30px] my-[30px] rounded-[10px] flex flex-col"
    >
      <div class="w-full h-1/2 flex justify-center overflow-hidden p-6">
        <BudgetBarChart />
      </div>
      <div class="w-full h-1/2 flex justify-center overflow-hidden p-6">
        <BudgetPieChart />
      </div>
    </div>
  </div>
</template>


<style scoped>
#statistics-budget-card {
    border: 1px solid rgb(219, 216, 216);
}
</style>