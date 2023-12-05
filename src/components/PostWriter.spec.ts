import { mount } from "@vue/test-utils"
import { describe, it, expect, beforeEach } from "vitest"
import { Pinia, createPinia, setActivePinia } from "pinia"
import { routes } from "../router"
import { Router, createMemoryHistory, createRouter } from "vue-router"
import PostWriter from "./PostWriter.vue"
import { useUsersStore } from "../stores/users"

describe("PostWriter", () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    const user = useUsersStore()
    user.currentUserId = "1"
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it("writes a post using markdown", () => {
    return new Promise<void>(async (resolve) => {
      const wrapper = mount(PostWriter, {
        global: {
          plugins: [pinia, router],
        },
        props: {
          post: {
            id: "1",
            title: "Hello",
            authorId: "1",
            created_at: "",
            markdown: "Hello **world**",
            html: "<p>Hello <strong>world</strong></p>",
          },
        },
      })

      wrapper.find<HTMLTextAreaElement>("#content").element.innerHTML =
        "## Title"
      await wrapper.find<HTMLTextAreaElement>("#content").trigger("input")

      setTimeout(async () => {
        await wrapper.find("#submit").trigger("click")
        console.log(wrapper.html())
        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "authorId": "1",
              "created_at": "",
              "html": "<p>Hello <strong>world</strong></p>
          ",
              "id": "1",
              "markdown": "Hello **world**",
              "title": "Hello",
            },
          ]
        `)
        resolve()
      }, 300)
    })
  })
})
