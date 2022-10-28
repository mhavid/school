import type { AxiosInstance } from 'axios'

export interface Credential {
  data : {
    id_user : string
    id_school : string
    user : string
    token : string
  },
  meta: {
    status: number
    message: string
    code: number
  }
}

export async function fetchLogin(
  api: AxiosInstance,
  username: string,
  password: string
): Promise<{ data: Credential;}> {
    let params = {
        username : username,
        password : password
    }
    const response:any = await api.post<Credential[]>(`/api/login`, params)
    return response
}
