import { useState, useEffect } from "react"
import Header from "./components/Header"
import ListadoGatos from "./components/ListadoGatos"
import Filtros from "./components/Filtros"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from "./components/Modal"
import { uniqueId } from "./helpers/formatFunction"

function App() {
  const [presupuesto, setPresupuesto] = useState(+(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')  ? JSON.parse(localStorage.getItem('gastos')) : [])

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([]) 
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
      setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    if(filtro){

      const gastosFilter = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFilter)
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = +(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }

  }, []);

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizdos = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizdos)
      setGastoEditar({})
    }else{
      gasto.id = uniqueId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])

    }

    setTimeout(() => {
      setAnimarModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastoActuaizado = gastos.filter((gasto) => gasto.id !== id)
    setGastos(gastoActuaizado)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      /> 
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro}/>
            <ListadoGatos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal 
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}
      
    </div>
  )
}

export default App
