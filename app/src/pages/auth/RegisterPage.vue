<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import GenericButton from '@/components/buttons/GenericButton.vue';
import PasswordInput from '@/components/auth/PasswordInput.vue';
import EmailInput from '@/components/auth/EmailInput.vue';
import PageTitle from '@/components/auth/PageTitle.vue';


const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')


const router = useRouter();


const handleLogIn = () => {
    if (!email.value || !password.value || !confirmPassword.value) {
        errorMessage.value = 'Email and password cannot be empty'

    } else if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords not matching'
    } else {
        router.push({ name: 'login' })

    }
}
</script>

<template>
  <div class="flex flex-col items-center mt-[150px] h-full w-full ">
    <PageTitle title="Sign Up" />
    <form
      class="flex flex-col"
      @submit.prevent="handleLogIn"
    >
      <div>
        <div class="flex justify-between">
          <label
            for="email"
            class="block font-medium mb-2"
          >Email</label>
          <div
            v-if="errorMessage"
            class="text-[12px] text-red-500 "
          >
            {{ errorMessage }}
          </div>
        </div>
        <EmailInput v-model="email" />
      </div>

      <div>
        <label
          for="password"
          class="block font-medium mb-2"
        >Password</label>
        <PasswordInput v-model="password" />
      </div>

      <div>
        <label
          for="confirmPassword"
          class="block font-medium mb-2"
        >Confirm your password</label>
        <PasswordInput
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirm Password"
        />
      </div>

      <div class="flex justify-end mt-[5px]">
        <router-link
          to="login"
          class="text-[12px] font-medium"
        >
          Already have an account? Log in
        </router-link>
      </div>

      <GenericButton title="Sign Up" />
    </form>
  </div>
</template>

<style scoped></style>