import { mount } from "@vue/test-utils"
import { describe, it, expect, beforeEach } from "vitest"
import { Pinia, createPinia, setActivePinia } from "pinia"
import { routes } from "../router"
import { Router, createMemoryHistory, createRouter } from "vue-router"
import UserForm from "./UserForm.vue"

describe("UserForm", () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it("runs through the workflow", async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [pinia, router],
      },
    })

    const btn = wrapper.find("button")
    expect(btn.element.disabled).toBe(true)

    expect(wrapper.find("#Username-input").find(".is-danger").text()).toBe(
      "Required"
    )
    expect(wrapper.find("#Password-input").find(".is-danger").text()).toBe(
      "Required"
    )
    await wrapper.find("#Username").setValue("aa")
    await wrapper.find("#Password").setValue("aa")

    expect(wrapper.find("#Username-input").find(".is-danger").text()).toBe(
      "Must be between 3 and 10 characters"
    )
    expect(wrapper.find("#Password-input").find(".is-danger").text()).toBe(
      "Must be between 3 and 20 characters"
    )

    await wrapper.find("#Username").setValue("coco")
    await wrapper.find("#Password").setValue("coco")

    expect(wrapper.find("#Username-input").find(".is-danger").exists()).toBe(
      false
    )
    expect(wrapper.find("#Password-input").find(".is-danger").exists()).toBe(
      false
    )
    expect(wrapper.find("button").element.disabled).toBe(false)

    wrapper.find("form").trigger("submit.prevent")

    console.log(wrapper.emitted().submit)

    expect(wrapper.emitted().submit[0]).toEqual([
      {
        username: "coco",
        password: "coco",
      },
    ])
  })
})
