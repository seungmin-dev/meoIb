import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "./fbase";

const Report = ({onReport, contentArr}) => {
    const onClickReport = async () => {
        alert("신고하시겠습니까? 동일 게시물에 3회 이상 신고가 되면 숨김 처리 됩니다.");
        let currentReportNum = "";
        // 신고창의 부모창에 hidden 으로 넣어져있는 reportNum 가져와서 ++1;
        await dbService.doc(`ㅁㅇㅇㅇ/${contentArr.id}`).update({
            report : currentReportNum + 1
        });
        onReport();
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