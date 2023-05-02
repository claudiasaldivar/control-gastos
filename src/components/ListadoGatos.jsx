import React from 'react'
import Gasto from './Gasto'

const ListadoGatos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
        {filtro ? (
          <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'No has gastos en esta categoría' }</h2>
          {gastosFiltrados?.map((gasto) => (
            <Gasto gasto={gasto} key={gasto.id} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} />
        ))}
          </>
        ): (
          <>
          <h2>{gastos.length ? 'Gastos' : 'No has gastos' }</h2>
            {gastos?.map((gasto) => (
            <Gasto gasto={gasto} key={gasto.id} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} />
            ))}
          </>
        )}
    </div>
  )
}

export default ListadoGatos