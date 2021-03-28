import React, {useEffect, useState} from "react";
import MapCom from "./Map";
import Weather from "./Weather";
import Board from "./Board";
import Basictool from "./Basictool";
import url from "./assets/dust_bg.jpg";

function App() {
  const [coords, setCoords] = useState("");
  const [init, setInit] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if( position) {
        setCoords({
          lat : position.coords.latitude,
          lon : position.coords.longitude
        });
      } else {
        setCoords(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <div className="App">
      <>
      <Basictool />
      {init ?  <MapCom coords={coords} /> : "Can't access geolocation"}
      {init ?  <Weather coords={coords} /> : "Can't access geolocation"}
      {init ?  <Board coords={coords} /> : "Can't access geolocation"}
      </>
    </div>
  );
}

export default App;
