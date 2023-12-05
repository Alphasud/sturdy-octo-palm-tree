import { defineStore } from "pinia"
import { NewUser, User } from "../user"

interface UserState {
  users: User[]
  currentUserId?: string
}

export const useUsersStore = defineStore("users", {
  state: (): UserState => ({
    users: [],
    currentUserId: undefined,
  }),
  actions: {
    async signIn(user: NewUser) {
      const body = JSON.stringify(user)
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
      if ([400, 404, 403].includes(response.status)) {
        return false
      }
      return true
    },
    async authenticate() {
      try {
        const response = await fetch("/api/current-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        this.currentUserId = data.id
      } catch (e) {
        this.currentUserId = undefined
      }
    },
    async logout() {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return this.authenticate()
    },
    async fetchUsers() {
      const users = await fetch("/api/users")
      const data = await users.json()
      this.users = data
    },
    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser)
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
      this.authenticate()
    },
    async updateUser(user: User) {
      const body = JSON.stringify(user)
      await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
      await this.fetchUsers()
    },
    async deleteUser(user: User) {
      await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      })
      await this.fetchUsers()
    },
  },
  getters: {},
})
