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

function mostrarServicios() {
    const lista = document.getElementById('lista-servicios');
    
    if (serviciosPresupuesto.length === 0) {
        lista.innerHTML = '<p class="mensaje-vacio">No hay servicios agregados al presupuesto</p>';
        return;
    }

    let html = '';
    
    serviciosPresupuesto.forEach((servicio, index) => {
        html += `
            <div class="servicio-item">
                <div class="servicio-header">
                    <div>
                        <div class="servicio-info">Cliente: ${servicio.cliente}</div>
                        <div class="servicio-detalles">
                            ${servicio.nombre} - ${servicio.metros} m² × $${servicio.precioPorMetro}
                        </div>
                    </div>
                    <div class="servicio-precio">$${servicio.total.toFixed(2)}</div>
                </div>
                <div class="servicio-acciones">
                    <button class="btn-editar" onclick="editarServicio(${index})">Editar</button>
                    <button class="btn-eliminar" onclick="eliminarServicio(${index})">Eliminar</button>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
}

function calcularTotal() {
    const total = serviciosPresupuesto.reduce((suma, servicio) => {
        return suma + servicio.total;
    }, 0);

    document.getElementById('total').textContent = total.toFixed(2);
}

function eliminarServicio(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres eliminar este servicio del presupuesto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            serviciosPresupuesto.splice(index, 1);
            mostrarServicios();
            calcularTotal();
            mostrarNotificacion('Servicio eliminado correctamente', 'success');
        }
    });
}

function editarServicio(index) {
    const servicio = serviciosPresupuesto[index];

    document.getElementById('cliente').value = servicio.cliente;
    document.getElementById('servicio').value = servicio.tipo;
    document.getElementById('metros').value = servicio.metros;
    
    // Eliminar el servicio para que se pueda agregar editado
    serviciosPresupuesto.splice(index, 1);
    mostrarServicios();
    calcularTotal();
    mostrarNotificacion('Servicio cargado para edición', 'success');
}


function limpiarFormulario() {
    document.getElementById('metros').value = '';
    document.getElementById('servicio').value = '';
}


function limpiarTodo() {
    if (serviciosPresupuesto.length === 0) {
        mostrarNotificacion('No hay servicios para limpiar', 'error');
        return;
    }
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres eliminar todos los servicios del presupuesto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, limpiar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            serviciosPresupuesto = [];
            mostrarServicios();
            calcularTotal();
            mostrarNotificacion('Presupuesto limpiado correctamente', 'success');
        }
    });
}

function guardarPresupuesto() {
    if (serviciosPresupuesto.length === 0) {
        mostrarNotificacion('No hay servicios para guardar', 'error');
        return;
    }

    const presupuesto = {
        id: Date.now(),
        fecha: new Date().toLocaleDateString(),
        cliente: serviciosPresupuesto.cliente,
        servicios: [...serviciosPresupuesto],
        total: serviciosPresupuesto.reduce((suma, servicio) => suma + servicio.total, 0)
    };

    historialPresupuestos.push(presupuesto);
    guardarEnLocalStorage();
    mostrarHistorial();
    
    serviciosPresupuesto = [];
    mostrarServicios();
    calcularTotal();
    
    mostrarNotificacion('Presupuesto guardado correctamente en el historial', 'success');
}

function mostrarHistorial() {
    const historial = document.getElementById('historial');
    
    if (historialPresupuestos.length === 0) {
        historial.innerHTML = '<p class="mensaje-vacio">No hay presupuestos guardados</p>';
        return;
    }
    let html = '';
    
    historialPresupuestos.forEach((presupuesto, index) => {
        html += `
            <div class="presupuesto-guardado">
                <div class="presupuesto-header">
                    <div>
                        <strong>Cliente: ${presupuesto.cliente}</strong>
                        <div class="presupuesto-fecha">Fecha: ${presupuesto.fecha}</div>
                        <div>Servicios: ${presupuesto.servicios.length}</div>
                    </div>
                    <div>
                        <div class="presupuesto-total">$${presupuesto.total.toFixed(2)}</div>
                        <button class="btn-eliminar-presupuesto" onclick="eliminarPresupuesto(${index})">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    historial.innerHTML = html;
}