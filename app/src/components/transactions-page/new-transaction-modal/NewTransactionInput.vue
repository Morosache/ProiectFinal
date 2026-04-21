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
  <div class="w-full flex justify-center items-center">
    <div class="flex flex-col">
      <label class="ml-[5px]">{{ labelName }}</label>
      <input
        :type="inputType"
        class="w-[300px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
        :placeholder="title"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      >
    </div>
  </div>
</template>