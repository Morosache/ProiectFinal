<script setup>
import LatestTransactionsCard from '@/components/home-page/LatestTransactionsCard.vue';
import NewTransactionCard from '@/components/home-page/NewTransactionCard.vue';
import StatisticsCard from '@/components/home-page/StatisticsCard.vue';
import TopHomeBar from '@/components/home-page/TopHomeBar.vue';


</script>

<template>
  <div class="flex flex-col w-full h-screen bg-[#F6F6F6]">
    <TopHomeBar />
    <div class="flex justify-center items-center flex-wrap ml-[200px] mb-[50px]">
      <div class=" flex flex-row gap-25 justify-between items-center mx-[40px] my-[40px]">
        <NewTransactionCard />
        <LatestTransactionsCard title="Latest Transactions" />
      </div>
      <StatisticsCard />
    </div>
  </div>
</template>