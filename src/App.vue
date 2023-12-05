<template>
  <div class="modal" style="display: block; color: white" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal()"></button>
  </div>

  <div class="section" style="padding: 2rem 4rem">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Navbar from "./components/Navbar.vue"
import { useModal } from "./composable/modal"
import { computed } from "vue"

const modal = useModal()

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  }
})
</script>
<style>
@import "highlight.js/styles/atom-one-dark.css";

ul {
  list-style: revert !important;
  list-style-position: inside !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}

div[contenteditable] {
  white-space: pre;
}
</style>
