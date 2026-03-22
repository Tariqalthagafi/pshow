import { ref } from "vue"
import { getSession, getProfile, updateFullName } from "../services/settings.service"

export function useSettings() {
  const email = ref("")
  const fullName = ref("")
  const createdAt = ref("")
  const lastSignIn = ref("")
  const userId = ref("")

  const loadAccount = async () => {
    const session = await getSession()
    if (!session) return

    userId.value = session.id
    email.value = session.email || ""

    createdAt.value = session.created_at
      ? new Date(session.created_at).toLocaleDateString("ar-SA")
      : "—"

    lastSignIn.value = session.last_sign_in_at
      ? new Date(session.last_sign_in_at).toLocaleString("ar-SA")
      : "—"

    const profile = await getProfile(session.id)
    fullName.value = profile?.full_name || ""
  }

  const saveFullName = async () => {
    if (!userId.value) return
    await updateFullName(userId.value, fullName.value)
  }

  return {
    email,
    fullName,
    createdAt,
    lastSignIn,
    loadAccount,
    saveFullName
  }
}
