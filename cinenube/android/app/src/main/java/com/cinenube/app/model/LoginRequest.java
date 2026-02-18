package com.cinenube.app.model;

import com.google.gson.annotations.SerializedName;

// ─── REQUEST: Login ───────────────────────────────────────────
// LoginRequest.java
// LoginResponse.java
// Pelicula.java
// PeliculasResponse.java
// ClienteInfo.java

public class LoginRequest {
    @SerializedName("usuario")
    private String usuario;

    @SerializedName("clave")
    private String clave;

    public LoginRequest(String usuario, String clave) {
        this.usuario = usuario;
        this.clave = clave;
    }

    public String getUsuario() { return usuario; }
    public String getClave() { return clave; }
}
