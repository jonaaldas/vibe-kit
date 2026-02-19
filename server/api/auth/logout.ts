export default defineEventHandler((event) => {
  deleteCookie(event, 'session')
  return { ok: true }
})
