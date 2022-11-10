import { ref} from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { getTeacher } from '/@src/utils/api/teacher'
import { useApi } from '/@src/composable/useApi'

export const useTeachers = defineStore('teachers', () => {
    const api = useApi()
    const loading = ref(false)
    const data = ref([])

    async function fetchTeacher() {
        if (loading.value) return
        loading.value = true
        try {
            const response = await getTeacher(api)
            data.value = response.data.data
            loading.value = false
        } finally {
            loading.value = false
        }
    }

    return {
        data,
        loading,
        fetchTeacher,
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
    import.meta.hot.accept(acceptHMRUpdate(useTeachers, import.meta.hot))
}