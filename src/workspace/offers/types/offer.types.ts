// src/workspace/offers/types/offer.types.ts

export interface Offer {
  id: number
  user_id: string
  offer_number: number
  type: "images" | "video"
  created_at?: string
}

export interface OfferItem {
  id: number
  offer_id: number
  user_id: string
  type: "images" | "video"
  secure_url: string | null
  public_id: string | null
}
