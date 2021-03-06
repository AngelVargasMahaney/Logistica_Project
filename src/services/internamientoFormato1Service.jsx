import { URL_BACKEND } from "../environments/environments"
import { authAxios } from './axiosHelpers';


export const postInternarBienFormato1 = async (objFile, config) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-internados`,
        objFile,
        config)
    return rpta
}
export const postInternarBienAuxliar = async (objFile, config) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-internados`,
        objFile,
        config)
    return rpta
}


export const getBienesInternadosFormato1 = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-internados?tipo_bien=1`)
    return rpta
}

export const deleteDesinternarBien = async (id) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-internados/desinternar/${id}`)
    return rpta
}
export const getBienesInternadosBienesAuxiliares = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-internados?tipo_bien=2`)
    return rpta
}
export const getBienesInternadosEquipoPolicial = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-internados?tipo_bien=3`)
    return rpta
}
export const getBienesInternadosUnidadesTransporte = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-internados?tipo_bien=4`)
    return rpta
}
export const getBienesInternadosBienesDirin = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-internados?tipo_bien=5`)
    return rpta
}

export const postReasignarBienFormato1 = async (objFile, config) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/reasignar-bien`,
        objFile,
        config)
    return rpta
}

export const postEditarInternamientoById = async(objFile, config, id)=>{
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-internados/${id}`,objFile, config)
    return rpta
}