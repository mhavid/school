import type { AxiosInstance } from 'axios'
import { useStorage } from '@vueuse/core';
export interface DC {
  data : {
    students : []
    wali_kelas : []
  },
  meta: {
    status: number
    message: string
    code: number
  }
}

export interface StateClass {
  data : {
    class : []
  },
  meta: {
    status: number
    message: string
    code: number
  }
}

export async function getDataClass(api: AxiosInstance, data: any): Promise<{ data: DC}> {
    let params:any = {
        id_school : useStorage('id_school', '').value,
        id_user : useStorage('id_user', '').value
    }
    if(data.class) params.class = data.class
    if(data.date) params.date = data.date

    const response:any = await api.get(`/class`, {params})
    return response
}

export async function getClass(api: AxiosInstance): Promise<{ data: StateClass}> {
    let params = {
        id_school : useStorage('id_school', '').value,
    }
    const response:any = await api.get(`/class/list`, {params})
    return response
}

export async function saveClass(api: AxiosInstance, param:any): Promise<{ data: StateClass}> {
  let params = {
      id_school : useStorage('id_school', '').value,
      name : param.name || null,
      code : param.code || null
  }
  const response:any = await api.post(`/class/add`, params)
  return response
}


