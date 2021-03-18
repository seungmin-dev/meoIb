import React, {useState, useEffect} from "react"
import {dbService} from "./fbase";
import Create from "./Create";
import Content from "./Content";
import {userIpApi} from "./api";

const Board = ({coords}) => {
    const [content, setContent] = useState([]);
    const [ip, setIp] = useState("");
    function json(url) {
        return fetch(url).then(res => res.json());
    }
    json(`https://api.ipdata.co?api-key=1ab80a79ea5f35a9d21e9b64415a3e1a08f30b0118f7f44223247e24`).then(data => {
        setIp(data.ip);
    });
    useEffect(() => {
        dbService.collection("ㅁㅇㅇㅇ").onSnapshot((snapshot) => {
            const contentArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setContent(contentArr);
        })
    }, []);
    return (
        <div className="container">
            <div sytle={{marginTop : 30}}>
                <Create coords={coords} ip={ip} />
                {content.map(contentArr => 
                    <Content key={contentArr.id} contentArr={contentArr} isOwner={contentArr.ip === ip} />
                )}
                <span></span>
            </div>
        </div>
    )
}

export default Board;