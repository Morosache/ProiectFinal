<script setup>
import TopBudgetBar from '@/components/budget-page/TopBudgetBar.vue';
import NewTransfersCard from '@/components/transfers-page/NewTransfersCard.vue';
import TransferHistoryCard from '@/components/transfers-page/TransferHistoryCard.vue';
</script>

<template> 
  <div class="bg-[#f5f5f5] w-full h-screen">
    <TopBudgetBar />
    <div class=" ml-[200px] mt-[100px] flex justify-center items-center flex-row gap-[100px]">
        <NewTransfersCard />
        <TransferHistoryCard />
    </div>
  </div>
</template>