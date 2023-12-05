import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import FormInput from "./FormInput.vue"
import { computed, defineComponent, ref } from "vue"

describe("FormInput", () => {
  it("tests validation", async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
                <FormInput
                    v-model="formValue"
                    :status="status"
                    name="foo"
                    type="input"
                />
            `,
      setup() {
        const formValue = ref("bar")
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            }
          } else {
            return {
              valid: false,
              message: "Must be longer than 5 characters",
            }
          }
        })
        return { formValue, status }
      },
    })
    const wrapper = mount(Parent)

    expect(wrapper.find(".is-danger").text()).toBe(
      "Must be longer than 5 characters"
    )
    await wrapper.find("input").setValue("foobar")

    expect(wrapper.find(".is-danger").exists()).toBe(false)
  })
  // Test that it renders an error label if status is invalid
  it("renders errors", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "bar",
        status: {
          valid: false,
          message: "This is an error",
        },
        type: "input",
      },
    })
    expect(wrapper.find(".is-danger").exists()).toBe(true)
  })

  // Test that it doesn't render an error label if status is valid
  it("renders no error", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "bar",
        status: {
          valid: true,
        },
        type: "input",
      },
    })
    expect(wrapper.find(".is-danger").exists()).toBe(false)
  })
})
