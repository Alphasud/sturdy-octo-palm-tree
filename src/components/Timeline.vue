<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="postsStore.setSelectedPeriod(period)"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>
    <TimeLineItem
      v-for="post of postsStore.filteredPosts"
      :key="post.id"
      class="panel-block"
      :post="post"
    />
  </nav>
</template>

<script setup lang="ts">
import TimeLineItem from "./TimeLineItem.vue"
import { usePostsStore } from "../stores/posts"
import { periods } from "../constants"

const postsStore = usePostsStore()

await postsStore.fetchPosts()
</script>

<style scoped></style>
