import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export type UserData = Record<string, any> | null

export const useUserSession = defineStore('userSession', () => {
  // token will be synced with local storage
  // @see https://vueuse.org/core/usestorage/
  const token = useStorage('token', '')
  const id_school = useStorage('id_school', '')
  const id_user = useStorage('id_user', '')
  const user = useStorage('user', '')
  const loading = ref(true)

  const isLoggedIn = computed(() => token.value !== undefined && token.value !== '')

  function setUser(newUser: string) {
    user.value = newUser
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setSchool(newSchool: string) {
    id_school.value = newSchool
  }

  function setId(newId: string) {
    id_user.value = newId
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading
  }

  async function logoutUser() {
    token.value = undefined
    user.value = undefined
    id_school.value = undefined
    id_user.value = undefined
  }

  return {
    user,
    token,
    isLoggedIn,
    loading,
    logoutUser,
    setUser,
    setToken,
    setLoading,
    setSchool,
    setId
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot))
}
