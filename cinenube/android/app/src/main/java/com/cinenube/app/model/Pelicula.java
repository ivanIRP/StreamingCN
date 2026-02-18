package com.cinenube.app.model;

import com.google.gson.annotations.SerializedName;

public class Pelicula {

    @SerializedName("id")
    private int id;

    @SerializedName("nombre")
    private String nombre;

    @SerializedName("genero")
    private String genero;

    @SerializedName("imagen_url")
    private String imagenUrl;

    @SerializedName("descripcion")
    private String descripcion;

    @SerializedName("trailer_url")
    private String trailerUrl;

    @SerializedName("fecha_registro")
    private String fechaRegistro;

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getGenero() { return genero; }
    public String getImagenUrl() { return imagenUrl; }
    public String getDescripcion() { return descripcion; }
    public String getTrailerUrl() { return trailerUrl; }
    public String getFechaRegistro() { return fechaRegistro; }

    public boolean tieneTrailer() {
        return trailerUrl != null && !trailerUrl.isEmpty();
    }
}
