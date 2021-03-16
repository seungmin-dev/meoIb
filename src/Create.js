import { dbService } from "./fbase";
import React, {useEffect, useState} from "react";
import Ip from "./Ip";

const Create = ({coords}) => {
    const [content, setContent] = useState("");
    const [ip, setIp] = useState("");
    // 익명의 ip로 글 쓴 사람 판별(ip 컴포넌트에서 ip값 넘겨오기)
    // 로그인 없이 일단 글 쓸 수 있고
    // 해당 글의 아이피와 접속 아이피가 같으면 수정, 삭제 가능
    // 아니라면 불가능
    <Ip />
    const onSubmit = async (event) => {
        event.preventDefault();
        let d = new Date();
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
            // town : "", 지도api로 동네를 알아낼 수 있나..?
            timestamp : Date.now(),
            time : "오늘 "+ampm+" " + hours+"시 "+minutes+"분"
        }
        console.log('contentObj:', contentObj);

        await dbService.collection("ㅁㅇㅇㅇ").add(contentObj);
        setContent("");
    }
    const onChange = (event) => {
        function json(url) {
            return fetch(url).then(res => res.json());
        }
        json(`https://api.ipdata.co?api-key=1ab80a79ea5f35a9d21e9b64415a3e1a08f30b0118f7f44223247e24`).then(data => {
            setIp(data.ip);
        });

        const {target:{value}} = event;
        setContent(value);
    }
    return (
        <div className="boardBox">
            <form className="board" onSubmit={onSubmit}>
                <input type="text" placeholder="오늘 날씨에 맞는 옷차림을 알려주세요!" value={content} required autoFocus onChange={onChange} className="formInput" />
                <input type="submit" value="알려주기" className="formBtn" />
            </form>
            {/* <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button> */}
        </div>
    )
}

export default Create;