import styles from './App.module.css'
import Alert from './Componets/Alert/Alert'
import Spinner from './Componets/Spinner/Spinner'
import WeatherDetail from './Componets/WeatherDetail/WeatherDetail'
import Form from './Componets/form/Form'
import useWeather from './Hooks/useWeather'


function App() {
  
  const {fechtWeather ,weather,existData,loading, notFound} = useWeather()

  return (
    <>
    <h1 className={styles.title}>Buscador de Clima</h1>
    <div className={styles.container}>
      <div>
        <Form fechtWeather = {fechtWeather}/>
      </div>
      <div>
        {loading && <Spinner/> }
        {existData && <WeatherDetail weather = {weather} /> }
        {notFound && <Alert>Cuidad No Encontrada</Alert>}
      </div>
    </div>
    </>
  )
}

export default App
