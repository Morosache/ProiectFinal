<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { useIncome } from '@/stores/incomeStore'
import NewTransactionInput from '../transactions-page/new-transaction-modal/NewTransactionInput.vue';

const incomeStore = useIncome();
const emit = defineEmits(['close'])

 const props = defineProps({
    income: {
      type: Object, 
      required: true
    },

    incomeId: {
      type: Number,
      required: true
    }
})

    const updatedIncomeData = ref({ ...props.income})

      watch(() => props.transaction, (newVal) => {
      updatedIncomeData.value = { ...newVal }
    }, {deep: true})

    const editIncome = () => {
        incomeStore.editIncome(props.incomeId, updatedIncomeData.value)
        console.log(props.transactionId)
        emit('close')
    }


const handleExit = () => {
    emit('close')
}
</script> 

<template>
  <div class="fixed inset-0 z-[100] flex justify-center items-center backdrop-blur-sm">
    <div class="bg-gray-100 h-[470px] w-[400px] rounded-[10px]">
      <button
        class="flex justify-self-end"
        type="button"
        @click="handleExit"
      >
        <X class="font-medium w-[24px] h-[24px] mt-[10px] mr-[10px]" />
      </button>
      <h1 class="text-center font-medium text-[20px]">
        Edit Income
      </h1>
        
      <div>
        <form
          class="flex justify-center flex-col items-center"
          @submit.prevent
        >
          <NewTransactionInput
            v-model="updatedIncomeData.amount"
            input-type="Number"
            title="0" 
            label-name="Amount"
          />

          <div class="flex flex-col">
            <label>Category</label>
            <select
              v-model="updatedIncomeData.category"
              class="w-[300px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
            >
              <option value="Cash">
                Cash
              </option>
              <option value="Card">
                Card
              </option>
              <option value="Economies">
                Economies
              </option>
            </select>
          </div>

          <div class="flex flex-col">
            <label> Source </label>
            <select 
              v-model="updatedIncomeData.source"
              class="w-[300px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
            >
              <option value="Salary">
                Salary
              </option>
              <option value="Gift">
                Gift
              </option>
              <option value="Investment">
                Investment
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <textarea
            v-model="updatedIncomeData.observation"
            placeholder="Observations"
            class="w-[300px] h-[80px] mt-[20px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-gray-700 resize-none align-top"
          />

          <div class="flex gap-4 mt-[30px]">
            <button
              type="button"
              class="px-[20px] py-[10px] bg-red-300 rounded-lg font-medium hover:bg-red-400"
              @click="handleExit"
            >
              Cancel
            </button>  
            <button
              type="button"
              class="px-[20px] py-[10px] bg-[#56d788] rounded-lg font-medium hover:bg-[#4cc179]"
              @click="editIncome"
            >
              Edit Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

