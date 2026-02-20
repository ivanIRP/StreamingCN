package com.moviesapp.client.api;

import com.moviesapp.client.models.Pelicula;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ApiService {
    @GET("Peliculas")
    Call<List<Pelicula>> getPeliculas();

    @GET("Peliculas/{id}")
    Call<Pelicula> getPelicula(@Path("id") int id);
}
