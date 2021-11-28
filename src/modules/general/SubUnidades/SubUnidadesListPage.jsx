import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getSubunidades,
  deleteSubunidadById,
} from "../../../services/subunidadesService";



const SubUnidadesListPage = () => {
  const URL_CREAR = "/admin/subunidades/crear";
  const URL_EDITAR = "/admin/subunidades/editar";
  const TITULO = "Subunidades";
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);

  const traerData = () => {
    setCargando(true);
    getSubunidades().then((rpta) => {
      setData(rpta.data);
      setCargando(false);
    });
  };

  useEffect(() => {
    traerData();
  }, []);

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar?",
      icon: "warning",
      text: "Los cambios serán irreversibles 😮",
      showCancelButton: true,
    }).then((rpta) => {
      if (rpta.isConfirmed) {
        deleteSubunidadById(id).then((rpta) => {
          if (rpta.status === 200) {
            //Se comprueba que se eliminó correctamente
            traerData(); //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario
          }
        });
      }
    });
  };

  return (
    <>
    
      <div className="home_content">
        <div>
          <main className="container-fluid mt-5">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <h5>{TITULO}</h5>
                  <Link to={URL_CREAR} className="btn btn-primary ">
                    {" "}
                    <i className="fa fa-plus"></i> Crear Subunidad{" "}
                  </Link>
                </div>

                <div className="row mt-2">
                  <div className="col">
                    {cargando ?
                      <div className="loader__father">
                        <div className="loader">
                          <div className="face">
                            <div className="circle"></div>
                          </div>
                          <div className="face">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>

                      : (
                        <div className="table-responsive miTabla ">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Fecha de Creación</th>
                                <th>Última Actualización</th>
                                <th className="acciones"></th>
                              </tr>
                            </thead>

                            <tbody>
                              {data.map((obj, i) => {
                                return (
                                  <tr key={obj.id}>
                                    <td>{obj.id}</td>
                                    <td>{obj.nombre}</td>
                                    <td>{obj.created_at}</td>
                                    <td>{obj.updated_at}</td>
                                    <td>
                                      <button
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Eliminar"
                                        className="btn btn-danger mx-1"
                                        onClick={() => {
                                          eliminar(obj.id);
                                        }}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                      <Link
                                        to={`${URL_EDITAR}/${obj.id}`}
                                        className="btn btn-warning"
                                      >
                                        {" "}
                                        <i className="fa fa-pencil"></i>
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SubUnidadesListPage;
