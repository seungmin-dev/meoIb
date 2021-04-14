import React, {useEffect, useState} from "react";
import MapCom from "./Map";
import Weather from "./Weather";
import Board from "./Board";
import Basictool from "./Basictool";
import img01d from "./assets/01d.jpg";
import img01n from "./assets/01n.jpg";

function App() {
  const [coords, setCoords] = useState("");
  const [init, setInit] = useState(false);
  let [bgUrl, setBgUrl] = useState("");
  console.log('bgUrl : ',bgUrl);
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
    <div className="App" style={{backgroundImage:"url(" + img01d + ")"}}>
      <>
      <Basictool />
      {init ?  <MapCom coords={coords} /> : "Can't access geolocation"}
      {init ?  <Weather coords={coords} bgUrl={(url) => setBgUrl(url)} /> : "Can't access geolocation"}
      {init ?  <Board coords={coords} /> : "Can't access geolocation"}
      </>
    </div>
  );
}

export default App;
