export interface Screen {
  id: number
  number: number
  screen_id: string
  offer_id: number | null
  user_id: string
  activation_code?: string
  is_active?: boolean
  last_seen?: string | null
  device_id?: string | null
  app_version?: string | null
  os_version?: string | null
  resolution?: string | null
  ip_address?: string | null
  is_broadcasting?: boolean

}

export interface Offer {
  id: number
  offer_number: number
}
