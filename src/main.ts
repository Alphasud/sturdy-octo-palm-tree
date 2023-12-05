import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import { loadStyles } from "./utils"
import { router } from "./router"
import { useUsersStore } from "./stores/users"
import { usePostsStore } from "./stores/posts"

const app = createApp(App)
app.use(createPinia())

const usersStore = useUsersStore()
const postsStore = usePostsStore()

Promise.all([
  loadStyles("https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma-rtl.min.css"),
  usersStore.authenticate(),
  postsStore.fetchPosts(),
])
  .then(() => {
    app.use(router)
    app.mount("#app")
  })
  .catch((error) => {
    console.error("Error loading data", error)
  })
