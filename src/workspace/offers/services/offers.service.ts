// src/workspace/offers/services/offers.service.ts

import { supabase } from "@/supabase"
import type { Offer } from "../types/offer.types"

/* ============================
   المستخدم والعضوية
============================ */

export async function getUserId() {
  const { data } = await supabase.auth.getUser()
  return data.user?.id || null
}

export async function getMembership(userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single()

  return data?.plan || "free"
}

/* ============================
   العروض
============================ */

export async function getOffers(userId: string) {
  return supabase
    .from("offers")
    .select("*")
    .eq("user_id", userId)
    .order("offer_number", { ascending: true })
}

export async function getOfferById(offerId: string, userId: string) {
  return supabase
    .from("offers")
    .select("*")
    .eq("id", offerId)
    .eq("user_id", userId)
    .single()
}

export async function createImageOffer(userId: string, offerNumber: number) {
  return supabase
    .from("offers")
    .insert({
      offer_number: offerNumber,
      user_id: userId,
      type: "images"
    })
    .select()
    .single()
}

export async function createVideoOffer(userId: string, offerNumber: number) {
  const { data: offer, error } = await supabase
    .from("offers")
    .insert({
      offer_number: offerNumber,
      user_id: userId,
      type: "video"
    })
    .select()
    .single()

  if (error || !offer) return { offer: null, error }

  await supabase.from("offer_items").insert({
    offer_id: offer.id,
    user_id: userId,
    type: "video",
    secure_url: "",
    public_id: null
  })

  return { offer, error: null }
}

export async function deleteOffer(offerId: number, userId: string) {
  return supabase
    .from("offers")
    .delete()
    .eq("id", offerId)
    .eq("user_id", userId)
}

/* ============================
   عناصر العرض (الملفات)
============================ */

export async function getOfferItems(offerId: string, userId: string) {
  return supabase
    .from("offer_items")
    .select("*")
    .eq("offer_id", offerId)
    .eq("user_id", userId)
}

export async function deleteOfferItems(offerId: number, userId: string) {
  return supabase
    .from("offer_items")
    .delete()
    .eq("offer_id", offerId)
    .eq("user_id", userId)
}

export async function deleteOfferItem(publicId: string, offerId: string, userId: string) {
  return supabase
    .from("offer_items")
    .delete()
    .eq("public_id", publicId)
    .eq("offer_id", offerId)
    .eq("user_id", userId)
}

/* ============================
   التأثير والمدة
============================ */

export async function updateOfferEffect(offerId: string, userId: string, effect: string) {
  return supabase
    .from("offers")
    .update({ effect })
    .eq("id", offerId)
    .eq("user_id", userId)
}

export async function updateOfferDuration(offerId: string, userId: string, duration: number) {
  return supabase
    .from("offers")
    .update({ duration })
    .eq("id", offerId)
    .eq("user_id", userId)
}

/* ============================
   بيانات المصمم
============================ */

export async function getOfferDetails(offerId: string, userId: string) {
  return supabase
    .from("offers")
    .select("designer_email, designer_id, effect, duration")
    .eq("id", offerId)
    .eq("user_id", userId)
    .single()
}

export async function updateDesigner(
  offerId: string,
  userId: string,
  email: string | null,
  designerId: string | null
) {
  return supabase
    .from("offers")
    .update({
      designer_email: email,
      designer_id: designerId
    })
    .eq("id", offerId)
    .eq("user_id", userId)
}

/* ============================
   دعوة المصمم
============================ */

export async function sendDesignerInvite(
  email: string,
  offerId: string,
  userId: string,
  token: string
) {
  const res = await fetch(
    "https://eypmuxcspmyizigzapsy.supabase.co/functions/v1/send-registration-invite",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        email,
        offer_id: offerId,
        user_id: userId
      })
    }
  )

  return res.json()
}

/* ============================
   الشاشات
============================ */

export async function checkOfferScreens(offerId: number) {
  return supabase
    .from("screens")
    .select("id, number")
    .eq("offer_id", offerId)
}
