//https://gitlab.com/frego100/logistics-project-pnp-2021/-/issues/61

import axios from "axios";

import { URL_BACKEND } from "../environments/environments";

export const getSubunidades = async() => {
    const rpta = await axios.get(`${URL_BACKEND}/subunidades`);
    return rpta;
};

export const deleteSubunidadById = async(id) => {
    const rpta = await axios.delete(`${URL_BACKEND}/subunidades/${id}`);
    return rpta;
};

export const postSubunidad = async(objTipoFormato) => {
    const rpta = await axios.post(
        `${URL_BACKEND}/subunidades`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};

export const getSubunidadById = async(id) => {
    const rpta = await axios.get(`${URL_BACKEND}/subunidades/${id}`);
    return rpta;
};

export const putSubunidadById = async(objTipoFormato) => {
    const rpta = await axios.put(
        `${URL_BACKEND}/subunidades/${objTipoFormato.id}`,
        JSON.stringify(objTipoFormato), { headers: { "Content-Type": "application/json" } }
    );
    return rpta;
};