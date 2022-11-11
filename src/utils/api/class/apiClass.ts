import type { AxiosInstance } from 'axios'
import { useStorage } from '@vueuse/core';
export interface DC {
  data : {
    students : []
    wali_kelas : []
    data : []
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

export interface StateWali {
  data : [],
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
    if(data.id_class) params.id_class = data.id_class
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

export async function getWali(api: AxiosInstance): Promise<{ data: StateWali}> {
  let params = {
      id_school : useStorage('id_school', '').value,
  }
  const response:any = await api.get(`/wali`, {params})
  return response
}

export async function updateWali(api: AxiosInstance, param:any): Promise<{ data: DC}> {
  let params = {
      id_school : useStorage('id_school', '').value,
      id_class : param.id_class || null,
      id_wali : param.id_wali || null
  }
  const response:any = await api.post(`/wali/update`, params)
  return response
}


