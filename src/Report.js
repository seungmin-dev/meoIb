import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "./fbase";

const Report = ({onReport, contentArr, onThreeReport}) => {
    let [reportNum, setReportNum] = useState(contentArr.reportNum + 1);
    const onClickReport = async () => {
        alert("신고하시겠습니까? 동일 게시물에 3회 이상 신고가 되면 숨김 처리 됩니다.");
        await dbService.doc(`ㅁㅇㅇㅇ/${contentArr.id}`).update({
            reportNum : reportNum
        });
        onReport(); // report 박스 안보이게 설정
        if(reportNum >= 3) {onThreeReport();}
    }
    return (
        <div className="reportBox">
            <h4>신 고</h4>
            <FontAwesomeIcon className="reportCloseIcon" icon={faTimes} onClick={e => onReport()} />
            <ul>
                <li value="01" onClick={onClickReport}>1. 불쾌함, 욕설, 비하</li>
                <li value="02" onClick={onClickReport}>2. 광고</li>
            </ul>
        </div>
    )
}

export default Report;