import { mount } from "@vue/test-utils"
import { describe, it, expect, beforeEach, vi } from "vitest"
import Navbar from "./Navbar.vue"
import { computed, defineComponent, ref } from "vue"
import { Pinia, createPinia, setActivePinia } from "pinia"
import { routes } from "../router"
import { Router, createMemoryHistory, createRouter } from "vue-router"
import { useUsersStore } from "../stores/users"

vi.stubGlobal(
  "fetch",
  vi.fn(() => {
    // ...
  })
)

describe("Navbar", () => {
  let pinia: Pinia
  let router: Router
  beforeEach(() => {
    const el = document.createElement("div")
    el.id = "modal"
    document.body.appendChild(el)

    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })
  it("Renders sign-in and sign-up buttons when not authenticated", () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.find("#signup").exists()).toBe(true)
    expect(wrapper.find("#signin").exists()).toBe(true)
  })
  it("Renders new-post and log-out buttons when authenticated", async () => {
    const users = useUsersStore()
    users.currentUserId = "1"

    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.find("a").text()).toBe("New Post")
    expect(wrapper.find("button").text()).toBe("Log Out")

    await wrapper.find("#logout").trigger("click")

    expect(wrapper.find("#signup").exists()).toBe(true)
    expect(wrapper.find("#signin").exists()).toBe(true)

    await wrapper.find("#signup").trigger("click")

    expect(document.body.querySelector("#modal")).toBeTruthy()
  })
})
