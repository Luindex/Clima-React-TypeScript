import { Weather } from "../../Hooks/useWeather"
import styles from './WeatherDetail.module.css'
import { FormatTemp } from "../../helpers"

type WeatherDetailProps = {
    weather : Weather
}

const WeatherDetail = ({weather} : WeatherDetailProps) => {
  return (
    <div className={styles.container}>
      <h1>Clima de : {weather.name}</h1>
      <p className={styles.current}>{FormatTemp(weather.main.temp)}&deg; C</p>
      <div className={styles.temperatures}>
        <p>Max: <span>{FormatTemp(weather.main.temp_max)}&deg; C</span></p>
        <p>Min: <span>{FormatTemp(weather.main.temp_min)}&deg; C</span></p>
      </div>
    </div>
  )
}

export default WeatherDetail
