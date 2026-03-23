export interface UserSettings {
  user_id: string
  language: string | null
  theme: "light" | "dark" | null
  notifications_enabled: boolean | null
  created_at?: string
  updated_at?: string
}
