export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore()
  const protectedRoutes = ['/protected', '/settings']
  if (protectedRoutes.includes(to.path) && !authStore.user) {
    return navigateTo('/register')
  }
})
