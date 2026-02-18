package com.cinenube.app.model;

import com.google.gson.annotations.SerializedName;

public class ClienteInfo {

    @SerializedName("id")
    private int id;

    @SerializedName("nombre")
    private String nombre;

    @SerializedName("apellido_paterno")
    private String apellidoPaterno;

    @SerializedName("email")
    private String email;

    @SerializedName("usuario")
    private String usuario;

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getApellidoPaterno() { return apellidoPaterno; }
    public String getEmail() { return email; }
    public String getUsuario() { return usuario; }

    public String getNombreCompleto() {
        return nombre + " " + apellidoPaterno;
    }
}
