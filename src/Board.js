import React, {useState, useEffect} from "react"
import {dbService, authService} from "./fbase";
import Create from "./Create";
import Content from "./Content";
import phoneImg from "./assets/mockup.png";
import Authform from "./Authform";
import logoImg from "./assets/meoib_logo.png";
import {userIpApi} from "./api";

const Board = ({coords}) => {
    const [content, setContent] = useState([]);
    const [ip, setIp] = useState("");
    const [creating, setCreating] = useState(false);
    const [auth, setAuth] = useState(false);

    console.log('auth : ',auth);

    const onClickCreate = (event) => {
        setCreating(true);
        console.log('creating : ', creating);
        if(!auth) { 
            // 익명으로 로그인되어있지 않을 때
            //익명으로 로그인
        console.log('auth : ',auth);
        } else {

        }
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
    return (
        <>
        <div className="container">
            <div className="phoneWrap">
                <div className="phone" style={{backgroundImage:"url(" + phoneImg + ")"}}></div>
                <div className="inner__phone"></div>
            </div>
            <div sytle={{marginTop : 30}} className="inner__container">
                <span onClick={onClickCreate} id="btnCreate" style={{cursor:'pointer'}}>알려주기</span>
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
        {/* 로그인이 되어있지 않고 '알려주기'버튼을 클릭했을 때 */}
        {!auth && creating ? <Authform onAuth={()=>setAuth(true)} /> : "" } 
        {auth && creating ? <Create coords={coords} ip={ip} onCreate={() => setCreating(false)} /> : "" }
        </>
    )
}

export default Board;