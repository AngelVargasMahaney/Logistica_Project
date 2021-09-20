//https://gitlab.com/frego100/logistics-project-pnp-2021/-/issues/61



import { URL_BACKEND } from "../environments/environments";
import { authAxios } from "./axiosHelpers";

export const getAreaOficinaSeccion = async() => {
    const rpta = await authAxios.get(`${URL_BACKEND}/area-oficina-secciones`);
    return rpta;
};

export const deleteAreaOficinaSeccionById = async(id) => {
    const rpta = await authAxios.delete(`${URL_BACKEND}/area-oficina-secciones/${id}`);
    return rpta;
};

export const postAreaOficinaSeccion = async(objTipoFormato) => {
    const rpta = await authAxios.post(
        `${URL_BACKEND}/area-oficina-secciones`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};

export const getAreaOficinaSeccionById = async(id) => {
    const rpta = await authAxios.get(`${URL_BACKEND}/area-oficina-secciones/${id}`);
    return rpta;
};

export const putAreaOficinaSeccionById = async(objTipoFormato) => {
    const rpta = await authAxios.put(
        `${URL_BACKEND}/area-oficina-secciones/${objTipoFormato.id}`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};