<script setup>
import GenericButton from '@/components/buttons/GenericButton.vue';
import { ref } from 'vue'
import { useAuth } from '@/stores/authStore';

const auth = useAuth();

const message = ref("");

const logout = async () => {
  message.value = await auth.logout();
}
</script>



<template>
    <div class="w-full h-full ml-[400px]">

    <GenericButton
    @click="logout"
    title="Log Out" />
    </div>
</template>