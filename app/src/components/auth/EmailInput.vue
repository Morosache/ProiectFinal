<script setup>
const email = defineModel()
</script>

<template>
  <input
    id="email"
    v-model="email"
    placeholder="Email"
    type="email"
    value=""
    class="w-[400px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
  >
</template>