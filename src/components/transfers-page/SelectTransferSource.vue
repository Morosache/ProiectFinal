<script setup>
    const props= defineProps({
        title: {
            type: String,
            required: true
        },
         inputType: [String, Number, Date],
         modelValue:[String, Number, Date]

    })

const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <div class="flex flex-col">
    <label>{{ props.title }}</label>
    <select
      :type="inputType"
      :value="modelValue"
      class="w-[150px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none text-gray-700"
      @input="emit('update:modelValue', $event.target.value)"
    >
      <option value="Cash">
        Cash
      </option>
      <option value="Card">
        Card
      </option>
      <option value="Economies">
        Economies
      </option>
    </select>
  </div>
</template>