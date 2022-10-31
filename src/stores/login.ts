import { ref} from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Credential } from '/@src/utils/api/auth'
import { fetchLogin } from '/@src/utils/api/auth'
import { useApi } from '/@src/composable/useApi'
import { useUserSession } from '/@src/stores/userSession'
const userSession = useUserSession()

export const useLogin = defineStore('credentials', () => {
    const api = useApi()
    const credentials = ref<Credential>()
    const loading = ref(false)

    async function fetchLogins(username: string, password: string) {
        if (loading.value) return
        loading.value = true
        try {
            const response = await fetchLogin(api, username, password)
            if(response.data.meta.status == 1){
                credentials.value = response.data
                userSession.setToken(response.data.data.token)
                userSession.setUser(response.data.data.user)
                userSession.setSchool(response.data.data.id_school)
                userSession.setId(response.data.data.id_user)
                return {
                    status : true,
                    data : response.data.data
                }
            }
            loading.value = false
        } finally {
            loading.value = false
        }
    }

    return {
        credentials,
        loading,
        fetchLogins
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
    import.meta.hot.accept(acceptHMRUpdate(useLogin, import.meta.hot))
}
