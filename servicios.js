const serviciosData = {
    "pintura-interior": {
        nombre: "Pintura de Interiores",
        precio: 8960,
        descripcion: "Pintura profesional para interiores con materiales de primera calidad"
    },
    "pintura-decorativa": {
        nombre: "Pintura Decorativa", 
        precio: 18.400,
        descripcion: "Técnicas especiales de pintura decorativa y efectos texturizados"
    },
    "microcemento": {
        nombre: "Microcemento",
        precio: 12.328,
        descripcion: "Aplicación de microcemento para superficies modernas y elegantes"
    },
    "empapelado": {
        nombre: "Empapelado",
        precio: 9.856,
        descripcion: "Colocación profesional de papel tapiz con diseños variados"
    },
    "pintura-exterior": {
        nombre: "Pintura de Exteriores",
        precio: 11.200,
        descripcion: "Pintura resistente a la intemperie para fachadas y exteriores"
    }
};

function obtenerServicio(tipoServicio) {
    return serviciosData[tipoServicio];
}

function obtenerTodosLosServicios() {
    return serviciosData;
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

let serviciosPresupuesto = [];

let historialPresupuestos = [];

// Función para agregar servicio al presupuesto
function agregarServicio() {
    try {
        const cliente = document.getElementById('cliente').value.trim();
        const tipo = document.getElementById('servicio').value;
        const metros = parseFloat(document.getElementById('metros').value);

        // Validaciones
        if (!cliente) {
            alert('Por favor ingresa el nombre del cliente');
            return;
        }

        if (!tipo) {
            alert('Por favor selecciona un tipo de servicio');
            return;
        }

        if (!metros || metros <= 0) {
            alert('Por favor ingresa una cantidad válida de metros cuadrados');
            return;
        }

        if (metros > 1000) {
            alert('Los metros cuadrados no pueden exceder 1000 m²');
            return;
        }

        // Crear nuevo servicio
        const nuevoServicio = new Servicio(cliente, tipo, metros);
        serviciosPresupuesto.push(nuevoServicio);

        // Actualizar vista
        mostrarServicios();
        calcularTotal();
        limpiarFormulario();
        alert('Servicio agregado correctamente');

    } catch (error) {
        alert('Error al agregar el servicio: ' + error.message);
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
    const total = serviciosPresupuesto.reduce((suma, servicio)=> {
        return suma + servicio.total;
    },0);

    document.getElementById('total').textContent = total.toFixed(2);
}

function eliminarServicio(index) {
    if(confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
        serviciosPresupuesto.splice(index, 1);
        mostrarServicios();
        calcularTotal();
        alert('Servicio eliminado correctamente')
    }
}

function editarServicio(index) {
    const servicio = serviciosPresupuesto[index];

    document.getElementById('cliente').value = servicio.cliente;
    document.getElementById('servicio').value = servicio.tipo;
    document.getElementById('metros').value = servicio.metros;
    
    eliminarServicio(index);
}

function limpiarFormulario() {
    document.getElementById('metros').value = '';
    document.getElementById('servicio').value = '';
}

function limpiarTodo() {
    if (serviciosPresupuesto.length === 0) {
        alert('No hay servicios para limpiar');
        return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar todos los servicios del presupuesto?')) {
        serviciosPresupuesto = [];
        mostrarServicios();
        calcularTotal();
        alert('Presupuesto limpiado correctamente');
    }
}