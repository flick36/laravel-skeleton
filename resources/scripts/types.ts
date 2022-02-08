export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  current_team_id: number | null
  profile_photo_path: string | null
  created_at: string | null
  updated_at: string | null
  two_factor_confirmed_at: string | null
  profile_photo_url: string
}

export interface JetstreamUser extends User {
  current_team?: Team
  all_teams?: Team[] | null
  two_factor_enabled: boolean
}

export interface Team {
  id: number
  user_id: number
  name: string
  personal_team: boolean
  created_at: string | null
  updated_at: string | null
}

export type UserPermissions = Array<'create' | 'read' | 'update' | 'delete'>

export interface ApiToken {
  id: number
  name: string
  abilities: UserPermissions
  last_used_ago: string | null
  last_used_at: string | null
  created_at: string | null
  updated_at: string | null
  tokeneable_id: number
  tokeneable_type: string
}

export interface UserSession {
  agent: {
    browser: string
    is_desktop: boolean
    platform: string
  }
  ip_address: string
  is_current_device: boolean
  last_active: string
}
