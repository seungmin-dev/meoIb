import React, {useEffect, useState} from "react";
import { dbService, storageService } from "./fbase";

const Content = ({key, contentArr, isOwner}) => {
    const [editting, setEditting] = useState(false);
    const [newContent, setNewContent] = useState(contentArr.content);
    let d = new Date();
    let day = d.getDay();
    let dayKor = "";
    if (contentArr.day !== day) {
        dayKor = "어제 "
    } else {
        dayKor = "오늘 "
    }

    const onChange = (event) => {
        event.preventDefault();
        const {target:{value}} = event;
        setNewContent(value);
    }
    const toggleEdit = () => setEditting((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log({...contentArr});
        await dbService.doc(`ㅁㅇㅇㅇ/${contentArr.id}`).update({
            content : newContent
        });
        setEditting(false);
    }
    const DeleteContent = () => {

    }
    const ReportContent = () => {
        
    }
    return (
        <>
            {editting ? (
                    <>
                    <form className="contentBox" onSubmit={onSubmit}>
                        <input className="" value={newContent} onChange={onChange} name="newContent" placeholder="내용을 수정해주세요"></input>
                        <input type="submit" value="수정완료" className="formBtn" />
                    </form>
                    <button onClick={toggleEdit}>수정취소</button>
                    </>
                )
            :
                <div className="contentBox">
                    <span>랜선친구 {contentArr.randomId}</span>
                    {isOwner ? <><button onClick={toggleEdit}>수정</button><button onClick={DeleteContent}>삭제</button></> : <button onClick={ReportContent}>신고</button>}<br/>
                    <span>{dayKor}{contentArr.time}</span><br/>
                    <span>{contentArr.content}</span>
                </div>
            }
        </>
    )
}

export default Content;
