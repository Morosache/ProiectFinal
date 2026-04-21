<script setup>
defineProps({
    title: String,
    })
</script>
<template>
  <h1 class="text-[40px] font-semibold mb-[20px] text-center">
    {{ title }}
  </h1>
</template>