import React, {useEffect, useState} from "react";
import {userIpApi} from "./api";

const Ip = () => {
    // $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=<your_api_key>', function(data) {
    //     console.log(JSON.stringify(data, null, 2));
    // });

   // var data = JSON.stringify(data, null, 2);
    const [init, setInit] = useState(false);
    const [userIp, setUserIp] = useState("");
    const getApi = async () => {
        const {data} = await userIpApi();
        console.log('data:',data);
        setInit(true);
        // setUserIp({ip});
    }
    useEffect(() => {
        getApi();
    }, []);
    // fetch(
    //     ``
    // ).then(function(response) {
    //     return response.json()
    // }).then(function(json) {
    //     setInit(true);
    //     setUserIp({ip:json.ip});
    // });
    return (
        <>
            {/* {userIp ? <span>{setUserIp.ip}</span> : "Can't get user's Ip" } */}
        </>
    )
}

export default Ip;