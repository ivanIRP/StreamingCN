let admins = [{ nombre:'Admin', apellidoP:'Sistema', apellidoM:'', email:'admin@cine.com', usuario:'admin', pass:'admin123', clave: 'AUTO-GEN-001', fecha: '20/02/2026', activo: true }];
let peliculas = [];
let clientes = [];
let currentAdmin = null;

function genClave() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for(let i=0;i<10;i++) c += chars[Math.floor(Math.random()*chars.length)];
  return c.slice(0,4)+'-'+c.slice(4,7)+'-'+c.slice(7,10);
}

function hoy() { return new Date().toLocaleDateString('es-MX'); }

function showToast(msg, type='ok') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type==='error'?' error':'');
  setTimeout(()=>t.className='toast', 2800);
}

function doLogin() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value.trim();
  const found = admins.find(a => a.usuario===u && a.pass===p && a.activo);
  if(found) {
    currentAdmin = found;
    document.getElementById('login-screen').style.display='none';
    document.getElementById('app-screen').style.display='block';
    document.getElementById('admin-name').textContent = found.nombre + ' ' + found.apellidoP;
    renderAutoClaves();
  } else {
    document.getElementById('login-error').style.display='block';
  }
}

function doLogout() {
  currentAdmin = null;
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('app-screen').style.display='none';
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  
  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  }
  
  if(id==='peliculas-con') renderPeliculas();
  if(id==='clientes') renderClientes();
  if(id==='usuarios') renderUsuarios();
}

function renderAutoClaves() {
  if(document.getElementById('cli-clave')) document.getElementById('cli-clave').value = genClave();
  if(document.getElementById('usr-clave')) document.getElementById('usr-clave').value = genClave();
}

function registrarPelicula() {
  const n = document.getElementById('peli-nombre').value.trim();
  const g = document.getElementById('peli-genero').value;
  const img = document.getElementById('peli-imagen').value.trim();
  const d = document.getElementById('peli-desc').value.trim();
  const t = document.getElementById('peli-trailer').value.trim();
  if(!n||!g||!d) { showToast('Faltan datos','error'); return; }
  peliculas.push({ id: Date.now(), nombre:n, genero:g, imagen:img, descripcion:d, trailer:t, activo:true });
  showToast('Película guardada');
  limpiarPeli();
}

function renderPeliculas() {
  const tb = document.getElementById('tabla-peliculas');
  if(!peliculas.length) { tb.innerHTML = '<tr><td colspan="5">Vaciío</td></tr>'; return; }
  tb.innerHTML = peliculas.map((p,i)=>`
    <tr>
      <td><img src="${p.imagen}" class="movie-img"></td>
      <td>${p.nombre}</td>
      <td>${p.genero}</td>
      <td>${p.activo?'Activo':'No'}</td>
      <td><button onclick="togglePeli(${i})">Cambiar Estado</button></td>
    </tr>
  `).join('');
}

function togglePeli(i) {
  peliculas[i].activo = !peliculas[i].activo;
  renderPeliculas();
}

function registrarCliente() {
  const us = document.getElementById('cli-usuario').value.trim();
  const em = document.getElementById('cli-email').value.trim();
  if(!us||!em) return showToast('Datos incompletos','error');
  clientes.push({ usuario: us, email: em, clave: document.getElementById('cli-clave').value, activo: true });
  renderClientes();
  renderAutoClaves();
}

function renderClientes() {
  const tb = document.getElementById('tabla-clientes');
  tb.innerHTML = clientes.map(c => `<tr><td>${c.usuario}</td><td>${c.email}</td><td>${c.clave}</td></tr>`).join('');
}

function registrarUsuario() {
  const u = document.getElementById('usr-usuario').value.trim();
  const p = document.getElementById('usr-pass').value.trim();
  if(!u||!p) return showToast('Error','error');
  admins.push({ usuario: u, pass: p, nombre: 'Nuevo', apellidoP: 'Admin', clave: document.getElementById('usr-clave').value, activo: true });
  renderUsuarios();
  renderAutoClaves();
}

function renderUsuarios() {
  const tb = document.getElementById('tabla-usuarios');
  tb.innerHTML = admins.filter(a=>a.usuario!=='admin').map(a => `<tr><td>${a.usuario}</td><td>${a.clave}</td></tr>`).join('');
}

function limpiarPeli() {
    ['peli-nombre','peli-imagen','peli-desc','peli-trailer'].forEach(id=>document.getElementById(id).value='');
}

renderAutoClaves();