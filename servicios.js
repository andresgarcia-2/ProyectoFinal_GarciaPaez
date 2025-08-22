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
