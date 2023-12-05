import { createRouter, createWebHistory } from "vue-router"
import { useUsersStore } from "./stores/users"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/posts/new",
      name: "new-post",
      component: () => import("./views/NewPost.vue"),
      beforeEnter: (to, from, next) => {
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
  ],
})
