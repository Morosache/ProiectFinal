<script setup>
    defineProps ({
        inputType: [String, Number, Date],
        title: String,
        labelName: String,
        modelValue:[String, Number, Date, Boolean]

    })

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col">
    <label>Need/Wish</label>
    <select
      :type="inputType"
      :value="modelValue"
      class="w-[300px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
      @input="emit('update:modelValue', $event.target.value)"
    >
      <option value="Need">
        Need
      </option>
      <option value="Wish">
        Wish
      </option>
    </select>
  </div>
</template>