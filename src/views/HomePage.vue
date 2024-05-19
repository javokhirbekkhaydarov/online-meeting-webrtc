<template>
  <div>
    <h1>Welcome to the Meeting App</h1>
    <input v-model="roomId" placeholder="Enter Room ID" />
    <button @click="joinRoom">Join Room</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const roomId = ref("");

const joinRoom = () => {
  if (roomId.value) {
    router.push(`/meet/${roomId.value}`);
  }
};
</script>

<style scoped>
input {
  margin-right: 10px;
}
</style>
