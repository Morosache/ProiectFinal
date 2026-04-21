<script setup>
import { useBalance } from '@/stores/balanceStore';
import { useIncome } from '@/stores/incomeStore';
import { Banknote } from 'lucide-vue-next';
import { CreditCard } from 'lucide-vue-next';
import { PiggyBank } from 'lucide-vue-next';
import { watch } from 'vue'
const balanceStore = useBalance();
const incomeStore = useIncome();

watch(() => {
  if(incomeStore.economiesBudget > 1000){
    alert('Congratulations! You have 1000 worth of economies')
  }

})

</script>

<template>
  <div
    id="top-budget-bar"
    class="ml-[200px] p-[30px] bg-[#FFFFFF]"
  >
    <div class="flex justify-between items-center mx-[20px]">
      <div class="flex flex-row gap-1">
        <Banknote />
        <p class="font-semibold text-[16px]">
          Cash: {{ balanceStore.totalCashBalance }} RON
        </p>
      </div>
      <div class=" flex flex-row gap-1">
        <CreditCard />
        <p class="font-semibold">
          Card: {{ balanceStore.totalCardBalance }} RON
        </p>
      </div>
      <div class="flex flex-row gap-1">
        <PiggyBank />
        <p class="font-semibold">
          Economies: {{ incomeStore.economiesBudget }} RON
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#top-budget-bar {
    border-bottom: 1px solid rgb(219, 216, 216);
}
</style>