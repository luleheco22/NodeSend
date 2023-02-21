import { 
    REGISTRO_EXITOSO,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
            return {
                ...state,
                messague:action.payload,
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                messague:null,
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                messague:action.payload,
                token: action.payload.token,
                authenticate: true,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                messague:action.payload,
                authenticate: false,
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                user: action.payload,
                authenticate: true,

            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                authenticate: null,
            }
    
        default:
            return state;
    }
}