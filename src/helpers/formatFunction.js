export const formatPresupuesto = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
     })

}

export const uniqueId = () => {
    const rand = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36)
    return rand+date
}

export const fechaFormat = date => {
   const fecha = new Date(date)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fecha.toLocaleDateString('es-ES', opciones)
}
