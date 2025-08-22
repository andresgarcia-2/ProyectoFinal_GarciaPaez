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
