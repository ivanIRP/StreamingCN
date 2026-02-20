export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        renderPeliculas: "readonly", 
        renderClientes: "readonly",
        renderUsuarios: "readonly"
      }
    }
  }
];