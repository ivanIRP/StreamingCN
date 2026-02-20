package com.moviesapp.client.models;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;

public class Pelicula implements Serializable {
    @SerializedName("id")
    private int id;

    @SerializedName("nombre")
    private String nombre;

    @SerializedName("sinopsis")
    private String sinopsis;

    @SerializedName("categoria")
    private String categoria;

    @SerializedName("anio")
    private int anio;

    @SerializedName("linkPelicula")
    private String linkPelicula;

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getSinopsis() { return sinopsis; }
    public String getCategoria() { return categoria; }
    public int getAnio() { return anio; }
    public String getLinkPelicula() { return linkPelicula; }
    public boolean tieneLink() { return linkPelicula != null && !linkPelicula.isEmpty(); }
}
