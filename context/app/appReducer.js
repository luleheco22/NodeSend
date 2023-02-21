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

export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                msg_file: action.payload,
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                msg_file: null,
            }
        case SUBIR_ARCHIVO_EXTITO:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                loading: null,
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                msg_file: action.payload,
                loading: null,
            }
        case SUBIR_ARCHIVO:
            return {
                ...state,
                loading: true,
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload,
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                msg_file: null,
                name: '',
                original_name: '',
                loading: null,
                downloads: 1,
                password: '',
                author: null,
                url: '',
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload,
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                downloads: action.payload,
            }



        default:
            return state
    }
}