import React, {useEffect, useState} from "react";
import {userIpApi} from "./api";

const Ip = () => {
    const [init, setInit] = useState(false);
    const [userIp, setUserIp] = useState("");
    const getApi = async () => {
        const {data} = await userIpApi();
        console.log('ip:',data);
        setInit(true);
        setUserIp(data);
    }
    useEffect(() => {
        getApi();
    }, []);
    return (
        <>
            {init ? <span>{userIp}</span> : "Can't get user's Ip" }
        </>
    )
}

export default Ip;