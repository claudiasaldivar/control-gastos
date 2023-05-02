import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { formatPresupuesto } from '../helpers/formatFunction'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGasto = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGasto

        //Calculo de porcentaje
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        
        setGastado(totalGasto)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos]);

    const handleResetApp = () => {
        const resultado = confirm('Deseas resetear todos los datos almaceados?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={() => handleResetApp()}>Resetear app</button>
            <p>
                <span>Presupuesto:</span> {formatPresupuesto(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''} `}>
                <span>Disponible:</span> {formatPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formatPresupuesto(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto