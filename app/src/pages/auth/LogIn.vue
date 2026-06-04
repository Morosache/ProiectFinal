<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/authStore'
import GenericButton from '@/components/buttons/GenericButton.vue'
import PasswordInput from '@/components/auth/PasswordInput.vue'
import PageTitle from '@/components/auth/PageTitle.vue'

const auth = useAuth()

const message = ref("")
const authentication = async () => {
  message.value = await auth.checkCredentials(username.value, password.value)
}

const username = ref("")
const password = ref("")
</script>

<template>
  <div class="flex flex-col items-center mt-[30px] h-full w-full">
    <img
      src="/public/logo.png"
      alt="logo"
      class="w-[250px] h-[175px]"
    >
    <PageTitle title="Log In" />
    <form
      class="flex flex-col"
      @submit.prevent="authentication"
    >
      <div>
        <div class="flex justify-between">
          <label
            for="username"
            class="block font-medium mb-2"
          >Username</label>
          <div
            v-if="message"
            class="text-[12px] text-red-500"
          >
            {{ message }}
          </div>
        </div>
        <input
          id="username"
          v-model="username"
          placeholder="Username"
          type="text"
          class="w-[400px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
        >
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
          Forgot your Password? Reset it.
        </router-link>
      </div>

      <GenericButton
        title="Log In"
        class="px-[20px]"
        @click="authentication"
      />
    </form>
  </div>
</template>
