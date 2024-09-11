import { useState, useRef } from 'react'
import './App.css'

function App() {
  // Manage input value using uncontrolled component using a ref
  const cityRef = useRef<HTMLInputElement>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const apiKey = "5f792d861bf1ccd73e46a86bd55c3e0b";
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";

  interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: { description: string }[];
  }

  // function performs asynchronous operations and does not return a value, its return type is Promise<void>
  async function getWeather(city: string): Promise<void> {
    try {
      const response = await fetch(
        `${baseURL}?q=${city}&appid=${apiKey}&units=metric`
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: WeatherData = await response.json();
      setWeather(data);

      console.log(`Weather in ${data.name}:`);
      console.log(`Temperature: ${data.main.temp}°C`);
      console.log(`Feels like: ${data.main.feels_like}°C`);
      console.log(`Humidity: ${data.main.humidity}%`);
      console.log(`Description: ${data.weather[0].description}`);
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent reload

    const city = cityRef.current?.value;
    if (city) {
      getWeather(city);
    };
  }

  return (
    <>
      <h1>WeatherStation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="City"
          ref={cityRef}
        ></input>
        <button type="submit">Search</button>
      </form>

      {/* Conditional rendering to check if weather is not null */}
      {weather ? (
        <div>
          <h1>{weather.name}</h1>
          <p>Temperature: {weather.main.temp}K</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
}

export default App
