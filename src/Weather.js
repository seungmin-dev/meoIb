import { render } from "@testing-library/react";
import React, {useState} from "react";
import {weatherApi} from "./api";

const Weather = ({coords}) => {
    console.log('weather coords:',coords);
    // 위도 경도 apiKey 보내기
    const [weather, setWeather] = useState(false);
    const [temps, setTemps] = useState(false);
    setWeather(true);
    //const {main : {temp}} = await weatherApi(coords.lat, coords.lon);
    const getWeather = async () => {
        const {main} = await weatherApi(coords.lat, coords.lon);
        console.log('main:', main);
        setTemps(true);
    }

    return (
        <>
            {setWeather ? `The weather is like` : `can't access the temperature`};
        </>
    )
}

export default Weather;