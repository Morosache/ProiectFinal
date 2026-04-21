<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import GenericButton from '@/components/buttons/GenericButton.vue';
import PasswordInput from '@/components/auth/PasswordInput.vue';
import PageTitle from '@/components/auth/PageTitle.vue';

const newPassword = ref('')
const confirmNewPassword = ref('')
const errorMessage = ref('')

const router = useRouter();

const handleReset = () => {
    if (!newPassword.value || !confirmNewPassword.value) {
    errorMessage.value = 'Password field cannot be empty'
    return
  }
  if (newPassword.value !== confirmNewPassword.value) {
    errorMessage.value = 'Passwords not matching'
    return
  }
  localStorage.setItem('password', newPassword.value)
  router.push({ name: 'reset-succesful' })
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <PageTitle title="Enter new password" />
    <form
      class="flex flex-col"
      @submit.prevent="handleReset"
    >
      <div>
        <div class="flex flex-row justify-between">
          <label
            for="newPassword"
            class="block font-medium mb-2"
          >New Password</label>
          <div
            v-if="errorMessage"
            class="text-[12px] text-red-500 "
          >
            {{ errorMessage }}
          </div>
        </div>
        <PasswordInput
          id="newPassword"
          v-model="newPassword"
          placeholder="New Password"
        />
      </div>

      <div>
        <label
          for="confirmNewPassword"
          class="block font-medium mb-2"
        >Confirm new password</label>
        <PasswordInput
          id="confirmNewPassword"
          v-model="confirmNewPassword"
          placeholder="Confirm New Password"
        />
      </div>

      <GenericButton
        title="Reset Password"
        class="px-[20px]"
      />
    </form>
  </div>
</template>