import React, {useEffect, useState} from "react";
import {weatherApi} from "./api";

const Weather = ({coords, bgName}) => {
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
        // bgName(`img${data.weather[0].icon}`);
        bgName(data.weather[0].icon);
        getApi(true);
    }
    useEffect(() => {
        getWeather();
    }, []);
    return (
        <>
        {api ? 
            (
                <>
                    <div className="weather_box">
                        <div className="weather_icon_box">
                            <img className="weather_icon" src={`http://openweathermap.org/img/w/${weatherObj.icon}.png`} alt="날씨 아이콘" />
                        </div>
                        <p className="weatherText">현재 위치 {weatherObj.regieon}</p>
                        <p className="weatherText">기온 {weatherObj.temp}˚C</p>
                        <p className="weatherText">체감 {weatherObj.feels_like}˚C</p>
                        {/* <p>날씨-{weatherObj.weather}</p> */}
                    </div>
                </>
            ) 
            : 
            "Can't get the weather"
        }
        </>
    )
}

export default Weather;