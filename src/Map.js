import React, {useEffect, Component, useState} from "react";
const {kakao} = window;

const MapCom = () => {
    const [mapping, isMapping] = useState(true);
    const getContainer = async () => {
        const container = await document.getElementById("map");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                    console.log(lat, lon);
                setTimeout(createMap, 1000, lat, lon, container);
            });
        } else {
            var lat = '37.57598282289137';
            var lon = '126.97680910426234';
            setTimeout(createMap, 1000, lat, lon, container);
        }
    };

    const createMap = (lat, lon, container) => {
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        console.log('createOptions:',options);
        const map = () => { //지도 생성 및 객체 리턴
            new kakao.maps.Map(container, options);
        };
        // const center = {
        //     lat : lat, lon : lon
        // };
        // const circle = () => {
        //     new kakao.maps.Circle({
        //         center : center,  // 원의 중심좌표 입니다 
        //         radius: 1000, // 미터 단위의 원의 반지름입니다 
        //         strokeWeight: 5, // 선의 두께입니다 
        //         strokeColor: '#75B8FA', // 선의 색깔입니다
        //         strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //         strokeStyle: 'dashed', // 선의 스타일 입니다
        //         fillColor: '#CFE7FF', // 채우기 색깔입니다
        //         fillOpacity: 0.7  // 채우기 불투명도 입니다   
        //     });
        // };
        // setTimeout(circle.setMap(map), 1000); 
    };

    useEffect(() => {
        getContainer();
        //map.setCenter(locPosition); 
    }, []);

    return(
        <div className="popup">
            <div id="map" style={{width:400, height:400}} />
        </div>
    )
};
export default MapCom;