package com.moviesapp.client.adapters;

import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;
import com.moviesapp.client.R;
import com.moviesapp.client.models.Pelicula;
import java.util.ArrayList;
import java.util.List;

public class PeliculasAdapter extends RecyclerView.Adapter<PeliculasAdapter.ViewHolder> {
    
    private List<Pelicula> peliculas = new ArrayList<>();

    public void setPeliculas(List<Pelicula> peliculas) {
        this.peliculas = peliculas;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_pelicula, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Pelicula pelicula = peliculas.get(position);
        holder.bind(pelicula);
    }

    @Override
    public int getItemCount() {
        return peliculas.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvNombre, tvCategoria, tvAnio, tvSinopsis;
        Button btnVerPelicula;
        CardView card;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvNombre = itemView.findViewById(R.id.tvNombre);
            tvCategoria = itemView.findViewById(R.id.tvCategoria);
            tvAnio = itemView.findViewById(R.id.tvAnio);
            tvSinopsis = itemView.findViewById(R.id.tvSinopsis);
            btnVerPelicula = itemView.findViewById(R.id.btnVerPelicula);
            card = itemView.findViewById(R.id.cardPelicula);
        }

        public void bind(Pelicula pelicula) {
            tvNombre.setText(pelicula.getNombre());
            tvCategoria.setText(pelicula.getCategoria());
            tvAnio.setText(String.valueOf(pelicula.getAnio()));
            tvSinopsis.setText(pelicula.getSinopsis());

            if (pelicula.tieneLink()) {
                btnVerPelicula.setVisibility(View.VISIBLE);
                btnVerPelicula.setOnClickListener(v -> {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(pelicula.getLinkPelicula()));
                    v.getContext().startActivity(intent);
                });
            } else {
                btnVerPelicula.setVisibility(View.GONE);
            }
        }
    }
}
