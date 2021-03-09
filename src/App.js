import { render } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import MapCom from "./Map";
import Weather from "./Weather";

function App() {
  const [init, setInit] = useState(false);
  const [coords, setCoords] = useState("");
  var options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  };
  function success(pos) {
    console.log('pos.coords.latitude:',pos.coords.latitude);

    // setCoords({
    //   lat : pos.coords.latitude,
    //   lon : pos.coords.longitude
    // });
    setCoords(pos.coords.latitude, pos.coords.longitude);
    console.log('coords:',coords);
  }
  function error(err) {
    console.log('error:',err);
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      alert("지도 위치 확인을 허용해주세요!");
      setCoords(null);
    }
    setInit(true);
  }, []);
  return (
    <div className="App">
      <MapCom />
      {/* {init ? <Weather lat={coords.lat} lon={coords.lon} /> : "Initializing..."} */}
    </div>
  );
}

export default App;
