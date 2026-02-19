import type { User } from '~~/server/database/schema'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const getUser = async () => {
    try {
      user.value = await $fetch('/api/auth/me')
    } catch {
      user.value = null
    }
  }

  return { user, getUser }
})
