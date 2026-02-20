package com.cinenube.app.ui.peliculas;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.cinenube.app.api.ApiClient;
import com.cinenube.app.databinding.ActivityPeliculasBinding;
import com.cinenube.app.model.Pelicula;
import com.cinenube.app.model.PeliculasResponse;
import com.cinenube.app.ui.login.LoginActivity;
import com.cinenube.app.utils.SessionManager;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PeliculasActivity extends AppCompatActivity implements PeliculasAdapter.OnPeliculaClickListener {

    private ActivityPeliculasBinding binding;
    private SessionManager sessionManager;
    private PeliculasAdapter adapter;
    private List<Pelicula> listaPeliculas = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityPeliculasBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        sessionManager = new SessionManager(this);

        // Configurar toolbar
        binding.tvNombreCliente.setText("Hola, " + sessionManager.getNombre());

        // Botón cerrar sesión
        binding.btnCerrarSesion.setOnClickListener(v -> cerrarSesion());

        // Configurar RecyclerView
        adapter = new PeliculasAdapter(listaPeliculas, this);
        binding.recyclerView.setLayoutManager(new LinearLayoutManager(this));
        binding.recyclerView.setAdapter(adapter);

        // SwipeRefresh para actualizar
        binding.swipeRefresh.setOnRefreshListener(this::cargarPeliculas);

        // Cargar películas al iniciar
        cargarPeliculas();
    }

    private void cargarPeliculas() {
        binding.progressBar.setVisibility(View.VISIBLE);
        binding.tvVacio.setVisibility(View.GONE);

        String authHeader = sessionManager.getAuthHeader();

        ApiClient.getService().getPeliculasActivas(authHeader).enqueue(new Callback<PeliculasResponse>() {
            @Override
            public void onResponse(Call<PeliculasResponse> call, Response<PeliculasResponse> response) {
                binding.progressBar.setVisibility(View.GONE);
                binding.swipeRefresh.setRefreshing(false);

                if (response.isSuccessful() && response.body() != null) {
                    PeliculasResponse resp = response.body();
                    if (resp.isSuccess() && resp.getData() != null) {
                        listaPeliculas.clear();
                        listaPeliculas.addAll(resp.getData());
                        adapter.notifyDataSetChanged();

                        if (listaPeliculas.isEmpty()) {
                            binding.tvVacio.setVisibility(View.VISIBLE);
                        }
                    }
                } else if (response.code() == 401 || response.code() == 403) {
                    // Token expirado o inválido
                    sessionManager.cerrarSesion();
                    irALogin();
                } else {
                    Toast.makeText(PeliculasActivity.this,
                            "Error al cargar películas", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<PeliculasResponse> call, Throwable t) {
                binding.progressBar.setVisibility(View.GONE);
                binding.swipeRefresh.setRefreshing(false);
                Toast.makeText(PeliculasActivity.this,
                        "Sin conexión al servidor", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onVerTrailerClick(Pelicula pelicula) {
        // Ir a pantalla de detalle/tráiler
        Intent intent = new Intent(this, DetalleActivity.class);
        intent.putExtra("pelicula_nombre", pelicula.getNombre());
        intent.putExtra("pelicula_genero", pelicula.getGenero());
        intent.putExtra("pelicula_imagen", pelicula.getImagenUrl());
        intent.putExtra("pelicula_descripcion", pelicula.getDescripcion());
        intent.putExtra("pelicula_trailer", pelicula.getTrailerUrl());
        startActivity(intent);
    }

    private void cerrarSesion() {
        new AlertDialog.Builder(this)
                .setTitle("Cerrar sesión")
                .setMessage("¿Estás seguro que deseas cerrar sesión?")
                .setPositiveButton("Sí", (dialog, which) -> {
                    sessionManager.cerrarSesion();
                    irALogin();
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void irALogin() {
        Intent intent = new Intent(this, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
