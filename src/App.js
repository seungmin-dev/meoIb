import React, {useEffect, useState} from "react";
import MapCom from "./Map";
import Weather from "./Weather";
import Board from "./Board";
import Basictool from "./Basictool";
import img01d from "./assets/01d.jpg";
import img01n from "./assets/01n.jpg";
import img02d from "./assets/02d.jpg";
import img03d from "./assets/03d.jpg";
import img04d from "./assets/04d.jpg";

function App() {
  const [coords, setCoords] = useState("");
  const [init, setInit] = useState(false);
  let [bgName, setBgName] = useState("");
  let [bgUrl, setBgUrl] = useState("");
  let bgAddr = "";
  useEffect(() => {
    if(bgName != "" ) {
      let module = require(`./assets/${bgName}.jpg`);
      bgAddr = module.default;
      setBgUrl(`url(${bgAddr})`);
    } else {
      console.log('bgName is NULL');
    }
  }, [bgName])
  // let bgUrl = "";
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
    <div className="App" style={{backgroundImage:bgUrl}} >
      <>
      <Basictool />
      {init ?  <MapCom coords={coords} /> : "Can't access geolocation"}
      {init ?  <Weather coords={coords} bgName={(url) => setBgName(url)} /> : "Can't access geolocation"}
      {init ?  <Board coords={coords} /> : "Can't access geolocation"}
      </>
    </div>
  );
}

export default App;
