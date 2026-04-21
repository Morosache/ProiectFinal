<script setup>
defineProps({
    to: {
        type: String,
    }
})
import { ChevronLeft } from 'lucide-vue-next';
</script>

<template>
  <router-link :to="to">
    <div class="flex px-[20px] py-[10px] text-[#56d788] text-[20px] w-[250px] ml-[50px] mt-[30px] rounded-[10px]">
      <ChevronLeft size="30px" />
      <button
        class="font-medium"
        type="button"
      >
        Go back to Log In
      </button>
    </div>
  </router-link>
</template>

<style scoped></style>