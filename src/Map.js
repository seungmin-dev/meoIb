import React, {useEffect} from "react";
const {kakao} = window;
const geocoder = new kakao.maps.services.Geocoder();

const MapCom = ({coords, region}) => {
    const getContainer = async () => {
        const container = await document.getElementById("map");
        createMap(coords.lat, coords.lon, container);
        searchAddrFromCoords(coords.lon, coords.lat, callback);
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
    
    const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            //var infoDiv = document.getElementById('centerAddr');
            
            for(var i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    // infoDiv.innerHTML = result[i].address_name;
                    console.log('result : ',result[i].address_name);
                    break;
                }
                region(result[1]);
            }
        }   
    }
    const searchAddrFromCoords = (lat, lon, callback) => {
        // 좌표로 행정동 주소 정보를 요청합니다
        const result = geocoder.coord2RegionCode(lat, lon, callback);
    };
    // // 지도에 표시할 원을 생성합니다
    // const circle = new kakao.maps.Circle({
    //     center : new kakao.maps.LatLng(33.450701, 126.570667),  // 원의 중심좌표 입니다 
    //     radius: 2000, // 미터 단위의 원의 반지름입니다 
    //     // strokeWeight: 5, // 선의 두께입니다 
    //     // strokeColor: '#75B8FA', // 선의 색깔입니다
    //     // strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    //     // strokeStyle: 'dashed', // 선의 스타일 입니다
    //     // fillColor: '#CFE7FF', // 채우기 색깔입니다
    //     // fillOpacity: 0.7  // 채우기 불투명도 입니다   
    // }); 

    // // 지도에 원을 표시합니다 
    // circle.setMap(map); 

    useEffect(() => {
        getContainer();
    }, []);

    return(
        <div className="popup">
            <input type="hidden" name="otherLat" id="otherLat" />
            <input type="hidden" name="otherLon" id="otherLon" />
            <div id="map" style={{width:400, height:400, display:"none"}} />
        </div>
    )
};
export default MapCom;