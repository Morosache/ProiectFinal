<script setup>
import { useRouter } from 'vue-router'
import GenericButton from '@/components/buttons/GenericButton.vue';
import PageTitle from '@/components/auth/PageTitle.vue';

const router = useRouter()
const returnToLog = () => {
    router.push({ name: 'login' })
}

</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <PageTitle title="Password has been reset" />
    <GenericButton
      title="Go back to Log In"
      @click="returnToLog"
    />
  </div>
</template>