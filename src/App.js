import { render } from "@testing-library/react";
import React, {useState} from "react";
import MapCom from "./Map";
import Weather from "./Weather";

function App() {
  const [coords, setCoords] = useState("");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
      setCoords({
        lat, lon
      });
    });
  } else {
    alert("지도 위치 확인을 허용해주세요!");
  }
  return (
    <div className="App">
      <MapCom />
      {/* <MapCom lat={this.coords} lon={this.coords.lon} /> */}
      <Weather lat={coords.lat} lon={coords.lon} />
    </div>
  );
}

export default App;
