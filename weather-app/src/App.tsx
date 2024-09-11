import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})

  ///////////////////

  const apiKey = '5f792d861bf1ccd73e46a86bd55c3e0b';
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

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

  async function getWeather(city: string): Promise<void> {
      try {
          const response = await fetch(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`);

          // Check if the request was successful
          if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
          }

          const data: WeatherData = await response.json();
          setWeather(data)

          console.log(`Weather in ${data.name}:`);
          console.log(`Temperature: ${data.main.temp}°C`);
          console.log(`Feels like: ${data.main.feels_like}°C`);
          console.log(`Humidity: ${data.main.humidity}%`);
          console.log(`Description: ${data.weather[0].description}`);
      } catch (error) {
          console.error(`Error fetching weather data: ${error}`);
      }
  }

  ///////////////////////

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); //prevent reload
      
      getWeather(city);
  }

  return (
    <>
      <h1>WeatherStation</h1>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="City"
        value={city}
        onChange={(event) => {             
              handleChangeEvent(event)
        }}
        ></input>
        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default App
