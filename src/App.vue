<template>
  <div id="app">
    <header>
      <button v-if="!isAuthenticated" @click="signIn">Sign In</button>
      <button v-if="isAuthenticated" @click="signOut">Sign Out</button>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const auth = getAuth();
const isAuthenticated = ref(false);

const checkAuthStatus = () => {
  auth.onAuthStateChanged((user) => {
    isAuthenticated.value = !!user;
  });
};

const signIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    isAuthenticated.value = false;
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

onMounted(() => {
  checkAuthStatus();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header {
  margin-bottom: 20px;
}
</style>
