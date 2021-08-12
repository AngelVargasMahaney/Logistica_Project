//https://gitlab.com/frego100/logistics-project-pnp-2021/-/issues/61

import axios from "axios";

import { URL_BACKEND } from "../environments/environments";

export const getAreaOficinaSeccion = async() => {
    const rpta = await axios.get(`${URL_BACKEND}/area-oficina-secciones`);
    return rpta;
};

export const deleteAreaOficinaSeccionById = async(id) => {
    const rpta = await axios.delete(`${URL_BACKEND}/area-oficina-secciones/${id}`);
    return rpta;
};

export const postAreaOficinaSeccion = async(objTipoFormato) => {
    const rpta = await axios.post(
        `${URL_BACKEND}/area-oficina-secciones`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};

export const getAreaOficinaSeccionById = async(id) => {
    const rpta = await axios.get(`${URL_BACKEND}/area-oficina-secciones/${id}`);
    return rpta;
};

export const putAreaOficinaSeccionById = async(objTipoFormato) => {
    const rpta = await axios.put(
        `${URL_BACKEND}/area-oficina-secciones/${objTipoFormato.id}`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};