import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

type Weather = z.infer<typeof Weather>;

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const apiId = import.meta.env.VITE_API_KEY;
    try {
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${apiId}`;
      const { data } = await axios(geoUrl);

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}`;
      const { data: weatherResult } = await axios(weatherUrl);

      const result = Weather.safeParse(weatherResult);
      if(result.success) {
        console.log(result.data.name)
        console.log(result.data.main.temp)
      }

    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather,
  };
}
