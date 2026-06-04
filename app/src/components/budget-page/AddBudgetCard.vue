<script setup>
import { ref, computed } from 'vue'
import GenericButton from '../buttons/GenericButton.vue';
import { useIncome } from '@/stores/incomeStore.js'

const incomeStore = useIncome();


//
const incomeData = ref({
  amount:0,
  category:'',
  source:'',
  observation:'',
})

const isFormValid = computed(() => {
  return incomeData.value.amount > 0 && 
         incomeData.value.category && 
         incomeData.value.source
})

const handleNewIncome = async () => {
  console.log('date trimise:', incomeData.value)
  if(isFormValid.value){
  incomeStore.addIncome({...incomeData.value});


  incomeData.value = {
  amount:0,
  category:'',
  source:'',
  observation:'',
}
  }
  else {
    alert('You need to complete all the fields')
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div
      id="add-budget-card"
      class="w-[650px] h-[275px] bg-white mx-[30px] my-[30px] rounded-[10px]"
    >
      <h1 class="text-center text-[18px] font-semibold mt-3">
        New Income
      </h1>

      <form
        class="mx-[20px] my-[4px]"
        @submit.prevent
      >
        <div class="my-[5px] flex justify-center items-center flex-row gap-1">
          <input
            id="income-amount-input"
            v-model="incomeData.amount"
            type="number"
            placeholder="Amount"
            step=".01"
            class="w-1/3 h-[45px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          >

          <select
            v-model="incomeData.category"
            class="w-1/3 h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
          >
            <option
              disabled
              value=""
            >
              Select Category
            </option>
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

          <select
            v-model="incomeData.source"
            class="w-1/3 h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
          >
            <option
              disabled
              value=""
            >
              Select Source
            </option>
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
          v-model="incomeData.observation"
          placeholder="Observations"
          class="w-full h-[130px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-gray-700 resize-none align-top"
        />
        <div class="w-full h-full flex justify-center mt-[10px]">
          <GenericButton
            title="Add income"
            custom-class="w-[150px] px-[10px] py-[2px] bg-[#56d788] rounded-lg font-semibold hover:bg-[#4cc179] cursor-pointer"
            @click="handleNewIncome"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
#add-budget-card {
    border: 1px solid rgb(219, 216, 216);
}
</style>