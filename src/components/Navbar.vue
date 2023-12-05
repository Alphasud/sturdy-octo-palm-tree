<template>
  <nav class="navbar">
    <div>
      <RouterLink
        v-if="userStore.currentUserId"
        to="/posts/new"
        class="button is-light"
        >New Post</RouterLink
      >
    </div>
    <div>
      <div v-if="userStore.currentUserId" class="buttons">
        <button class="button" @click="logout">Log Out</button>
      </div>
      <div v-else class="buttons">
        <button class="button" @click="modal.showModal('signup')">
          Sign Up
        </button>
        <button class="button" @click="modal.showModal('signin')">
          Sign in
        </button>
      </div>
    </div>
  </nav>

  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>

<script lang="ts" setup>
import { useModal } from "../composable/modal"
import { useUsersStore } from "../stores/users"
import { useRouter } from "vue-router"

const userStore = useUsersStore()
const modal = useModal()
const router = useRouter()

async function logout() {
  await userStore.logout()
  router.push({ name: "Home" })
}
</script>
<style>
.navbar {
  display: flex;
  justify-content: space-between;
}
.button:last-child {
  margin-left: 10px;
}
</style>
