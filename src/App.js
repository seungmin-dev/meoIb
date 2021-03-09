import { render } from "@testing-library/react";
import React, {useState} from "react";
import MapCom from "./Map";
import Weather from "./Weather";

function App() {
  const [coords, setCoords] = useState(null);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoords({
        lat : position.coords.latitude,
        lon : position.coords.longitude
      });
    });
  } else {
    alert("지도 위치 확인을 허용해주세요!");
  }
  return (
    <div className="App">
      <MapCom />
      <Weather coords={coords} />
    </div>
  );
}

export default App;
