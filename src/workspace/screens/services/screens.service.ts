import { supabase } from "@/supabase"
import type { Screen, Offer } from "../types/screen.types"

/* جلب المستخدم */
export async function getUser() {
  const { data } = await supabase.auth.getSession()
  return data.session?.user || null
}

/* جلب العضوية */
export async function getMembership(userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single()

  return data?.plan || "free"
}

/* جلب العروض */
export async function getOffers(userId: string): Promise<Offer[]> {
  const { data } = await supabase
    .from("offers")
    .select("id, offer_number")
    .eq("user_id", userId)
    .order("offer_number", { ascending: true })

  return (data || []).map(o => ({
    ...o,
    id: Number(o.id)
  }))
}

/* جلب الشاشات */
export async function getScreens(userId: string): Promise<Screen[]> {
  const { data } = await supabase
    .from("screens")
    .select("*")
    .eq("user_id", userId)
    .order("number", { ascending: true })

  return (data || []).map(s => ({
    ...s,
    id: Number(s.id),
    user_id: s.user_id ?? ""
  }))
}

/* جلب شاشة واحدة */
export async function getScreenById(screenId: number): Promise<Screen> {
  const { data, error } = await supabase
    .from("screens")
    .select("*")
    .eq("id", screenId)
    .single()

  if (error) throw error

  return {
    ...data,
    id: Number(data.id),
    user_id: data.user_id ?? ""
  }
}

/* إنشاء شاشة جديدة */
export async function createScreen(payload: Partial<Screen>): Promise<Screen> {
  const { data, error } = await supabase
    .from("screens")
    .insert(payload)
    .select()
    .single()

  if (error) throw error

  return {
    ...data,
    id: Number(data.id),
    user_id: data.user_id ?? ""
  }
}

/* تحديث شاشة */
export async function updateScreen(screenId: number, payload: Partial<Screen>): Promise<Screen> {
  const { data, error } = await supabase
    .from("screens")
    .update(payload)
    .eq("id", screenId)
    .select()
    .single()

  if (error) throw error

  return {
    ...data,
    id: Number(data.id),
    user_id: data.user_id ?? ""
  }
}

/* جلب screen_activation */
export async function getActivationData() {
  const { data } = await supabase
    .from("screen_activation")
    .select("*")

  return data || []
}

/* تحديث حالة الشاشة */
export async function updateActivation(screenId: string, state: boolean) {
  return supabase
    .from("screen_activation")
    .update({ is_active: state })
    .eq("screen_id", screenId)
}

/* ربط الشاشة بالعرض */
export async function assignOfferToScreen(screenId: number, offerId: number) {
  return supabase
    .from("screens")
    .update({ offer_id: offerId })
    .eq("id", screenId)
}

/* تحديث دقة العرض */
export async function updateOfferResolution(offerId: number, resolution: string | null) {
  return supabase
    .from("offers")
    .update({ resolution })
    .eq("id", offerId)
}

/* إنشاء شاشة واحدة فقط حسب الباقة */
export async function createSingleScreen(userId: string) {
  // 1) جلب الباقة
  const plan = await getMembership(userId)

  // 2) تحديد الحد حسب الباقة
  const maxScreens = plan === "free" ? 1 : 5

  // 3) جلب عدد الشاشات الحالية
  const { data: existingScreens } = await supabase
    .from("screens")
    .select("id")
    .eq("user_id", userId)

  const currentCount = existingScreens?.length || 0

  // 4) منع تجاوز الحد
  if (currentCount >= maxScreens) {
    return {
      error: `لا يمكنك إضافة أكثر من ${maxScreens} شاشات حسب الباقة الحالية`
    }
  }

  // 5) إنشاء شاشة جديدة
  const payload = {
    user_id: userId,
    number: currentCount + 1,
    is_active: false,
    offer_id: null,
    screen_id: Math.floor(Math.random() * 9000 + 1000),
    activation_code: Math.floor(Math.random() * 9000 + 1000)
  }

  const { data, error } = await supabase
    .from("screens")
    .insert(payload)
    .select()
    .single()

  if (error) return { error }

  return {
    data: {
      ...data,
      id: Number(data.id),
      user_id: data.user_id ?? ""
    }
  }
}
