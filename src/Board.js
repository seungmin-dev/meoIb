import React, {useState, useEffect} from "react"
import {dbService} from "./fbase";
import Create from "./Create";
import Content from "./Content";
import phoneImg from "./assets/mockup.png";
import logoImg from "./assets/meoib_logo.png";
import {userIpApi} from "./api";

const Board = ({coords}) => {
    const [content, setContent] = useState([]);
    const [ip, setIp] = useState("");
    const [creating, setCreating] = useState(false);
    const [done, setDone] = useState(false);
    let btnCreateValue = "알려주기";
    const onClickCreate = (event) => {
        setCreating(true);
        btnCreateValue = "";
    }
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
    const doneCreate = (creating) => {
        console.log('board creating:', creating);
    }
    return (
        <>
        <div className="container">
            <div className="phoneWrap">
                <div className="phone" style={{backgroundImage:"url(" + phoneImg + ")"}}></div>
                <div className="inner__phone"></div>
            </div>
            <div sytle={{marginTop : 30}} className="inner__container">
                <span onClick={onClickCreate} id="btnCreate" style={{cursor:'pointer'}}>{btnCreateValue}</span>
                <div className="contentWrap">
                    <div className="inner__contentWrap">
                        {content.map(contentArr => 
                            <Content key={contentArr.id} contentArr={contentArr} isOwner={contentArr.ip === ip} />
                        )}
                    </div>
                </div>
                <span></span>
            </div>
        </div>
        {creating ? <Create coords={coords} ip={ip} onCreate={() => setCreating(false)} /> : "" }
        </>
    )
}

export default Board;