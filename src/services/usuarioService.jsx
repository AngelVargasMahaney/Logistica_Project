import axios from 'axios';

import { URL_BACKEND } from "../environments/environments"


export const getUsuarios = async () => {

    const rpta = await axios.get(`${URL_BACKEND}/usuarios`)
    return rpta
}

export const deleteUsuarioById = async (id) => {

    const rpta = await axios.delete(`${URL_BACKEND}/usuarios/${id}`)
    return rpta
}

export const postUsuario = async (objUsuario) => {
    const rpta = await axios.post(`${URL_BACKEND}/usuarios`,
        JSON.stringify(objUsuario),
        { headers: { 'Content-Type': 'application/json' } })
    return rpta
}

export const getUsuariosById = async (id) => {
    const rpta = await axios.get(`${URL_BACKEND}/usuarios/${id}`)
    return rpta
}

export const putUsuarioById = async (objUsuario) => {
    const rpta = await axios.put(`${URL_BACKEND}/usuarios/${objUsuario.id}`, 
    JSON.stringify(objUsuario),
    { headers: { 'Content-Type': 'application/json'}})
    return rpta
}