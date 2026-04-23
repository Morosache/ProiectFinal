<script setup>
import NewTransactionModal from '../transactions-page/NewTransactionModal.vue';
import EditTransactionModal from '../transactions-page/EditTransactionModal.vue';
import { ref, onMounted } from 'vue'
import { Pencil } from 'lucide-vue-next';
import { Trash } from 'lucide-vue-next';
import {useTransaction} from '@/stores/transactionsStore'


defineProps({
    transaction: {
      type: Object, 
      required: true
    },

    transactionId: {
      type: Number,
      required: true
    }
})


const transactionStore = useTransaction();
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);


</script>

<template>
  <Teleport to="body">
    <NewTransactionModal
      v-if="isAddModalOpen"
      @close="isAddModalOpen = false"
    />
  </Teleport>
  <div
    id="card"
    class="grid grid-cols-8 px-8 py-4 gap-8 flex items-center"
  >
    <p class="text-[13px] font-medium">
      {{ transaction.date }}
    </p>
    <p class="text-[13px] font-medium">
      {{ transaction.name }}
    </p>
    <p class="text-[13px] font-medium">
      {{ transaction.price }}
    </p>
    <p class="text-[13px] font-medium">
      {{ transaction.Category?.name }}
    </p>
    <p class="text-[13px] font-medium">
      {{ transaction.isNeed }}
    </p>
    <p class="text-[13px] font-medium">
      {{ transaction.paymentMethod }}
    </p>
    <button
      class="cursor pointer"
      @click="isEditModalOpen = true"
    >
      <Pencil class="w-[15px] h-[15px] justify-self-end" />
    </button>

    <Teleport to="body">
      <EditTransactionModal
        v-if="isEditModalOpen"
        :transaction="transaction" 
        :transaction-id="transactionId"
        @close="isEditModalOpen = false"
      />
    </Teleport>
  
    <button
      class="cursor pointer"
      @click="transactionStore.removeTransaction(transactionId)"
    >
      <Trash class="w-[17px] h-[17px] justify-self-end" />
    </button>
  </div>
</template>

<style scoped>
#card {
    border-top: 1px solid rgb(219, 216, 216);
}

p {
    font-weight: 600;
}


</style>