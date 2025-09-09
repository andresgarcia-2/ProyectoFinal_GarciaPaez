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

function agregarServicio() {
    try {
        const cliente = document.getElementById('cliente').value.trim();
        const tipo = document.getElementById('servicio').value;
        const metros = parseFloat(document.getElementById('metros').value);

        // Validaciones con SweetAlert
        if (!cliente) {
            mostrarNotificacion('Por favor ingresa el nombre del cliente', 'error');
            return;
        }

        if (!tipo) {
            mostrarNotificacion('Por favor selecciona un tipo de servicio', 'error');
            return;
        }

        if (!metros || metros <= 0) {
            mostrarNotificacion('Por favor ingresa una cantidad válida de metros cuadrados', 'error');
            return;
        }

        if (metros > 1000) {
            mostrarNotificacion('Los metros cuadrados no pueden exceder 1000 m²', 'error');
            return;
        }

        const nuevoServicio = new Servicio(cliente, tipo, metros);
        serviciosPresupuesto.push(nuevoServicio);

        mostrarServicios();
        calcularTotal();
        limpiarFormulario();
        mostrarNotificacion('Servicio agregado correctamente', 'success');

    } catch (error) {
        mostrarNotificacion('Error al agregar el servicio: ' + error.message, 'error');
    }
}