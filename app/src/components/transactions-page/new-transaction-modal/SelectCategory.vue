<script setup>
defineProps ({
        inputType: [String, Number, Date],
        modelValue:[String, Number, Date]
    })

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col">
    <label>Category</label>
    <select
      :type="inputType"
      :value="modelValue"
      class="w-[300px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
      @input="emit('update:modelValue', $event.target.value)"
    >
      <option value="Food">
        Food
      </option>
      <option value="Health">
        Health
      </option>
      <option value="Hygiene">
        Hygiene
      </option>
      <option value="Clothes">
        Clothes
      </option> <option value="Transport">
        Transport
      </option> <option value="Education">
        Education
      </option>
      <option value="Activities">
        Activities
      </option> <option value="Other">
        Other
      </option>
    </select>
  </div>
</template>