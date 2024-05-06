import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data"
import styles from './Form.module.css'
import {SearchType} from '../../types/index'
import Alert from "../Alert/Alert"

type FormProps = {
    fechtWeather: (search: SearchType) => Promise<void>
}


const Form = ({fechtWeather} : FormProps) => {

    //state de la busqueda
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country : ''
    })
    //state para el alerta

    const [alert, setAlert] = useState('')

    //Onchange
    const handleChange = ( e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if(Object.values(search).includes('')){
                setAlert("Tienes espacios Vacios")
                return
            } 
            
            fechtWeather(search)
            
    }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
        {alert && <Alert>{alert}</Alert>}

      <div className={styles.field}>
        <label htmlFor="city">Cuidad:</label>
        <input 
        type="text"
        id='city'
        name = 'city'
        placeholder='Cuidad'
        onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select name="country" id="country"  onChange={handleChange}>
         <option value="">--Selecione un Pais--</option>
          {countries.map(countrie => (
            <option
            key={countrie.code}
            value={countrie.code}
            >{countrie.name}</option>
          ))}
          </select>
      </div>

      <input  className = {styles.submit}type="submit" value={'Consultar Clima'} />
    </form>
  )
}

export default Form
