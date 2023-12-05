<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput
      name="Username"
      v-model="username"
      :status="usernameStatus"
      type="text"
    />
    <FormInput
      name="Password"
      v-model="password"
      :status="passwordStatus"
      type="password"
    />
    <div v-if="error" class="is-danger help">{{ error }}</div>
    <br />
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { required, validate, length } from "../validation"
import FormInput from "./FormInput.vue"
import { computed, ref } from "vue"
import { NewUser } from "../user"

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  (event: "submit", payload: NewUser): void
}>()

const username = ref("")
const password = ref("")
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 3, max: 10 })])
})
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 3, max: 20 })])
})

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid
})

async function handleSubmit() {
  if (isInvalid.value) {
    return
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }
  try {
    emit("submit", newUser)
  } catch (error) {
    console.error(error)
  }
}
</script>
<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
