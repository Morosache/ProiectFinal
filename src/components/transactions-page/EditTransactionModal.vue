<script setup>
    import NewTransactionInput from './new-transaction-modal/NewTransactionInput.vue';
    import SelectCategory from './new-transaction-modal/SelectCategory.vue';
    import SelectIsNeed from './new-transaction-modal/SelectIsNeed.vue';
    import SelectPaymentMethod from './new-transaction-modal/SelectPaymentMethod.vue';

    import { X } from 'lucide-vue-next'
    import { useTransaction } from '@/stores/transactionsStore';
    import { ref, watch } from 'vue'

    const transactionStore = useTransaction();
    const emit = defineEmits(['close']);

    const handleExit = () => {
      emit('close');
    }

    const props = defineProps({
    transaction: {
      type: Object, 
      required: true
    },

    transactionId: {
      type: Number,
      required: true
    }
})

    const updatedTransactionData = ref({ ...props.transaction})

    watch(() => props.transaction, (newVal) => {
      updatedTransactionData.value = { ...newVal }
    }, {deep: true})

    const editTransaction = () => {
        transactionStore.editTransaction(props.transactionId, updatedTransactionData.value)
        console.log(props.transactionId)
        emit('close')
    }



   
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex justify-center items-center backdrop-blur-sm"
  >
    <div class="bg-gray-100 w-[600px] h-[600px] rounded-lg flex flex-col justify-center ">
      <div class="flex flex-row items-center justify-between mx-[30px]">
        <h1 class="text-[25px] text-center font-medium my-[30px]">
          Edit Transaction
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
              v-model="updatedTransactionData.date"
              label-name="Date"
              input-type="date"
              placeholder="Choose Date"
            />
            <NewTransactionInput
              v-model="updatedTransactionData.name"
              label-name="Transaction Name"
              input-type="text"
              placeholder="Transaction Name"
            />
            <NewTransactionInput
              v-model="updatedTransactionData.price"
              label-name="Price"
              input-type="Number"
              placeholder="Transaction Price"
            />
          </div>
          <SelectCategory 
            v-model="updatedTransactionData.category"
          />
          <SelectIsNeed 
            v-model="updatedTransactionData.isNeed"
          />
          <SelectPaymentMethod 
            v-model="updatedTransactionData.paymentMethod"
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
              @click="editTransaction"
            >
              Edit Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>