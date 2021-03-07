import { render } from "@testing-library/react";
import React from "react";
import {weatherApi} from "./api";

const Weather = () => {
    // 위도 경도 apiKey 보내기
    const getWeather = async () => {
        console.log('navigator:', navigator.geolocation);
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log('lat:',lat, 'lon:',lon);
        });
        // console.log('lat:',lat, 'lon:',lon);
        // const {main : {temp}} = await weatherApi(lat, lon, API_KEY);
        // console.log('temp:', temp);

    }
    return (
        <span>The weather is like</span>
    )
}

export default Weather;