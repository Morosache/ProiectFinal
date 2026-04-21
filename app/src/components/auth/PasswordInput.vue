<script setup>
import { ref } from 'vue'

const password = defineModel()

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Password'
  },
  id: {
    type: String,
    default: 'password'
  },
  className: {
    type: String,
    default: 'w-[400px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none'
  }
})

const showPassword = ref(false)
</script>

<template>
  <div class="relative">
    <input
      :id="id"
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      :class="className"
    >
    <button
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"
      @click="showPassword = !showPassword"
    >
      {{ showPassword ? 'Hide' : 'Show' }}
    </button>
  </div>
</template>
