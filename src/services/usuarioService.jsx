
import { URL_BACKEND } from "../environments/environments"
import { authAxios } from "./axiosHelpers"



export const getUsuarios = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/usuarios`)
    return rpta
}

export const deleteUsuarioById = async (id) => {

    const rpta = await authAxios.delete(`${URL_BACKEND}/usuarios/${id}`)
    return rpta
}

export const postUsuario = async (objUsuario) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/usuarios`,
        JSON.stringify(objUsuario),
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const getUsuariosById = async (id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/usuarios/${id}`)
    return rpta
}

export const putUsuarioById = async (objUsuario) => {
    const rpta = await authAxios.put(`${URL_BACKEND}/usuarios/${objUsuario.id}`,
        JSON.stringify(objUsuario),
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const putActiveUsuarioById = async (id) => {
    const rpta = await authAxios.put(`${URL_BACKEND}/usuarios/changeState/${id}`,

        JSON.stringify({
            is_active: true
        }),
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const putDesactiveUsuarioById = async (id) => {
    const rpta = await authAxios.put(`${URL_BACKEND}/usuarios/changeState/${id}`,
        JSON.stringify({
            is_active: false
        }),
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const getRoles = async () => {
    const rpta = await authAxios.get(`${URL_BACKEND}/roles`)
    return rpta
}