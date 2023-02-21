import { useReducer } from "react";
import axiosClient from "../../config/axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTRO_EXITOSO,
  USUARIO_AUTENTICADO,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {



  // Definir un state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    authenticate: null,
    user: null,
    messague: null,
  }

  // Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Autenticar Usuarios
  const login = async (values) => {
    try {
      const response = await axiosClient.post('/auth', values)
      if (response.data.login) {
        dispatch({
          type: LOGIN_EXITOSO,
          payload: response.data
        })
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: response.data
        })
      }
      // Limpiar la alerta depsues de 3 segyndos
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA
        })
      }, 3000);
    } catch (error) {
      console.log(error)
    }
  }
  // Registar un nuevo usuario
  const createUser = async (values) => {
    try {
      const response = await axiosClient.post('/users/add', values)

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: response.data,
      })
      // Limpiar la alerta depsues de 3 segyndos
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA
        })
      }, 3000);

    } catch (error) {
      console.log(error)
    }
  }

  // Retorne el usuario autenticado en base al JWT
  const userAuthenticate = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token)
    }
    try {
      const response = await axiosClient.get('/auth')
      if (response.data.user) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: response.data.user,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  //Cerrar Sesión
  const SingOut = async () => {
    dispatch({
      type: CERRAR_SESION,
    })
  }

 


  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticate: state.authenticate,
        user: state.user,
        messague: state.messague,
        createUser,
        userAuthenticate,
        login,
        SingOut,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthState
