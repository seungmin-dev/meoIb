import React, {useEffect} from "react";
const {kakao} = window;
const geocoder = new kakao.maps.services.Geocoder();

const MapCom = ({coords}) => {
    const getContainer = async () => {
        const container = await document.getElementById("map");
        createMap(coords.lat, coords.lon, container);
        searchAddrFromCoords(coords.lat, coords.lon, callback);
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
            }
        }   
    }
    const searchAddrFromCoords = (lat, lon, callback) => {
        // 주소-좌표 변환 객체를 생성합니다
        //지도 생성 및 객체 리턴
        console.log('searchAddrFromCoords');
        const geocoderMaker = async (geocoder) => {
            const result = await geocoder.coord2RegionCode(lat, lon, callback);
            console.log('result : ',result);
        }
        console.log('geocoder : ',geocoder);
        // 좌표로 행정동 주소 정보를 요청합니다
        // const result = await (lat, lon, callback) => {
        //     geocoder.coord2RegionCode(lat, lon, callback);  
        // }
    };

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