import { useState, useEffect } from "react";
const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    humidity: "",
    wind: "",
    maxTemperature: "",
    minTemperature: "",
    time: "",
    cloudPercentage: "",
    longitude: "",
    latitude: "",
  });
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({ state: true, message: "Fetching weather data..." });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );
      if (!response.ok) {
        const errorMassage = `An error has occured: ${response.status}`;
        throw new Error(errorMassage);
      }
      const data = await response.json();
      const updatedWeatherData = {
        ...weatherData,
        location: data?.name,
        climate: data?.weather[0]?.main,
        temperature: data?.main?.temp,
        humidity: data?.main?.humidity,
        wind: data?.wind?.speed,
        maxTemperature: data?.main?.temp_max,
        minTemperature: data?.main?.temp_min,
        time: data?.dt,
        cloudPercentage: data?.clouds?.all,
        longitude: longitude,
        latitude: latitude,
      };
      setWeatherData(updatedWeatherData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    setLoading({ state: true, message: "Finding your location..." });
    navigator.geolocation.getCurrentPosition(function (position) {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    });
  }, []);
  return { weatherData, loading, error };
};
export default useWeather;
