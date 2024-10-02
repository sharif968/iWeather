import { useEffect, useState } from "react";
const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    temperature: "",
    humidity: "",
    wind: "",
    maxTemperature: "",
    minTemperature: "",
    country: "",
    cloudPercentage: "",
    longitude: "",
    latitude: "",
  });
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (id) => {
      try {
        // setLoading({ state: true, message: "Fetching weather data..." });
        const response = await fetch(
          ` https://freetestapi.com/api/v1/weathers/${id}`
        );
        const data = await response.json();
        console.log("🚀 ~ fetchWeatherData ~ data:", data);

        const updatedWeatherData = {
          city: data?.city,
          country: data?.country,
          condition: data?.weather_description,
          temperature: data?.temperature,
          humidity: data?.humidity,
          wind: data?.wind_speed,
          maxTemperature: data?.temperature,
          minTemperature: data?.temperature,
          cloudPercentage: data?.humidity,
          longitude: data?.longitude,
          latitude: data?.latitude,
        };
        setWeatherData(updatedWeatherData);
        setLoading({ state: false, message: "" });
      } catch (error) {
        console.log("🚀 ~ fetchWeatherData ~ error:", error);
        setError(error);
      } finally {
        setLoading({
          state: false,
          message: "",
        });
      }
    };
    fetchWeatherData(1);
  }, []);

  return { weatherData, loading, error };
};
export default useWeather;
