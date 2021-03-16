import React, {useEffect, useState} from "react";

const Content = ({key, contentArr, isOwner}) => {
    console.log('key:',key);
    console.log('contentArr:',contentArr);
    console.log('isOwner:',isOwner);
    let d = new Date();
    let day = d.getDay();
    let dayKor = "";
    if (contentArr.day !== day) {
        dayKor = "어제 "
    } else {
        dayKor = "오늘 "
    }
    return (
        <>
            <div className="contentBox">
                <span>랜선친구 {contentArr.randomId}</span>
                {isOwner ? <><button>수정</button><button>삭제</button></> : <button>신고</button>}<br/>
                <span>{dayKor}{contentArr.time}</span><br/>
                <span>{contentArr.content}</span>
            </div>
        </>
    )
}

export default Content;
