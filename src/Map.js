import React, {useEffect, Component, useState} from "react";
import {mapApi} from "./api";
const getApi = async() => {
    const api = await mapApi();
    const {kakao} = window;
    return kakao;
}

const MapCom = () => {
    const [kao, setKao] = useState("");
    const [mapping, isMapping] = useState(true);
    const getContainer = async () => {
        const container = await document.getElementById("map");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                createMap(lat, lon, container);
            });
        } else {
            alert("지도 위치 확인을 허용해주세요!");
        }
    };

    const createMap = (lat, lon, container) => {
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        const map = setTimeout(() => { //지도 생성 및 객체 리턴
            new kakao.maps.Map(container, options);
        }, 1000);

        getDistance(lat, lon);
    };

    const getDistance = (lat, lon) => {
        var polyline = new kakao.maps.Polyline({
            path : [
                new kakao.maps.LatLng(lat, lon),
                new kakao.maps.LatLng(36.365243, 127.436007)
            ]
        });
        console.log('polyline.getLength():', polyline.getLength());
        return polyline.getLength();
        // 내 위치에서 1km 반경에 있는 사람들의 글만 보이게
    }

    useEffect(() => {
        getContainer();
    }, []);

    return(
        <div className="popup">
            <input type="hidden" name="otherLat" id="otherLat" />
            <input type="hidden" name="otherLon" id="otherLon" />
            <div id="map" style={{width:400, height:400}} />
        </div>
    )
};
export default MapCom;