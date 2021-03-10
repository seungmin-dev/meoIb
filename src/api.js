import axios from "axios";

const api = axios.create({
    baseURL : "https://api.openweathermap.org/data/2.5",
});

export const weatherApi = (lat, lon) => api.get(`weather?lat=${lat}&lon=${lon}&appid=77371d8edaa624e1334298cf740c7bce&units=metric`);