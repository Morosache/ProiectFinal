<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GenericButton from '@/components/buttons/GenericButton.vue'
import PasswordInput from '@/components/auth/PasswordInput.vue'
import EmailInput from '@/components/auth/EmailInput.vue'
import PageTitle from '@/components/auth/PageTitle.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter();

const hardEmail = 'elisei.morosan@emanuel.ro'

if(!localStorage.getItem('password')) {
    localStorage.setItem('password', 'salut')
}

const getPassword = () => localStorage.getItem('password')




const handleLogIn = () => {
    if (email.value === hardEmail && password.value === getPassword()) {
        router.push({ name: 'home-page' })
    } else if (!email.value || !password.value) {
        errorMessage.value = 'Email and password cannot be empty'
    }
    else {
        errorMessage.value = 'Incorrect email or password'
    }
}
</script>

<template>
  <div class="flex flex-col items-center mt-[30px] h-full w-full ">
    <img
      src="/public/logo.png"
      alt="logo"
      class="w-[250px] h-[175px]"
    >
    <PageTitle title="Log In" />
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

      <div class="flex justify-between mt-[5px]">
        <router-link
          to="register"
          class="text-[12px] font-medium"
        >
          New user? Sign Up.
        </router-link>
        <router-link
          to="forgot-your-password"
          class="text-[12px] font-medium"
        >
          Forgot your Password? Reset
          it.
        </router-link>
      </div>

      <GenericButton
        title="Log In"
        class="px-[20px]"
      />
    </form>
  </div>
</template>

<style scoped></style>