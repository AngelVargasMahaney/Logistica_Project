
import { URL_BACKEND } from '../environments/environments'
import { authAxios } from './axiosHelpers';


export const getEquipoPolicial = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/equipo-policial`)
    return rpta
}

export const deleteEquipoPolicialById = async (id) => {
    const rpta = await authAxios.delete(`${URL_BACKEND}/equipo-policial/${id}`)
    return rpta
}

export const postEquipoPolicial = async (objUsuario) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/equipo-policial`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}
export const postEquipoPolicialFiles = async (objFile, config) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/equipo-policial`,
        objFile,
        config)
    return rpta
}

export const getEquipoPolicialById = async (id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/equipo-policial/${id}`)
    return rpta
}

export const putEquipoPolicialById = async (objUsuario) => {
    const rpta = await authAxios.put(`${URL_BACKEND}/equipoPolicial/${objUsuario.id}`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const postEditarEquipoPolicialById = async (objEquipoPolicial, config, id) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/equipo-policial/${id}`, objEquipoPolicial, config)
    return rpta
}
