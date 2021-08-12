import axios from 'axios';

import { URL_BACKEND } from '../environments/environments'


export const getEquipoPolicial = async() => {

    const rpta = await axios.get(`${URL_BACKEND}/equipo-policial`)
    return rpta
}

export const deleteEquipoPolicialById = async(id) => {
    const rpta = await axios.delete(`${URL_BACKEND}/equipo-policial/${id}`)
    return rpta
}

export const postEquipoPolicial = async(objUsuario) => {
    const rpta = await axios.post(`${URL_BACKEND}/equipo-policial`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const getEquipoPolicialById = async(id) => {
    const rpta = await axios.get(`${URL_BACKEND}/equipo-policial/${id}`)
    return rpta
}

export const putEquipoPolicialById = async(objUsuario) => {
    const rpta = await axios.put(`${URL_BACKEND}/equipoPolicial/${objUsuario.id}`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}