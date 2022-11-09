import { ref} from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { getCourses, getTeacher, saveTeacher } from '/@src/utils/api/course'
import { useApi } from '/@src/composable/useApi'

export const useCourses = defineStore('courses', () => {
    const api = useApi()
    const loading = ref(false)
    const loading_teacher = ref(false)
    const data = ref([])
    const teachers = ref([])

    async function fetchSources() {
        if (loading.value) return
        loading.value = true
        try {
            const response = await getCourses(api)
            data.value = response.data.data
            loading.value = false
        } finally {
            loading.value = false
        }
    }

    async function fetchTeacher() {
        if (loading_teacher.value) return
        loading_teacher.value = true
        try {
            const response = await getTeacher(api)
            teachers.value = response.data.data
            loading_teacher.value = false
        } finally {
            loading_teacher.value = false
        }
    }

    async function storeTeacher(params:any) {
        if (loading_teacher.value) return
        loading.value = true
        try {
            const response = await saveTeacher(api, params)
            data.value = response.data.data
            loading.value = false
        } finally {
            loading.value = false
        }
    }

    return {
        data,
        teachers,
        loading,
        loading_teacher,
        fetchTeacher,
        fetchSources,
        storeTeacher
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
    import.meta.hot.accept(acceptHMRUpdate(useCourses, import.meta.hot))
}