package com.cinenube.app.api;

import com.cinenube.app.model.LoginRequest;
import com.cinenube.app.model.LoginResponse;
import com.cinenube.app.model.PeliculasResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ApiService {

    /**
     * Login del cliente
     * POST /api/auth/login/cliente
     */
    @POST("api/auth/login/cliente")
    Call<LoginResponse> loginCliente(@Body LoginRequest request);

    /**
     * Obtener películas activas (solo clientes autenticados)
     * GET /api/peliculas/activas
     * Requiere: Authorization: Bearer <token>
     */
    @GET("api/peliculas/activas")
    Call<PeliculasResponse> getPeliculasActivas(
            @Header("Authorization") String authToken
    );
}
