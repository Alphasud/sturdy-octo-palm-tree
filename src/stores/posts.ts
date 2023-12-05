import { defineStore } from "pinia"
import { Post, TimeLinePost } from "../post"
import { Period } from "../constants"
import { DateTime } from "luxon"

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export const usePostsStore = defineStore("posts", {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },
    async fetchPosts() {
      const posts = await fetch("/api/posts")
      const data = (await posts.json()) as Post[]
      await delay(1500)

      let ids: string[] = []
      let all: Map<string, Post> = new Map()
      for (const post of data) {
        ids.push(post.id)
        all.set(post.id, post)
      }

      this.ids = ids
      this.all = all
    },
    createPost(post: Post) {
      const body = JSON.stringify({
        ...post,
      })
      return fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
    },
    updatePost(post: Post) {
      const body = JSON.stringify({
        ...post,
      })
      return fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
    },
  },
  getters: {
    filteredPosts: (state): TimeLinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id)
          if (!post) throw new Error(`Post with id of ${id} not found}`)
          return {
            ...post,
            created_at: DateTime.fromISO(post.created_at),
          }
        })
        .filter((post) => {
          switch (state.selectedPeriod) {
            case "Today":
              return post.created_at >= DateTime.now().minus({ days: 1 })
            case "This Week":
              return post.created_at >= DateTime.now().minus({ weeks: 1 })
            case "This Month":
              return true
            default:
              return true
          }
        })
    },
  },
})
