package com.cinenube.app.model;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class PeliculasResponse {

    @SerializedName("success")
    private boolean success;

    @SerializedName("message")
    private String message;

    @SerializedName("data")
    private List<Pelicula> data;

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public List<Pelicula> getData() { return data; }
}
