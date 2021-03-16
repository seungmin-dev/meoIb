import axios from "axios";

const api = axios.create({
    baseURL : "https://api.openweathermap.org/data/2.5",
});

export const weatherApi = (lat, lon) => api.get(`weather?lat=${lat}&lon=${lon}&appid=77371d8edaa624e1334298cf740c7bce&units=metric`);
// export const userIpApi = () => `https://api.ipdata.co/?api-key=1ab80a79ea5f35a9d21e9b64415a3e1a08f30b0118f7f44223247e24`;
export const userIpApi = () => `https://api.ip.pe.kr/`;