import { render } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import MapCom from "./Map";
import Weather from "./Weather";

function App() {
  const [coords, setCoords] = useState("");
  const [init, setInit] = useState(false);
  var options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  };
  function success(pos) {
    setCoords({
      lat : pos.coords.latitude,
      lon : pos.coords.longitude,
      yn : true
    });
  }
  function error(err) {
    console.log('error:',err);
    setCoords({yn : false});
  }
  useEffect(() => {
    // if (navigator.geolocation) {
    //   // navigator.geolocation.getCurrentPosition(success, error, options);
      
    // } 
    // else {
    //   alert("지도 위치 확인을 허용해주세요!");
    // }
    navigator.geolocation.getCurrentPosition((position) => {
      if( position) {
        setCoords({
          lat : position.coords.latitude,
          lon : position.coords.longitude
        });
      } else {
        setCoords(null);
      }
      // setInit(true);
    });
  }, []);
  return (
    <div className="App">
      <>
      <MapCom />
      {init ?  <Weather coords={coords} /> : "Can't access geolocation"}
      </>
    </div>
  );
}

export default App;
