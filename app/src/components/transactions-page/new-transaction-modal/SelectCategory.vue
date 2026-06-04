<script setup>
import { ref ,onMounted } from 'vue'
import axios from '@/api'
defineProps ({
        inputType: [String, Number, Date],
        modelValue:[String, Number, Date]
    })

const emit = defineEmits(['update:modelValue'])

const categories = ref([])

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/categories')
  categories.value = data
})

</script>

<template>
  <div class="flex flex-col">
    <label>Category</label>
    <select
      :type="inputType"
      :value="modelValue"
      class="w-[300px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
      @input="emit('update:modelValue', Number($event.target.value))"
    >
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </select>
  </div>
</template>