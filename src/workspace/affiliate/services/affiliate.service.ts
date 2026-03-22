// لاحقًا تقدر تربطه مع Supabase
import type { AffiliateClient } from "../types/affiliate.types"

export async function getAffiliateCode(userId?: string): Promise<string> {
  // TODO: اجلب الكود من قاعدة البيانات
  return "AFF123"
}

export async function getAffiliateClients(userId?: string): Promise<AffiliateClient[]> {
  // TODO: اجلب العملاء من قاعدة البيانات
  return [
    { id: 101, email: "user1@mail.com", status: "free", created_at: "2024-01-10" },
    { id: 102, email: "user2@mail.com", status: "paid", created_at: "2024-01-12" },
    { id: 103, email: "user3@mail.com", status: "cancelled", created_at: "2024-01-15" }
  ]
}
