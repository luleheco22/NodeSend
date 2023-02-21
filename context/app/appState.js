import { useReducer } from "react";
import axiosClient from "../../config/axios";
import appContext from "./appContext";
import appReducer from "./appReducer";


import {
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO_EXTITO,
    SUBIR_ARCHIVO_ERROR,
    LIMPIAR_ALERTA,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    SUBIR_ARCHIVO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from "../../types";

const AppState = ({ children }) => {

    const initialState = {
        msg_file: null,
        name: '',
        original_name: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: '',

    }

    // Definir el reducer
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Muestra una alerta
    const showAlert = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg,
        })

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 3000);
    }

    // Sube los archivos al servidor
    const uploadFile = async (formData, nameFile) => {

        dispatch({
            type: SUBIR_ARCHIVO,
        })

        try {
            const result = await axiosClient.post("/files", formData);

            dispatch({
                type: SUBIR_ARCHIVO_EXTITO,
                payload: {
                    name: result.data.file,
                    original_name: nameFile,
                }
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg,
            })
        }
    }

    // Crear enlace una vez que se subió el archivo
    const createLink = async () => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author,
        }
        try {
            const response = await axiosClient.post('/links', data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: response.data.msg,
            })
        } catch (error) {
            console.log(error)
        }
     };

     const clearStorage = () => {
        dispatch({
            type: LIMPIAR_STATE,
        })
     }

    // Agrega el password al link
     const addPassword = (password) => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password,
        })
     }

     // Agrega un numero de descargas
     const addDownloads = (download) => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: download,
        })
     }

    return (
        <appContext.Provider
            value={{
                msg_file: state.msg_file,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                clearStorage,
                addPassword,
                addDownloads,
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState

