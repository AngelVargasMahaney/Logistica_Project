import axios from 'axios'
import { URL_BACKEND } from '../environments/environments'

export const postLogin = async (objLogin) => {
    const rpta = await axios.post(
        `${URL_BACKEND}/login`,
        JSON.stringify(objLogin),{
            headers:{ 
                "Content-type" : "application/json",
            }
        }
    )
   
    return rpta
}

export const postVerificarToken = async (token) => {
    const rpta = await axios.post(
        `${URL_BACKEND}/verificarToken`,null,{
            headers:{ 
                "Authorization" : `Bearer ${token}`
            }
        }
    )
    return rpta
}