package com.cinenube.app.ui.login;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.cinenube.app.api.ApiClient;
import com.cinenube.app.databinding.ActivityLoginBinding;
import com.cinenube.app.model.LoginRequest;
import com.cinenube.app.model.LoginResponse;
import com.cinenube.app.ui.peliculas.PeliculasActivity;
import com.cinenube.app.utils.SessionManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private ActivityLoginBinding binding;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        sessionManager = new SessionManager(this);

        // Si ya hay sesión activa, ir directo a películas
        if (sessionManager.isLoggedIn()) {
            irAPeliculas();
            return;
        }

        // Botón ingresar
        binding.btnIngresar.setOnClickListener(v -> intentarLogin());

        // También al presionar Enter en el campo clave
        binding.etClave.setOnEditorActionListener((v, actionId, event) -> {
            intentarLogin();
            return true;
        });
    }

    private void intentarLogin() {
        String usuario = binding.etUsuario.getText().toString().trim();
        String clave = binding.etClave.getText().toString().trim();

        // Validación básica
        if (usuario.isEmpty()) {
            binding.etUsuario.setError("Ingresa tu usuario");
            binding.etUsuario.requestFocus();
            return;
        }
        if (clave.isEmpty()) {
            binding.etClave.setError("Ingresa tu clave");
            binding.etClave.requestFocus();
            return;
        }

        // Mostrar loading
        setLoading(true);

        // Llamada a la API
        LoginRequest request = new LoginRequest(usuario, clave);
        ApiClient.getService().loginCliente(request).enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                setLoading(false);

                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse loginResponse = response.body();

                    if (loginResponse.isSuccess()) {
                        // Guardar sesión
                        sessionManager.guardarSesion(
                                loginResponse.getToken(),
                                loginResponse.getCliente().getId(),
                                loginResponse.getCliente().getNombre(),
                                loginResponse.getCliente().getUsuario(),
                                loginResponse.getCliente().getEmail()
                        );
                        irAPeliculas();
                    } else {
                        mostrarError(loginResponse.getMessage());
                    }
                } else {
                    // Manejar errores HTTP (401, 403, etc.)
                    int code = response.code();
                    if (code == 401) {
                        mostrarError("Usuario o clave incorrectos");
                    } else if (code == 403) {
                        mostrarError("Tu cuenta está inactiva. Contacta al administrador.");
                    } else {
                        mostrarError("Error del servidor (" + code + ")");
                    }
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                setLoading(false);
                mostrarError("No se pudo conectar al servidor.\nVerifica tu conexión a internet.");
            }
        });
    }

    private void irAPeliculas() {
        Intent intent = new Intent(this, PeliculasActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private void setLoading(boolean loading) {
        binding.btnIngresar.setEnabled(!loading);
        binding.progressBar.setVisibility(loading ? View.VISIBLE : View.GONE);
        binding.btnIngresar.setText(loading ? "" : "INGRESAR");
    }

    private void mostrarError(String mensaje) {
        binding.tvError.setVisibility(View.VISIBLE);
        binding.tvError.setText(mensaje);
    }
}
