// Enum representing a request status
export const status = Object.freeze({
    PENDING: 'PENDING',
    FETCHING: 'FETCHING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
});

// Mapping of api error codes to messages
export const apiErrors = Object.freeze({
    AUT001: 'Autenticación requerida',
    AUT002: 'Acceso no permitido',
    AUT003: 'Sesión expirada',
    VAL001: 'Error de validación',
    REQ001: 'Recurso no encontrado',
    REQ002: 'Solicitud inválida',
    SRV001: 'Error del servidor'
});