<script setup>
defineProps({
    title:String,
    to:String
})

</script>

<template>
  <div v-if="$route.path === '/home-page' || '/trasnactions-page'">
    <router-link
      id="router-btn"
      :to=" to "
      class="px-[20px] py-[3px] text-[16px] bg-[#56D788] rounded-[10px] font-semibold hover:bg-[#4cc179] cursor-pointer"
    >
      {{ title }}
    </router-link>
  </div>
</template>

<style scoped> 
  #router-btn:hover {
    transition: all 0.3s ease
  }
</style>