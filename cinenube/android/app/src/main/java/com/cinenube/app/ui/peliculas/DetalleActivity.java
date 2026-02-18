package com.cinenube.app.ui.peliculas;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.cinenube.app.databinding.ActivityDetalleBinding;

public class DetalleActivity extends AppCompatActivity {

    private ActivityDetalleBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityDetalleBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Toolbar con botón atrás
        setSupportActionBar(binding.toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }

        // Recibir datos de la película
        String nombre      = getIntent().getStringExtra("pelicula_nombre");
        String genero      = getIntent().getStringExtra("pelicula_genero");
        String imagenUrl   = getIntent().getStringExtra("pelicula_imagen");
        String descripcion = getIntent().getStringExtra("pelicula_descripcion");
        String trailerUrl  = getIntent().getStringExtra("pelicula_trailer");

        // Mostrar datos
        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle(nombre);
        }
        binding.tvNombre.setText(nombre);
        binding.tvGenero.setText(genero);
        binding.tvDescripcion.setText(descripcion);

        // Cargar imagen
        if (imagenUrl != null && !imagenUrl.isEmpty()) {
            Glide.with(this)
                    .load(imagenUrl)
                    .centerCrop()
                    .into(binding.ivPoster);
        }

        // Botón VER TRÁILER
        if (trailerUrl != null && !trailerUrl.isEmpty()) {
            binding.btnVerTrailer.setEnabled(true);
            binding.tvTrailerUrl.setText(trailerUrl);
            binding.btnVerTrailer.setOnClickListener(v -> abrirTrailer(trailerUrl));
        } else {
            binding.tvTrailerUrl.setText("Sin tráiler disponible");
            binding.btnVerTrailer.setEnabled(false);
            binding.btnVerTrailer.setText("SIN TRÁILER");
        }
    }

    private void abrirTrailer(String url) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(this, "No se pudo abrir el tráiler", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
