<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    customClass: {
        type: String,
        default: "px-[100px] py-[10px] my-[30px] bg-[#56d788] rounded-[7px] font-medium hover:bg-[#4cc179]"
    }

})
</script>

<template>
  <button
    type="submit"
    :class="customClass"
  >
    {{ title }}
  </button>
</template>