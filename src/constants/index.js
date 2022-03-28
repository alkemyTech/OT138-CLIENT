// Enum representing a request status
export const status = Object.freeze({
  PENDING: "PENDING",
  FETCHING: "FETCHING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
});

// Mapping of api error codes to messages
export const apiErrors = Object.freeze({
  AUT001: "Autenticación requerida",
  AUT002: "Acceso no permitido",
  AUT003: "Sesión expirada",
  AUT004: "Credenciales inválidas",
  VAL001: "Error de validación",
  REQ001: "Recurso no encontrado",
  REQ002: "Solicitud inválida",
  REQ003: "Conflicto",
  SRV001: "Error del servidor",
});

// Array for header links, first match of current path with basePath will be displayed.
export const navItems = [
  {
    basePath: "/login",
    routes: [],
    hide: true,
  },
  {
    basePath: "/registro",
    routes: [],
    hide: true,
  },
  {
    basePath: "/backoffice",
    routes: [
      {
        route: "/backoffice",
        text: "Inicio",
      },
      {
        route: "/backoffice/activities",
        text: "Actividades",
      },
      {
        route: "/backoffice/news",
        text: "Novedades",
      },
      {
        route: "/backoffice/testimonials",
        text: "Testimonios",
      },
      {
        route: "/backoffice/categories",
        text: "Categorías",
      },
      {
        route: "/backoffice/contacts",
        text: "Contactos",
      },
      {
        route: "/backoffice/users",
        text: "Usuarios",
      },
      {
        route: "/backoffice/slider",
        text: "Slider",
      },
      {
        route: "/backoffice/edit-organization",
        text: "Organización",
      },
    ],
  },
  {
    basePath: "/",
    routes: [
      {
        route: "/",
        text: "Inicio",
      },
      {
        route: "/actividades",
        text: "Actividades",
      },
      {
        route: "/novedades",
        text: "Novedades",
      },
      {
        route: "/nosotros",
        text: "Nosotros",
      },
      {
        route: "/testimonios",
        text: "Testimonios",
      },
      {
        route: "/contacto",
        text: "Contacto",
      },
    ],
  },
];