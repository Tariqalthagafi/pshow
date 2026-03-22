import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { getSession, getProfile, signOut } from "../services/sidebar.service"

export function useSidebar() {
  const collapsed = ref(true)
  const currentPath = ref("")
  const firstName = ref("")
  const router = useRouter()
  const route = useRoute()

  const toggle = () => {
    collapsed.value = !collapsed.value
  }

  const loadSidebar = async () => {
    currentPath.value = route.path

    const session = await getSession()
    if (!session) return

    const profile = await getProfile(session.id)
    if (profile?.full_name) {
      firstName.value = profile.full_name.split(" ")[0]
    }
  }

  const logout = async () => {
    await signOut()
    router.push("/")
  }

  return {
    collapsed,
    currentPath,
    firstName,
    toggle,
    logout,
    loadSidebar
  }
}
