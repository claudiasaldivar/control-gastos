import { useState, useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar gastos</label>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                <option value=''>-- Seleccione --</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='gasto'>Gastos Varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='casa'>Casa</option>
                    <option value='salud'>Salud</option>
                    <option value='subscripciones'>Subscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros