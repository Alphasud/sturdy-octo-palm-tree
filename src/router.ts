import { createRouter, createWebHistory } from "vue-router"
import { useUsersStore } from "./stores/users"

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/posts/new",
    name: "new-post",
    component: () => import("./views/NewPost.vue"),
    beforeEnter: (
      to: any,
      from: any,
      next: (arg0?: { name: string } | undefined) => void
    ) => {
      const userStore = useUsersStore()
      if (!userStore.currentUserId) {
        next({ name: "home" })
      }
      next()
    },
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("./views/ShowPost.vue"),
  },
  {
    path: "/post/:id/edit",
    name: "post-edit",
    component: () => import("./views/EditPost.vue"),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
