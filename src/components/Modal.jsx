import { useState, useEffect } from 'react'
import Cerrar from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    }, []);

    const handleOcultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
          }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if([nombre,cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('') 
            }, 3000);
            return
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
        handleOcultarModal()
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={Cerrar}
                alt="Cerrar modal"
                onClick={handleOcultarModal}
            />
        </div>
        <form className={`formulario ${animarModal ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>
            <legend>
                {gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
            </legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor='nombre'>Nombre Gasto</label>
                <input 
                    id='nombre'
                    type="text"
                    placeholder='Añade nombre del gasto'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label htmlFor='cantidad'>Añade la cantidad del Gasto</label>
                <input 
                    id='cantidad'
                    type="number"
                    placeholder='Añade cantidad del gasto, ej: 300'
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                />
            </div>
            <div className='campo'>
                <label htmlFor='categoria'>Categoría</label>
                <select id='categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
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
            <input 
                type="submit"
                value={gastoEditar.nombre ? 'Editar gasto' : "Añadir gasto"}
            />
            
        </form>
    </div>
  )
}

export default Modal