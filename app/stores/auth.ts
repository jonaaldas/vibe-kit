import type { GoogleUserInfo } from '~~/shared/types/google';

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<(GoogleUserInfo & { id: string }) | null> = ref(null);
  const getUser = async () => {
    try {
      user.value = await $fetch('/api/auth/me');
    } catch (err) {
      user.value = null;
    }
  };

  return { user, getUser };
});
