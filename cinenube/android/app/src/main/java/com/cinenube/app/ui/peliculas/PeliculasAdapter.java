package com.cinenube.app.ui.peliculas;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.cinenube.app.R;
import com.cinenube.app.model.Pelicula;

import java.util.List;

public class PeliculasAdapter extends RecyclerView.Adapter<PeliculasAdapter.PeliculaViewHolder> {

    public interface OnPeliculaClickListener {
        void onVerTrailerClick(Pelicula pelicula);
    }

    private List<Pelicula> peliculas;
    private OnPeliculaClickListener listener;

    public PeliculasAdapter(List<Pelicula> peliculas, OnPeliculaClickListener listener) {
        this.peliculas = peliculas;
        this.listener = listener;
    }

    @NonNull
    @Override
    public PeliculaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_pelicula, parent, false);
        return new PeliculaViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PeliculaViewHolder holder, int position) {
        Pelicula pelicula = peliculas.get(position);
        holder.bind(pelicula, listener);
    }

    @Override
    public int getItemCount() {
        return peliculas.size();
    }

    static class PeliculaViewHolder extends RecyclerView.ViewHolder {
        private TextView tvNombreGenero;
        private ImageView ivPoster;
        private TextView tvDescripcion;
        private Button btnVer;

        PeliculaViewHolder(@NonNull View itemView) {
            super(itemView);
            tvNombreGenero = itemView.findViewById(R.id.tv_nombre_genero);
            ivPoster = itemView.findViewById(R.id.iv_poster);
            tvDescripcion = itemView.findViewById(R.id.tv_descripcion);
            btnVer = itemView.findViewById(R.id.btn_ver);
        }

        void bind(Pelicula pelicula, OnPeliculaClickListener listener) {
            tvNombreGenero.setText(pelicula.getNombre() + " - " + pelicula.getGenero());
            tvDescripcion.setText(pelicula.getDescripcion());

            // Cargar imagen con Glide
            if (pelicula.getImagenUrl() != null && !pelicula.getImagenUrl().isEmpty()) {
                Glide.with(itemView.getContext())
                        .load(pelicula.getImagenUrl())
                        .apply(new RequestOptions()
                                .placeholder(R.drawable.ic_movie_placeholder)
                                .error(R.drawable.ic_movie_placeholder)
                                .centerCrop())
                        .into(ivPoster);
            } else {
                ivPoster.setImageResource(R.drawable.ic_movie_placeholder);
            }

            // Botón Ver (solo si tiene tráiler)
            if (pelicula.tieneTrailer()) {
                btnVer.setVisibility(View.VISIBLE);
                btnVer.setOnClickListener(v -> listener.onVerTrailerClick(pelicula));
            } else {
                btnVer.setVisibility(View.GONE);
            }
        }
    }
}
