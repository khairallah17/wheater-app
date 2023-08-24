import { API_KEY } from "@env"
import axios from "axios"

const locationEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`
const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params. days}&aqi=no&alerts=no`

const apiCall = async (endpoint) => {
    const option = {
        method: "GET",
        url: endpoint
    }

    try {
        const { data } = await axios.request(option)
        return data
    } catch (error) {
        console.log("Error: ", error)
        return null
    }
}

export const fetchWeatherForcast = (params) => {
    return apiCall(forecastEndpoint(params))
}

export const fetchLocations = (params) => {
    return apiCall(locationEndpoint(params))
}
