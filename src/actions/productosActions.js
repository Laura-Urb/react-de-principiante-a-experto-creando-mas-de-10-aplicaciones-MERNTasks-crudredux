import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_EXITO,
  PRODUCTO_ELIMINAR_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos PRODUCTOS
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //Insertar en la API
      await clienteAxios.post("/productos", producto);
      //Si todo sale bien actualizar el state
      dispatch(agregarProductoExito(producto));
      //Alerta
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      dispatch(agregarProductoError(true));
      //Alerta
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
//Obtener PRODUCTOS
export function obtenerProductosAction(producto) {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      //Insertar en la API
      const respuesta = await clienteAxios.get("/productos");
      //Si todo sale bien actualizar el state
      dispatch(descargarProductosExito(respuesta.data));
    } catch (error) {
      dispatch(descargarProductosError());
    }
  };
}
//ELIMINAR PRODUCTO
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      //Insertar en la API
      await clienteAxios.delete(`/productos/${id}`);
      //Si todo sale bien actualizar el state
      dispatch(eliminarProductoExito());
      Swal.fire(
        "Eliminado!",
        "El producto se eliminó correctamente",
        "success"
      );
    } catch (error) {
      dispatch(eliminarProductoError());
      //Alerta
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
//Obtener PRODUCTO
export function obtenerProductoEditarAction(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
  };
}
//Editar PRODUCTO
export function editarProductoAction(producto) {
  return async (dispatch) => {
    try {
      //Insertar en la API
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      //Si todo sale bien actualizar el state
      dispatch(editarProductoExito(producto));
    } catch (error) {
      // dispatch(eliminarProductoError());
      //Alerta
      // Swal.fire({
      //   icon: "error",
      //   title: "Hubo un error",
      //   text: "Hubo un error, intenta de nuevo",
      // });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductosExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINAR_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINAR_ERROR,
  payload: true,
});

const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto,
});

const editarProductoError = (producto) => ({
  type: PRODUCTO_EDITAR_ERROR,
  payload: true,
});
