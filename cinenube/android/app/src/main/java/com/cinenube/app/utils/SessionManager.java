package com.cinenube.app.utils;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Gestiona el token JWT y datos del cliente en SharedPreferences
 */
public class SessionManager {

    private static final String PREF_NAME = "CineNubeSession";
    private static final String KEY_TOKEN = "auth_token";
    private static final String KEY_NOMBRE = "cliente_nombre";
    private static final String KEY_USUARIO = "cliente_usuario";
    private static final String KEY_EMAIL = "cliente_email";
    private static final String KEY_ID = "cliente_id";

    private SharedPreferences prefs;
    private SharedPreferences.Editor editor;

    public SessionManager(Context context) {
        prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = prefs.edit();
    }

    /**
     * Guardar sesión después del login exitoso
     */
    public void guardarSesion(String token, int id, String nombre, String usuario, String email) {
        editor.putString(KEY_TOKEN, token);
        editor.putInt(KEY_ID, id);
        editor.putString(KEY_NOMBRE, nombre);
        editor.putString(KEY_USUARIO, usuario);
        editor.putString(KEY_EMAIL, email);
        editor.apply();
    }

    /**
     * Obtener el token para incluir en el header Authorization
     * Uso: "Bearer " + getToken()
     */
    public String getToken() {
        return prefs.getString(KEY_TOKEN, null);
    }

    /**
     * Obtener el token con prefijo "Bearer " listo para usar en Retrofit
     */
    public String getAuthHeader() {
        String token = getToken();
        if (token != null) return "Bearer " + token;
        return null;
    }

    public String getNombre() { return prefs.getString(KEY_NOMBRE, ""); }
    public String getUsuario() { return prefs.getString(KEY_USUARIO, ""); }
    public String getEmail() { return prefs.getString(KEY_EMAIL, ""); }
    public int getId() { return prefs.getInt(KEY_ID, -1); }

    /**
     * Verificar si hay sesión activa
     */
    public boolean isLoggedIn() {
        return getToken() != null;
    }

    /**
     * Cerrar sesión - borrar todos los datos
     */
    public void cerrarSesion() {
        editor.clear();
        editor.apply();
    }
}
