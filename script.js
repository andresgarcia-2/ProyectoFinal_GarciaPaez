let serviciosDisponibles = [];
let serviciosPresupuesto = [];
let historialPresupuestos = [];

async function cargarServicios() {
    try {
        const response = await fetch('servicios.json');
        const data = await response.json();
        serviciosDisponibles = data.servicios;
        llenarSelectServicios();
    } catch (error) {
        mostrarNotificacion('Error al cargar los servicios', 'error');
    }
}function mostrarNotificacion(mensaje, tipo) {
    if (tipo === 'error') {
        Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Toastify({
            text: mensaje,
                duration: 3000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: tipo === 'success' ? '#27ae60' : '#e74c3c'
                }
        }).showToast();
    }
}

function llenarSelectServicios() {
    const select = document.getElementById('servicio');
    select.innerHTML = '<option value="">Seleccione un servicio</option>';

    serviciosDisponibles.forEach((servicio) => {
        const option = document.createElement('option');
        option.value = servicio.id;
        option.textContent = `${servicio.nombre} - $${servicio.precio}/m²`;
        select.appendChild(option);
    });
}

function obtenerServicio(id) {
    return serviciosDisponibles.find(servicio => servicio.id === id);
}

function Servicio(cliente, tipo, metros) {
    this.id = Date.now() + Math.random();
    this.cliente = cliente;
    this.tipo = tipo;
    this.metros = metros;
    this.fecha = new Date().toLocaleDateString();

    const datosServicio = obtenerServicio(tipo);
    this.nombre = datosServicio.nombre;
    this.precioPorMetro = datosServicio.precio;
    this.total = this.metros * this.precioPorMetro;
}