<script setup>
import BarChart from '../charts/BarChart.vue';
import PieChart from '../charts/PieChart.vue';
import RouterLinkButton from '../buttons/RouterLinkButton.vue';
</script>

<template>
  <div
    id="statistics-card"
    class="bg-white w-[1300px] h-[300px] rounded-[10px] flex flex-col p-[20px] "
  >
    <div class="flex flex-row justify-between items-center flex-1 overflow-hidden">
      <div class="w-1/2 h-full flex justify-center items-center overflow-hidden">
        <BarChart />
      </div>
      <div class="w-1/2 h-full flex justify-center items-center overflow-hidden">
        <PieChart />
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <RouterLinkButton
        to="/statistics-page"
        title="See other statistics"
      />
    </div>
  </div>
</template>

<style scoped>
#statistics-card {
    border: 1px solid rgb(219, 216, 216);
}
</style>
