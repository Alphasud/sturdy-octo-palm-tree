<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input v-model="title" type="text" class="input" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div ref="contentEditable" contenteditable @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TimeLinePost, Post } from "../post"
import { onMounted, ref, watch } from "vue"
import { marked } from "marked"
import highlightjs from "highlight.js"
import debounce from "lodash/debounce"
import { usePostsStore } from "../stores/posts"
import { useRouter } from "vue-router"
import { useUsersStore } from "../stores/users"

const props = defineProps<{
  post: TimeLinePost | Post
}>()

const emit = defineEmits<{
  (event: "submit", post: Post): void
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()
const html = ref("")

const postsStore = usePostsStore()
const userStore = useUsersStore()
const router = useRouter()

function parseHtml(markdown: string = "") {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value
      },
    },
    (err, parseResult) => {
      if (err) {
        throw err
      }
      html.value = parseResult
    }
  )
}

watch(content, debounce(parseHtml, 250), { immediate: true })

onMounted(() => {
  if (!contentEditable.value) {
    throw new Error("contentEditable DOM node was not found")
  }
  if (contentEditable.value) {
    contentEditable.value.innerText = content.value ?? ""
  }
})

const handleInput = () => {
  if (!contentEditable.value) {
    throw new Error("contentEditable DOM node was not found")
  }
  content.value = contentEditable.value?.innerText
}

const handleClick = async () => {
  if (!userStore.currentUserId) {
    throw new Error("User was not found")
  }
  const newPost: Post = {
    ...props.post,
    created_at:
      typeof props.post.created_at === "string"
        ? props.post.created_at
        : props.post.created_at.toISO() ?? "",
    authorId: userStore.currentUserId,
    title: title.value,
    markdown: content.value,
    html: html.value,
  }
  emit("submit", newPost)
}
</script>

<style scoped></style>
