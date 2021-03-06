import icon from "./iconDashAdmin";
//export const URL_BACKEND = 'http://192.168.20.60:8080/back-end/public/index.php/api'
export const URL_BACKEND = 'http://demo-logistica-pnp.relengcorp.com/api';

export const NAVEGACION_URL = [
    
    {
        url: "/admin/usuario",
        nombre: "Usuarios",
        icon: "bx bxs-user-badge",
        iconDashboard: icon.usuario,
        is_admin: true
    },
    {
        url: "/admin/personal",
        nombre: "Personal",
        icon: "bx bx-user",
        iconDashboard: icon.personal
    },
    {
        url: "/admin/subunidades",
        nombre: "Subunidades",
        icon: "bx bx-tag-alt",
        iconDashboard: icon.subUnidades
    },
    {
        url: "/admin/area-oficina-seccion",
        nombre: "Área Oficina Sección",
        icon: "bx bx-tag-alt",
        iconDashboard: icon.areaOficinaSeccion
    },
    {
        url: "/admin/formatos",
        nombre: "Bienes Formato 1",
        icon: "bx bx-plus-circle",
        iconDashboard: icon.bienesInternaDestru
    },
    {
        url: "/admin/bienes-auxiliares",
        nombre: "Bienes Auxiliares",
        icon: "bx bx-heart",
        iconDashboard: icon.bienesAuxiliares
    },
    {
        url: "/admin/equipo-policial",
        nombre: "Equipo Policial",
        icon: "bx bx-briefcase-alt-2",
        iconDashboard: icon.equipoPolicial

    },
    {
        url: "/admin/unidades-transporte",
        nombre: "Uni. de Transporte",
        icon: "bx bxs-car-mechanic",
        iconDashboard: icon.unidadTransporte
    },
    {
        url: "/admin/bienes-dirin",
        nombre: "Bienes DIRIN",
        icon: "bx bxs-component",
        iconDashboard: icon.bienesInternaDestru
    },

];