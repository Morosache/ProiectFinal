<script setup>
    import NewTransactionInput from './new-transaction-modal/NewTransactionInput.vue';
    import SelectCategory from './new-transaction-modal/SelectCategory.vue';
    import SelectIsNeed from './new-transaction-modal/SelectIsNeed.vue';
    import SelectPaymentMethod from './new-transaction-modal/SelectPaymentMethod.vue';

    import { X } from 'lucide-vue-next'
    import { useTransaction } from '@/stores/transactionsStore';
    import { ref, computed} from 'vue'

    const transactionStore = useTransaction();
    const emit = defineEmits(['close']);

    const handleExit = () => {
      emit('close');
    }

    const isFormValid = computed(() => {
  return transactionData.value.date && 
         transactionData.value.name && 
         transactionData.value.price > 0 &&
         transactionData.value.categoryId &&
         transactionData.value.isNeed &&
         transactionData.value.paymentMethod 
})

    const transactionData = ref({
        date:'',
        name:'',
        price: 0,
        categoryId:'',
        isNeed:'',
        paymentMethod:''
    })
    const handleAdd = () => {
       console.log('date trimise:', transactionData.value) 
      if(isFormValid.value) {
      transactionStore.addTransaction(transactionData.value);
      emit('close');
      }
      else {
        alert('You need to complete all the fields');
      }
    }
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex justify-center items-center backdrop-blur-sm"
  >
    <div class="bg-[#f5f5f5] w-[600px] h-[600px] rounded-lg flex flex-col justify-center ">
      <div class="flex flex-row items-center justify-between mx-[30px]">
        <h1 class="text-[25px] text-center font-medium my-[30px]">
          Add a new Transaction
        </h1>
        <button
          class="p-[15px]"
          type="button"
          @click="handleExit"
        >
          <X />
        </button>
      </div>
      <div class="bg-[#f5f5f5] h-full">
        <form
          class="flex gap-2 flex-col justify-center items-center w-full"
          @submit.prevent
        > 
          <div class="w-full">
            <NewTransactionInput
              v-model="transactionData.date"
              label-name="Date"
              input-type="date"
              placeholder="Choose Date"
            />
            <NewTransactionInput
              v-model="transactionData.name"
              label-name="Transaction Name"
              input-type="text"
              placeholder="Transaction Name"
            />
            <NewTransactionInput
              v-model="transactionData.price"
              label-name="Price"
              input-type="Number"
              placeholder="Transaction Price"
            />
          </div>
          <SelectCategory 
            v-model="transactionData.categoryId"
          />
          <SelectIsNeed 
            v-model="transactionData.isNeed"
          />
          <SelectPaymentMethod 
            v-model="transactionData.paymentMethod"
          />

          <div class="flex gap-4">
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
              @click="handleAdd"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>