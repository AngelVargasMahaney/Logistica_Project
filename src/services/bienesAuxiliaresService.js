import axios from 'axios';

import { URL_BACKEND } from '../environments/environments'

export const getBienAuxiliar = async() => {
    const rpta = await axios.get(`${URL_BACKEND}/bienes-auxiliares`)
    return rpta
}

export const deleteBienAuxiliarById = async(id) => {
    const rpta = await axios.delete(`${URL_BACKEND}/bienes-auxiliares/${id}`)
    return rpta
}

export const postBienAuxiliar = async(objUsuario) => {
    const rpta = await axios.post(`${URL_BACKEND}/bienes-auxiliares`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const getBienAuxiliarById = async(id) => {
    const rpta = await axios.get(`${URL_BACKEND}/bienes-auxiliares/${id}`)
    return rpta
}

export const putBienAuxiliarById = async(objUsuario) => {
    const rpta = await axios.put(`${URL_BACKEND}/bienes-auxiliares/${objUsuario.id}`,
        JSON.stringify(objUsuario), { headers: { 'Content-Type': 'application/json' } })
    return rpta
}