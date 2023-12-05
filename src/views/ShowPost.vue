<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <RouterLink
        v-if="canEdit"
        class="is-link button is-rounded"
        :to="{ name: 'post-edit', params: { id: post.id } }"
      >
        Edit post
      </RouterLink>
      <h1>{{ post.title }}</h1>
      <div v-html="post.html"></div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { usePostsStore } from "../stores/posts"
import { useUsersStore } from "../stores/users"
import { computed } from "vue"

const route = useRoute()
const postStore = usePostsStore()
const userStore = useUsersStore()

const id = route.params.id as string

const post = postStore.all.get(id)

if (!post) {
  throw new Error("Post not found : " + id)
}

const canEdit = computed(() => {
  if (!userStore.currentUserId) {
    return false
  }
  if (post.authorId !== userStore.currentUserId) {
    return false
  }
  return true
})
</script>
