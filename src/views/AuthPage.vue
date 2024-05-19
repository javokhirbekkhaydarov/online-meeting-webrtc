<template>
  <div>
    <button @click="signIn">Sign In</button>
    <button v-if="isAuthenticated" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const auth = getAuth();
const router = useRouter();
const isAuthenticated = ref(false);

const checkAuthStatus = () => {
  auth.onAuthStateChanged((user) => {
    isAuthenticated.value = !!user;
    if (user) {
      router.push("/");
    }
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
    router.push("/auth");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

onMounted(() => {
  checkAuthStatus();
});
</script>
