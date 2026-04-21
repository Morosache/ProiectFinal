<script setup>
import { Wallet } from 'lucide-vue-next';
import { useBalance } from '@/stores/balanceStore';
import RouterLinkButton from '../buttons/RouterLinkButton.vue';

const balanceStore = useBalance();





</script>

<template>
  <div
    id="top-bar"
    class="ml-[200px] p-[30px] bg-[#FFFFFF]"
  >
    <div
      class="flex justify-between items-center mx-[20px]"
    >
      <div class="flex flex-row gap-1">
        <Wallet />
        <p class="font-semibold">
          Your Budget: {{ balanceStore.totalBalance }} Ron
        </p>
      </div>
      <RouterLinkButton
        to="/budget-page"
        title="Manage your budget"
      />
    </div>
  </div>
</template>

<style scoped>
#top-bar {
    border-bottom: 1px solid rgb(219, 216, 216);
}
</style>