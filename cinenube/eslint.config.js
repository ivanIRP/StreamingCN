import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        renderPeliculas: "readonly",
        renderClientes: "readonly",
        renderUsuarios: "readonly",
        renderAutoClaves: "readonly",
        showSection: "readonly",
        doLogin: "readonly",
        doLogout: "readonly",
        registrarPelicula: "readonly",
        registrarCliente: "readonly",
        registrarUsuario: "readonly",
        togglePeli: "readonly",
        showToast: "readonly",
        genClave: "readonly"
      },
    },
    rules: {
      "no-unused-vars": "off",
      
      "no-undef": "warn",
      
      "no-console": "off",

      "prefer-const": "off"
    }
  }
];