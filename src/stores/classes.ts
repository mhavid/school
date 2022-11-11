import { ref} from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { getClass, getDataClass, saveClass, getWali, updateWali } from '/@src/utils/api/class'
import { useApi } from '/@src/composable/useApi'

export const useClasses = defineStore('classes', () => {
    const api = useApi()
    const loading = ref(false)
    const loading2 = ref(false)
    const students = ref([])
    const teachers = ref([])
    const wali = ref([])
    const classes = ref([])
    const loading_add = ref(false)
    const loading_update = ref(false)

    async function fetchDataClass(data: object) {
        if (loading.value) return
        loading.value = true
        try {
            const response = await getDataClass(api, data)
            students.value = response.data.data.students
            teachers.value = response.data.data.wali_kelas
            loading.value = false
        } finally {
            loading.value = false
        }
    }

    async function fetchClass() {
        if (loading2.value) return
        loading2.value = true
        try {
            const response = await getClass(api)
            classes.value = response.data.data.class
            loading2.value = false
        } finally {
            loading2.value = false
        }
    }

    async function addClass(params:object) {
        if (loading_add.value) return
        loading_add.value = true
        try {
            const response = await saveClass(api, params)
            classes.value = response.data.data.class
            loading_add.value = false
            return response.data
        } finally {
            loading_add.value = false
        }
    }

    async function fetchWali() {
        try {
            const response = await getWali(api)
            wali.value = response.data.data
        } catch(err){
            console.error(err)
        }
    }

    async function editWali(params:object) {
        try {
            loading_update.value = true
            const response = await updateWali(api, params)
            wali.value = response.data.data.data
            teachers.value = response.data.data.wali_kelas
            loading_update.value = false
            return response.data
        } catch(err){
            loading_update.value = false
            console.error(err)
        }
    }



    return {
        students,
        classes,
        teachers,
        wali,
        loading,
        loading2,
        loading_add,
        loading_update,
        fetchDataClass,
        fetchClass,
        fetchWali,
        addClass,
        editWali
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
    import.meta.hot.accept(acceptHMRUpdate(useClasses, import.meta.hot))
}