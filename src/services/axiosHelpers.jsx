import axios from 'axios';


const token = localStorage.getItem('token')
// axios.interceptors.response.use(req => {
//     // `req` is the Axios request config, so you can modify
//     // the `headers`.
//     req.headers.authorization = `Bearer ${token}`;
//     return req;
// });
export const authAxios = axios.create({
    //esta variable me ayuda a brindarle el header authorization token a todas las consultas por medio de su interceptors, 
    // creo que si le hacía al axios de frente tendría que hacer para cada uno de los servicios, por eso mejor lo creo aquí
})


authAxios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

// export const authAxios = axios.create();

// authAxios.interceptors.request.use(
//     async config => {
//         const token = await localStorage.getItem('token')
//         config.headers = {
//             'Authorization': `Bearer ${token}`
//         }
//         return config;
//     },
//     error => {
//         Promise.reject(error)
//     });

// authAxios.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//     const primerRequest = error.config;
//     if (error.response.status === 403 && !primerRequest._retry) {
//         primerRequest._retry = true;
//         const token_llamada2 = await localStorage.getItem('token');
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + token_llamada2;
//         return authAxios(primerRequest);
//     }
//     return Promise.reject(error);
// });