export default defineAuthHandler(async (event) => {
  const user = event.context.user
  return user
})
