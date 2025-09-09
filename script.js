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