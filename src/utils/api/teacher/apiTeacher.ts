import type { AxiosInstance } from 'axios'
import { useStorage } from '@vueuse/core';

export interface StateTeacher {
  data : [],
  meta: {
    status: number
    message: string
    code: number
  }
}

export async function getTeacher(api: AxiosInstance): Promise<{ data: StateTeacher}> {
    let params:any = {
        id_school : useStorage('id_school', '').value
    }
    const response:any = await api.get(`/teachers/show`, {params})
    return response
}