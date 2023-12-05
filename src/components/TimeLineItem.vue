<template>
  <RouterLink
    :to="{ name: 'post', params: { id: post.id } }"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <a>{{ post.title }}</a>
    <div>{{ post.created_at.toFormat("d MMM") }}</div>
  </RouterLink>
</template>

<script setup lang="ts">
import { TimeLinePost } from "../post"

defineProps<{
  post: TimeLinePost
}>()
</script>
