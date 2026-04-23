<script setup>
import NewTransactionInput from '../transactions-page/new-transaction-modal/NewTransactionInput.vue';
import SelectTransferSource from './SelectTransferSource.vue';
import { ArrowRight } from 'lucide-vue-next'
import { useTransfers } from '@/stores/transfersStore';
import { ref } from 'vue'

const transfersStore = useTransfers();
const transferData = ref({
  amount: 0,
  source: '',
  destination: ''
})

const handleAddTransfer = async () => {
 await transfersStore.addTransfer(transferData.value)
}

</script>

<template>
  <div
    id="transfers-card"
    class="w-[600px] h-[350px] bg-white rounded-[10px]"
  >
    <h1 class="text-center text-[20px] font-medium mt-[20px]">
      Transfer money
    </h1>

    <form submit.prevent>
      <div class="flex flex-col justify-center items-center gap-[20px] my-[30px]">
        <NewTransactionInput
          v-model="transferData.amount"
          label-name="Amount to transfer"
          input-type="Number"
          placeholder="Amount"
        />

        <div class="flex flex-row items-center justify-center gap-[20px]">
          <SelectTransferSource
            v-model="transferData.source"
            title="Source"
          />
          <ArrowRight class="mt-[20px]" />
          <SelectTransferSource
            v-model="transferData.destination"
            title="Destination"
          />
        </div>

        <div>
          <button
            type="button"
            class="px-[20px] py-[10px] mt-[15px] bg-[#56d788] rounded-lg font-medium hover:bg-[#4cc179]"
            @click="handleAddTransfer"
          >
            Save Transfer
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
    #transfers-card {
        border: 1px solid #dbd8d8
    }
</style>