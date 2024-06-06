import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";
import { useMemo, useState } from "react";

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    const apiId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialState);
    try {
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${apiId}`;
      const { data } = await axios(geoUrl);

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}`;
      const { data: weatherResult } = await axios(weatherUrl);

      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNotFound(true);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    notFound,
    fetchWeather,
    hasWeatherData,
    loading,
  };
}
