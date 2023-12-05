<template>
  <UserForm @submit="handleSignUp" />
</template>

<script setup lang="ts">
import UserForm from "./UserForm.vue"
import { NewUser } from "../user"
import { useUsersStore } from "../stores/users"
import { useModal } from "../composable/modal"

const userStore = useUsersStore()
const modal = useModal()

async function handleSignUp(newUser: NewUser) {
  console.log("handleSignUp")
  await userStore.createUser(newUser)
  modal.hideModal()
}
</script>

<style scoped></style>
