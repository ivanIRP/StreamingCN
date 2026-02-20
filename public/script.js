let admins = [{ nombre: 'Admin', apellidoP: 'Sistema', apellidoM: '', email: 'admin@cine.com', usuario: 'admin', pass: 'admin123', clave: 'INIT-000', fecha: '20/02/2026', activo: true }];
let peliculas = [];
let clientes = [];
let currentAdmin = null;


function genClave() {
    try {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let c = '';
        for (let i = 0; i < 10; i++) {
            c += chars[Math.floor(Math.random() * chars.length)];
        }
        return c.slice(0, 4) + '-' + c.slice(4, 7) + '-' + c.slice(7, 10);
    } catch (e) {
        console.error("Error crítico en genClave:", e);
        return "ERR-KEY-000";
    }
}

function showToast(msg, type = 'ok') {
    try {
        const t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.className = 'toast show' + (type === 'error' ? ' error' : '');
        setTimeout(() => { if (t) t.className = 'toast'; }, 2800);
    } catch (e) {
        console.error("Error mostrando toast:", e);
    }
}


window.showSection = function(id) {
    try {
        if (!id) throw new Error("ID de sección no proporcionado");
        
        const secciones = document.querySelectorAll('.section');
        const tabs = document.querySelectorAll('.nav-tab');

        if (secciones.length > 0) {
            secciones.forEach(s => s.classList.remove('active'));
        }
        if (tabs.length > 0) {
            tabs.forEach(t => t.classList.remove('active'));
        }

        const target = document.getElementById('sec-' + id);
        if (target) {
            target.classList.add('active');
        }

        if (window.event && window.event.target) {
            window.event.target.classList.add('active');
        }

        if (id === 'peliculas-con') renderPeliculas();
        if (id === 'clientes') renderClientes();
        if (id === 'usuarios') renderUsuarios();
        
    } catch (err) {
        console.error("Fallo en navegación:", err);
    }
};

window.registrarCliente = function() {
    try {
        const nom = document.getElementById('cli-nombre');
        const em = document.getElementById('cli-email');
        const us = document.getElementById('cli-usuario');
        const cl = document.getElementById('cli-clave');

        if (!nom || !em || !us || !cl) throw new Error("DOM incompleto en Clientes");

        const valNom = nom.value.trim();
        const valEm = em.value.trim();
        const valUs = us.value.trim();

        if (valNom === "" || valEm === "" || valUs === "") {
            showToast("Todos los campos de cliente son obligatorios", "error");
            return;
        }

        if (clientes.find(c => c.usuario === valUs)) {
            showToast("Este usuario ya existe", "error");
            return;
        }

        const nuevoCliente = {
            id: Date.now(),
            nombre: valNom,
            email: valEm,
            usuario: valUs,
            clave: cl.value,
            fecha: new Date().toLocaleDateString(),
            activo: true
        };

        clientes.push(nuevaCliente);
        showToast("Cliente registrado correctamente");
        
        nom.value = ''; em.value = ''; us.value = '';
        renderClientes();
        renderAutoClaves();

    } catch (err) {
        console.error("Error en registrarCliente:", err);
        showToast("Error técnico al registrar cliente", "error");
    }
};

function renderClientes() {
    try {
        const tabla = document.getElementById('tabla-clientes');
        if (!tabla) return;

        if (clientes.length === 0) {
            tabla.innerHTML = '<tr><td colspan="4">No hay clientes en la base de datos</td></tr>';
            return;
        }

        tabla.innerHTML = clientes.map(c => `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.usuario}</td>
                <td><code style="color:var(--accent2)">${c.clave}</code></td>
                <td><span class="status-badge badge-active">Activo</span></td>
            </tr>
        `).join('');
    } catch (e) {
        console.error("Error renderizando clientes:", e);
    }
}

window.registrarUsuario = function() {
    try {
        const us = document.getElementById('usr-usuario');
        const ps = document.getElementById('usr-pass');
        const cl = document.getElementById('usr-clave');

        if (!us || !ps || !cl) throw new Error("DOM incompleto en Usuarios");

        if (us.value.trim() === "" || ps.value.trim() === "") {
            showToast("Usuario y password requeridos", "error");
            return;
        }

        admins.push({
            usuario: us.value.trim(),
            pass: ps.value.trim(),
            nombre: 'Admin',
            apellidoP: 'Nuevo',
            clave: cl.value,
            activo: true
        });

        showToast("Administrador creado");
        us.value = ''; ps.value = '';
        renderUsuarios();
        renderAutoClaves();

    } catch (err) {
        console.error("Error en registrarUsuario:", err);
    }
};

function renderUsuarios() {
    try {
        const tabla = document.getElementById('tabla-usuarios');
        if (!tabla) return;
        
        const listaAdmins = admins.filter(a => a.usuario !== 'admin');
        
        if (listaAdmins.length === 0) {
            tabla.innerHTML = '<tr><td colspan="2">No hay administradores adicionales</td></tr>';
            return;
        }

        tabla.innerHTML = listaAdmins.map(a => `
            <tr>
                <td><strong>${a.usuario}</strong></td>
                <td>${a.clave}</td>
            </tr>
        `).join('');
    } catch (e) {
        console.error("Error renderizando usuarios:", e);
    }
}

function renderAutoClaves() {
    try {
        const cClave = document.getElementById('cli-clave');
        const uClave = document.getElementById('usr-clave');
        if (cClave) cClave.value = genClave();
        if (uClave) uClave.value = genClave();
    } catch (e) {
        console.warn("No se pudieron generar claves automáticas");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        renderAutoClaves();
        console.log("CineNube: Sistema Blindado Listo");
    } catch (e) {
        console.error("Error en arranque del sistema:", e);
    }
});