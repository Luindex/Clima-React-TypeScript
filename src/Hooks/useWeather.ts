import { useMemo, useState } from "react";
import { SearchType } from "../types";
import axios from "axios";
import z from 'zod'

//typar el resultado de la API con zod
const Weather = z.object({
    name : z.string(),
    main : z.object({
        temp : z.number(),
        temp_max : z.number(),
        temp_min : z.number()
    })
})

export type Weather = z.infer<typeof Weather>

//State inicial 
const initialState = {
    name : '',
        main : {
            temp :0,
            temp_max : 0,
            temp_min : 0
        }   
}



export default function useWeather(){

    //state
    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fechtWeather = async (search : SearchType) => {

        const ApiID = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        try {
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${ApiID}` //Primer llamado a la API
            const {data} = await axios(geoURL)
            
            if(!data[0]){
                setNotFound(true)
                return
            }
            //lat & lon
            const lat = data[0].lat
            const lon = data[0].lon
            
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiID}`
            const {data : weatherResult} = await axios(weatherURL)
            
            //zod
            const result = Weather.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const existData = useMemo(() => weather.name, [weather])
    
    return{
        weather,
        existData,
        loading,
        notFound,
        fechtWeather
    }
    
}