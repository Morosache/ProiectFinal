<script setup>
import TransferHistoryTransactions from './TransferHistoryTransactions.vue';
import { computed } from 'vue';
import { useTransfers } from '@/stores/transfersStore';

const transfersStore = useTransfers();

const latestTransfers = computed(() => [...transfersStore.transfers].reverse())
</script>

<template>
  <div class="w-[600px] max-h-[350px] overflow-y-auto bg-white rounded-[10px] border-1 border-[#dbd8d8]">
    <h1 class="text-center text-[20px] font-medium mt-[5px] border-b border-[#dbd8d8]">
      Transfers History
    </h1>
    <div class="flex flex-col ">
      <div>
        <TransferHistoryTransactions
          v-for="transfer in latestTransfers"
          :key="transfer.id"
          :transfer="transfer"
          :transfer-id="transfer.id"
        />
      </div>
    </div>
  </div>
</template>