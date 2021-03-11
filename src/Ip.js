import React, {useState} from "react";
import {userIpApi} from "./api";

const Ip = () => {
    // $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=<your_api_key>', function(data) {
    //     console.log(JSON.stringify(data, null, 2));
    // });

   // var data = JSON.stringify(data, null, 2);
    const [init, setInit] = useState(false);
    const [userIp, setUserIp] = useState("");
    fetch(
        `https://api.ipdata.co/?api-key=1ab80a79ea5f35a9d21e9b64415a3e1a08f30b0118f7f44223247e24`
    ).then(function(response) {
        return response.json()
    }).then(function(json) {
        setInit(true);
        setUserIp({ip:json.ip});
    });
    return (
        <>
            {userIp ? <span>{setUserIp.ip}</span> : "Can't get user's Ip" }
        </>
    )
}

export default Ip;