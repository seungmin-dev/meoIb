import React, {useEffect, useState} from "react";
import {userIpApi} from "./api";

const Ip = () => {
    const [init, setInit] = useState(false);
    const [userIp, setUserIp] = useState("");
    const getApi = async () => {
        function json(url) {
            return fetch(url).then(res => console.log('res:',res));
        }
        json(`https://api.ipdata.co/?api-key=1ab80a79ea5f35a9d21e9b64415a3e1a08f30b0118f7f44223247e24`).then(data => {
            console.log('data:',data);
            setInit(true);
            setUserIp(data.ip);
        });
    }
    useEffect(() => {
        getApi();
        console.log('userIp:',userIp);
    }, []);
    return (
        <>
            {init ? <span>{userIp}</span> : "Can't get user's Ip" }
        </>
    )
}

export default Ip;