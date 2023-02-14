import type { Page } from '@inertiajs/core'
import type { JetstreamUser } from '@/types/general'

declare interface Window {
  // extend the window
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@inertiajs/core' {
  interface PageProps {
    jetstream: {
      canCreateTeams: boolean
      canManageTwoFactorAuthentication: boolean
      canUpdatePassword: boolean
      canUpdateProfileInformation: boolean
      hasEmailVerification: boolean
      flash: {
        bannerStyle?: 'success' | 'danger'
        banner?: string
        token?: string
      }
      hasAccountDeletionFeatures: boolean
      hasApiFeatures: boolean
      hasTeamFeatures: boolean
      hasTermsAndPrivacyPolicyFeature: boolean
      managesProfilePhotos: boolean
    }
    auth: { user: JetstreamUser | null }
  }
}
