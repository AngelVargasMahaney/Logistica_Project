import { URL_BACKEND } from '../environments/environments'
import { authAxios } from './axiosHelpers';


export const getReporteFormato1Excel = async () => {
    
    const req = await authAxios({
        method: "get",
        url: `${URL_BACKEND}/reporte/bienes?ssa=${Math.random()}`,
        responseType: "blob",
      });
      var blob = new Blob([req.data], {
        type: req.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `ReporteFormato1${new Date().toLocaleString() + ''}.xlsx`;
      link.click();
}