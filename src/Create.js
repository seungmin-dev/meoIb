import { dbService } from "./fbase";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Ip from "./Ip";
import {userIpApi} from "./api";

const Create = ({coords, ip, onCreate}) => {
    const [content, setContent] = useState("");
    const [creating, setCreating] = useState(false);
    <Ip />
    const onSubmit = async (event) => {
        event.preventDefault();
        let d = new Date();
        let day = d.getDay(); // 시
        let hours = d.getHours(); // 시
        let minutes = d.getMinutes();  // 분
        let ampm = "";
        if(hours < 13) {
            ampm = "오전"
        } else {
            ampm = "오후";
            hours -= 12;
        }
        const contentObj = {
            ip : ip,
            content : content,
            position : coords,
            // town : "", 지도api로 동네를 알아낼 수 있나..? => 네이버 api는 가넝
            timestamp : Date.now(),
            time : ampm+" " + hours+"시 "+minutes+"분",
            randomId : Math.floor(Math.random() * 101),
            day : day,
            dayKor : "오늘"
        }
        console.log('contentObj:', contentObj);

        await dbService.collection("ㅁㅇㅇㅇ").add(contentObj).then((docRef) => {console.log('docRef id:', docRef.id)});
        setContent("");
        onCreate();
    }
    const onChange = async (event) => {
        const {target:{value}} = event;
        setContent(value);
    }
    return (
        <div className="bgCover">
            <div className="boardBox">
                <form className="board" onSubmit={onSubmit}>
                    <FontAwesomeIcon className="boardCloseIcon" icon={faTimes} onClick={e => onCreate()} />
                    <h3 className="boardTitle">난 오늘 이렇게 입었어!</h3>
                    <input className="boardInput" type="text" placeholder="오늘 날씨에 맞는 옷차림을 알려주세요!" value={content} required autoFocus onChange={onChange} />
                    <input type="submit" value="알려주기" className="formBtn btnCreate" />
                </form>
                {/* <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button> */}
            </div>
        </div>
    )
}

export default Create;
