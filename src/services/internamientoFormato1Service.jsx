import { URL_BACKEND } from "../environments/environments"
import { authAxios } from './axiosHelpers';


export const postInternarBienFormato1 = async (objFile, config) => {
    const rpta = await authAxios.post(`${URL_BACKEND}/bienes-internados`,
        objFile,
        config)
    return rpta
}

export const getBienesInternadosFormato1 = async () => {

    const rpta = await authAxios.get(`${URL_BACKEND}/bienes-internados?tipo_bien=1`)
    return rpta
}