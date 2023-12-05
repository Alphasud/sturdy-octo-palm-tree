<template>
  <UserForm @submit="handleSignIn" :error="error" />
</template>

<script setup lang="ts">
import UserForm from "./UserForm.vue"
import { NewUser } from "../user"
import { useUsersStore } from "../stores/users"
import { useModal } from "../composable/modal"
import { ref } from "vue"

const userStore = useUsersStore()
const modal = useModal()

const error = ref("")

async function handleSignIn(newUser: NewUser) {
  const isSignedIn = await userStore.signIn(newUser)
  if (!isSignedIn) {
    error.value = "Invalid username or password"
  } else {
    userStore.authenticate()
    modal.hideModal()
  }
}
</script>

<style scoped></style>
