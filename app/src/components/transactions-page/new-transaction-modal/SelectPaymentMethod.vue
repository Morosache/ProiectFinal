<script setup>  
    defineProps ({
        inputType: [String, Number, Date],
        title: String,
        labelName: String,
        modelValue:[String, Number, Date]

    })

const emit = defineEmits(['update:modelValue'])
</script>


<template>
  <div class="flex flex-col">
    <label>Payment Method</label>
    <select
      :type="inputType"
      :value="modelValue"
      class="w-[300px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
      @input="emit('update:modelValue', $event.target.value)"
    >
      <option value="Cash">
        Cash
      </option>
      <option value="Card">
        Card
      </option>
    </select>
  </div>
</template>
