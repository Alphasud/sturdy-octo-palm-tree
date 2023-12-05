<template>
  Edit post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue"
import { useRoute } from "vue-router"
import { usePostsStore } from "../stores/posts"
import { useRouter } from "vue-router"
import { Post } from "../post"

const route = useRoute()
const postStore = usePostsStore()
const router = useRouter()

const id = route.params.id as string

const post = postStore.all.get(id)

if (!post) {
  throw new Error("Post not found : " + id)
}

async function handleSubmit(post: Post) {
  await postStore.updatePost(post)
  router.push({ name: "home" })
}
</script>
