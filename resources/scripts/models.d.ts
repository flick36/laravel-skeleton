export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  current_team_id: number | null
  profile_photo_path: string | null
  created_at: string
  updated_at: string
}

export interface Team {
  id: number
  user_id: number
  name: string
  personal_team: boolean
  created_at: string
  updated_at: string
}

export type Permissions = Array<'create' | 'read' | 'update' | 'delete'>

export interface Token {
  id: number
  name: string
  abilities: Permissions
  last_used_ago: string
  last_used_at: string
  created_at: string
  updated_at: string
  tokeneable_id: number
  tokeneable_type: string
}
export interface DatabaseSessions {
  agent: {
    browser: string
    is_desktop: boolean
    platform: string
  }
  ip_address: string
  is_current_device: boolean
  last_active: string
}
