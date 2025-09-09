async function cargarServicios() {
    try {
        const response = await fetch('servicios.json');
        const data = await response.json();
        serviciosDisponibles = data.servicios;
        llenarSelectServicios();
    } catch (error) {
        mostrarNotificacion('Error al cargar los servicios', 'error');
    }
}