<template>
  <div class="field">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
      <input
        class="input"
        :type="type || 'text'"
        :id="name"
        :value="modelValue"
        @input="handleInput"
      />
    </div>
    <p class="is-danger help" v-if="!status.valid">
      {{ status.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Status } from "../validation"

defineProps<{
  name: string
  modelValue: string
  status: Status
  type?: string
}>()
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit("update:modelValue", value)
}
</script>
