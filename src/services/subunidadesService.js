//https://gitlab.com/frego100/logistics-project-pnp-2021/-/issues/61


import { URL_BACKEND } from "../environments/environments";
import { authAxios } from "./axiosHelpers";

export const getSubunidades = async() => {
    const rpta = await authAxios.get(`${URL_BACKEND}/subunidades`);
    return rpta;
};

export const deleteSubunidadById = async(id) => {
    const rpta = await authAxios.delete(`${URL_BACKEND}/subunidades/${id}`);
    return rpta;
};

export const postSubunidad = async(objTipoFormato) => {
    const rpta = await authAxios.post(
        `${URL_BACKEND}/subunidades`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};

export const getSubunidadById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/subunidades/${id}`);
    return rpta;
};

export const putSubunidadById = async(objTipoFormato) => {
    const rpta = await authAxios.put(
        `${URL_BACKEND}/subunidades/${objTipoFormato.id}`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};