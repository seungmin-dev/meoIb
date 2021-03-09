import axios from "axios";
const API_KEY = '77371d8edaa624e1334298cf740c7bce';

const api = axios.create({
    baseURL : "https://api.openweathermap.org/data/2.5/weather",
});

export const weatherApi = (lat, lon, API_KEY) => api.get(`/lat=${lat}&lon=${lon}&API_KEY=${API_KEY}&units=metric`);