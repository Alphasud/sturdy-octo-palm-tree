<template>
  New Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { DateTime } from "luxon"
import PostWriter from "../components/PostWriter.vue"
import { Post, TimeLinePost } from "../post"
import { useUsersStore } from "../stores/users"
import { usePostsStore } from "../stores/posts"
import { useRouter } from "vue-router"

const userStore = useUsersStore()
const postStore = usePostsStore()
const router = useRouter()

const post: TimeLinePost = {
  id: "-1",
  title: "Title",
  authorId: userStore.currentUserId ?? "-1",
  created_at: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
}

async function handleSubmit(post: Post) {
  await postStore.createPost(post)
  router.push({ name: "home" })
}
</script>
