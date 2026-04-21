<script setup>
import { ref } from 'vue'
import NewTransactionModal from '../transactions-page/NewTransactionModal.vue';

const isModalOpen = ref(false);
</script>

<template>
  <Teleport to="body">
    <NewTransactionModal
      v-if="isModalOpen"
      @close="isModalOpen = false"
    />
  </Teleport>
  <div
    id="new-transaction"
    class="bg-white w-[650px] h-[275px] rounded-[10px]"
  >
    <div class="flex justify-center items-center flex-col gap-5 h-full">
      <h1 class="text-[25px] font-medium ">
        Register new transaction
      </h1>
      <button
        class="px-[20px] py-[3px] text-[16px] bg-[#56D788] rounded-[10px] font-semibold hover:bg-[#4cc179] cursor-pointer"
        @click="isModalOpen = true"
      >
        Add new transaction
      </button>
    </div>
  </div>
</template>

<style scoped>
#new-transaction {
    border: 1px solid rgb(219, 216, 216);
}
</style>