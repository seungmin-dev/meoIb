import React, {useEffect, useState, useRef} from "react";
import { dbService, storageService } from "./fbase";
import Report from "./Report";

const Content = ({key, contentArr, isOwner}) => {
    const [editting, setEditting] = useState(false);
    const [newContent, setNewContent] = useState(contentArr.content);
    const [report, setReport] = useState(false);
    const contentBox = useRef();
    const reportNum = useRef();

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
        await dbService.doc(`ㅁㅇㅇㅇ/${contentArr.id}`).update({
            content : newContent
        });
        setEditting(false);
    }
    const DeleteContent = async () => {
        const confirm = window.confirm("정말 이 글을 삭제하시겠어요?");
        if(confirm) {
            await dbService.doc(`ㅁㅇㅇㅇ/${contentArr.id}`).delete()
        }
    }
    const toReport = () => {
        setReport(true);
    }
    // if(this.contentBox.reportNum) {
    //     this.
    // }
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
                <div className="contentBox" ref={contentBox}>
                    <p className="content__owner">랜선친구 {contentArr.randomId}</p>
                    <div className="formBtnBox">
                        {isOwner ? 
                        <>
                            <button onClick={toggleEdit} className="formBtn">수정</button>
                            <button onClick={DeleteContent} className="formBtn">삭제</button>
                        </> 
                        : 
                            <button onClick={toReport} className="formBtn">신고</button>
                        }
                    </div>
                    <p className="content__text">{contentArr.content}</p>
                    <p className="content__time">{dayKor}{contentArr.time}</p>
                    <input type="hidden" ref={reportNum} name="reportNum" id="reportNum">{contentArr.report}</input>
                    {report ? <Report report={report} contentArr={contentArr} onReport={() => setReport(false)} /> : ""}
                </div>
            }
        </>
    )
}

export default Content;
