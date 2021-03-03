import React, {useEffect, Component, useState} from "react";
const {kakao} = window;

const MapCom = () => {
    const [mapping, isMapping] = useState(true);
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    console.log('container:',container);
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(35.157588, 129.058822), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    return(
        <div className="popup">
            {mapping && <div id="map" style={{width:400, height:400}} />}
        </div>
    )
};
export default MapCom;