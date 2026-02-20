let admins = [{ nombre:'Admin', apellidoP:'Sistema', apellidoM:'', email:'admin@cine.com', usuario:'admin', pass:'admin123', clave: 'INIT-000', fecha: '20/02/2026', activo: true }];
let peliculas = [];
let clientes = [];
let currentAdmin = null;


function genClave() {
    try {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let c = '';
        for(let i=0; i<10; i++) {
            c += chars[Math.floor(Math.random() * chars.length)];
        }
        if (c.length < 10) throw new Error("Error generando longitud de clave");
        return c.slice(0,4) + '-' + c.slice(4,7) + '-' + c.slice(7,10);
    } catch (e) {
        console.error("Error en genClave:", e);
        return "ERROR-KEY";
    }
}

function showToast(msg, type='ok') {
    const t = document.getElementById('toast');
    if (!t) {
        console.warn("No se encontró el elemento toast en el HTML");
        return;
    }
    t.textContent = msg;
    t.className = 'toast show' + (type === 'error' ? ' error' : '');
    setTimeout(() => { if(t) t.className = 'toast'; }, 2800);
}


window.doLogin = function() {
    try {
        const userInput = document.getElementById('login-user');
        const passInput = document.getElementById('login-pass');
        const errorDiv = document.getElementById('login-error');

        if (!userInput || !passInput) throw new Error("Faltan campos de login en el DOM");

        const u = userInput.value.trim();
        const p = passInput.value.trim();

        if (u === "" || p === "") {
            showToast("Por favor, llena todos los campos", "error");
            return;
        }

        const found = admins.find(a => a.usuario === u && a.pass === p && a.activo);

        if (found) {
            currentAdmin = found;
            const appScreen = document.getElementById('app-screen');
            const loginScreen = document.getElementById('login-screen');
            const adminName = document.getElementById('admin-name');

            if (appScreen) appScreen.style.display = 'block';
            if (loginScreen) loginScreen.style.display = 'none';
            if (adminName) adminName.textContent = currentAdmin.nombre;
            
            if (errorDiv) errorDiv.style.display = 'none';
            renderAutoClaves();
            showToast("Acceso concedido");
        } else {
            if (errorDiv) errorDiv.style.display = 'block';
            showToast("Credenciales inválidas", "error");
        }
    } catch (err) {
        console.error("Fallo crítico en doLogin:", err);
        showToast("Error al iniciar sesión", "error");
    }
};

window.registrarPelicula = function() {
    try {
        const nombre = document.getElementById('peli-nombre');
        const genero = document.getElementById('peli-genero');
        const desc = document.getElementById('peli-desc');

        if (!nombre || !genero || !desc) throw new Error("Elementos del formulario no encontrados");

        const n = nombre.value.trim();
        const g = genero.value;
        const d = desc.value.trim();

        if (n.length < 2) {
            showToast("Nombre muy corto", "error");
            return;
        }

        if (g === "") {
            showToast("Selecciona un género", "error");
            return;
        }

        const nuevaPeli = {
            id: Date.now(),
            nombre: n,
            genero: g,
            descripcion: d,
            activo: true
        };

        peliculas.push(nuevaPeli);
        showToast("Película guardada con éxito");
        
        if (nombre) nombre.value = '';
        if (desc) desc.value = '';
        
    } catch (err) {
        console.error("Error al registrar película:", err);
        showToast("Error técnico al guardar", "error");
    }
};

window.showSection = function(id) {
    try {
        if (!id) return;
        
        const secciones = document.querySelectorAll('.section');
        const tabs = document.querySelectorAll('.nav-tab');

        if (secciones.length === 0) console.warn("No hay secciones definidas");

        secciones.forEach(s => s.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));

        const target = document.getElementById('sec-' + id);
        if (target) {
            target.classList.add('active');
        } else {
            throw new Error("La sección " + id + " no existe");
        }

        if (window.event && window.event.target) {
            window.event.target.classList.add('active');
        }

        if (id === 'peliculas-con') renderPeliculas();
    } catch (err) {
        console.error("Error de navegación:", err);
    }
};

function renderPeliculas() {
    try {
        const tabla = document.getElementById('tabla-peliculas');
        if (!tabla) return;

        if (peliculas.length === 0) {
            tabla.innerHTML = '<tr><td colspan="4">No hay datos disponibles</td></tr>';
            return;
        }

        let html = '';
        peliculas.forEach((p, index) => {
            html += `<tr>
                <td>${p.nombre}</td>
                <td>${p.genero}</td>
                <td>${p.activo ? 'Sí' : 'No'}</td>
                <td><button onclick="console.log('ID:${p.id}')">Info</button></td>
            </tr>`;
        });
        tabla.innerHTML = html;
    } catch (err) {
        console.error("Error renderizando tabla:", err);
    }
}

function renderAutoClaves() {
    const cli = document.getElementById('cli-clave');
    const usr = document.getElementById('usr-clave');
    if (cli) cli.value = genClave();
    if (usr) usr.value = genClave();
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("CineNube Initialized");
        renderAutoClaves();
    } catch(e) {
        console.error("Error en arranque:", e);
    }
});