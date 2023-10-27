import { z } from 'zod';

export const Coord = z.object({
  lon: z.number(),
  lat: z.number(),
});

export const Weather = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.enum([
    '01d',
    '01n',
    '02d',
    '02n',
    '03d',
    '03n',
    '04d',
    '04n',
    '09d',
    '09n',
    '10d',
    '10n',
    '11d',
    '11n',
    '13d',
    '13n',
    '50d',
    '50n',
  ]),
});

export const Main = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  sea_level: z.number(),
  grnd_level: z.number(),
});

export const Wind = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number(),
});

export const Rain = z.object({
  '1h': z.number(),
});

export const Clouds = z.object({
  all: z.number(),
});

export const Sys = z.object({
  type: z.number(),
  id: z.number(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const WeatherData = z.object({
  coord: Coord,
  weather: z.array(Weather),
  base: z.string(),
  main: Main,
  visibility: z.number(),
  wind: Wind,
  rain: Rain,
  clouds: Clouds,
  dt: z.number(),
  sys: Sys,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

export type WeatherData = z.infer<typeof WeatherData>;
