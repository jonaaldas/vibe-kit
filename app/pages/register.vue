<script setup lang="ts">
import type { GoogleOAuthParams } from '~~/shared/types/google'

const config = useRuntimeConfig()

const providers = [
  {
    label: 'Continue with Google',
    icon: 'i-logos-google-icon',
    color: 'neutral' as const,
    variant: 'outline' as const,
    onClick: () => {
      const params: GoogleOAuthParams = {
        client_id: config.public.googleClientId,
        redirect_uri: `${config.public.siteUrl}/auth/callback`,
        response_type: 'code',
        scope: 'email profile',
        access_type: 'offline',
        prompt: 'consent'
      }
      const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(Object.entries(params))}`
      window.location.href = url
    }
  }
]
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="w-full max-w-sm">
      <UPageCard>
        <UAuthForm
          :providers="providers"
          title="Welcome"
          description="Sign in or create an account to continue."
        />
      </UPageCard>
    </div>
  </div>
</template>
