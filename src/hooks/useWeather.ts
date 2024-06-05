import axios from "axios";
import { SearchType } from "../types";

export default function useWeather() {
    
  const fetchWeather = async (search: SearchType) => {
    const apiId = import.meta.env.VITE_API_KEY;
    try {
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${apiId}`;
      const { data } = await axios(geoUrl);

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}`;
      const { data: weatherResult } = await axios(weatherUrl)


    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather,
  };
}
