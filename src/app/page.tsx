"use client";


import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  interface WeatherData {
    name: string;
    weather: { description: string }[];
    main: { temp: number; humidity: number };
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "711fe39c9e6835ee50a5e8caff25ed50";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Ciudad no encontrada");
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setWeatherData(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ingresa una ciudad"
          className="border p-2 rounded"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="bg-gray-100 p-4 rounded shadow-lg relative">
          <button
            onClick={() => setWeatherData(null)}
            className="absolute top-2 right-2 text-gray-500"
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold">{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temp: {weatherData.main.temp}°C</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}
