<script setup>
import { useTransfers } from '@/stores/transfersStore';
import { Trash } from 'lucide-vue-next'
import { ArrowRight } from 'lucide-vue-next';

const transfersStore = useTransfers();

const props = defineProps({
    transfer: {
        type: Object,
        required: true
    },

    transferId: {
        type: Number,
        required: true
    },
})

</script>

<template>
  <div class="grid grid-cols-5 px-8 py-4 gap-15 flex items-center border-b border-[#dbd8d8]">
    <p>{{ transfer.amount }}</p>
    <p>{{ transfer.source }}</p>
    <ArrowRight class="w-[17px] h-[17px]" />
    <p>{{ transfer.destination }}</p>
    <button @click="transfersStore.removeTransfer(props.transferId)">
      <Trash class="w-[17px] h-[17px]" />
    </button>
  </div>
</template>

<style scoped>
    p {
        font-size: 16px;
    }
</style>