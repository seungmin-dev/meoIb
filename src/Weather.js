import React, {useEffect, useState} from "react";
import {weatherApi} from "./api";

const Weather = ({coords}) => {
    // 위도 경도 apiKey 보내기
    const [api, getApi] = useState(false);
    const [weatherObj, setWeatherObj] = useState(null);
    const getWeather = async () => {
        const {data} = await weatherApi(coords.lat, coords.lon);
        setWeatherObj({
            regieon : data.name,
            temp : data.main.temp,
            feels_like : data.main.feels_like,
            weather : data.weather[0].main,
            icon : data.weather[0].icon
        });
        getApi(true);
    }
    useEffect(() => {
        getWeather();
    }, []);
    return (
        <>
        {api ? 
            (
                <><div className="weather_icon_box"><img className="weather_icon" src={`http://openweathermap.org/img/w/${weatherObj.icon}.png`} alt="날씨 아이콘" /></div>
                <span>현재 위치 {weatherObj.regieon}의 기온은 {weatherObj.temp}˚C, 체감은 {weatherObj.feels_like}˚C, 날씨는 {weatherObj.weather}입니다!</span></>
            ) : "Can't get the weather"}
        </>
    )
}

export default Weather;