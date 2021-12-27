import '@inertiajs/inertia'
import { Team, User } from './models'

declare module '@inertiajs/inertia' {
  export interface PageProps {
    jetstream: {
      canCreateTeams: boolean
      canManageTwoFactorAuthentication: boolean
      canUpdatePassword: boolean
      canUpdateProfileInformation: boolean
      flash: { [key: string]: unknown }
      hasAccountDeletionFeatures: boolean
      hasApiFeatures: boolean
      hasTeamFeatures: boolean
      hasTermsAndPrivacyPolicyFeature: boolean
      managesProfilePhotos: boolean
    }
    user:
      | (User & {
          all_teams: Team[]
          current_team: Team
          two_factor_enabled: boolean
          profile_photo_url: string
        })
      | null
  }
}
