<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GoBackButton from '@/components/auth/GoBackButton.vue';
import GenericButton from '@/components/buttons/GenericButton.vue';
import EmailInput from '@/components/auth/EmailInput.vue';
import PageTitle from '@/components/auth/PageTitle.vue';

const email = ref('');
const errorMessage = ref('')

const router = useRouter();


const handleClick = () => {
    if (!email.value) {
        errorMessage.value = "Email cannot be empty"
    } else {
        errorMessage.value = ''
        router.push({ name: 'enter-code' })
    }
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <GoBackButton
      to="/login"
      title="Go back to Log In"
    />
    <div class="flex flex-col justify-center items-center mb-[150px] w-full h-full ">
      <div class="mb-[15px]">
        <PageTitle title="Forgot Your Password?" />
      </div>
      <form
        class="flex flex-col"
        @submit.prevent="handleClick"
      >
        <div>
          <div class="flex justify-between">
            <label
              for="email"
              class="block font-medium mb-2"
            >Enter your email</label>
            <div
              v-if="errorMessage"
              class="text-[12px] text-red-500 "
            >
              {{ errorMessage }}
            </div>
          </div>
          <EmailInput v-model="email" />
        </div>

        <p class="text-[12px] ml-[2px] ">
          We will send you a code to reset your password.
        </p>
        <GenericButton title="Send Code" />
      </form>
    </div>
  </div>
</template>
