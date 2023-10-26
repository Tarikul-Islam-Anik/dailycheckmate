'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import { WeatherData } from './_weather-data-type';
import WeatherIcons from './weather-icons';
import { Text } from '@radix-ui/themes';

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData>();
  const { coords, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords) {
      const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;
      axios.get(ENDPOINT).then((response) => {
        setWeather(response.data);
      });
    }
  }, [coords]);

  if (!isGeolocationEnabled) {
    return (
      <Text as='span' align='center'>
        Location is not enabled. Please enable location to see weather.
      </Text>
    );
  }

  return weather?.weather[0].main ? (
    <Text size='5' as='span' className='flex items-center space-x-2'>
      <WeatherIcons
        weatherIconId={weather?.weather[0].icon.slice(0, 2) as any}
        className='h-5 w-5'
      />
      <Text as='span'>{`${Math.round(weather?.main.temp - 273.15)}°C`}</Text>
      <Text as='span'>{weather?.weather[0].main},</Text>
      <Text as='span'>
        {weather?.name === '01d' || weather?.name === '01n'
          ? weather?.name
          : weather?.name.split(' ')[0]}
      </Text>
    </Text>
  ) : (
    <Text as='span' align='center' size='5'>
      Loading...
    </Text>
  );
};

export default Weather;
