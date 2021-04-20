import React, {useEffect, useState} from "react";
import { dbService } from "./fbase";
import Report from "./Report";

const Content = ({contentArr, isOwner}) => {
    const [editting, setEditting] = useState(false);
    const [newContent, setNewContent] = useState(contentArr.content);
    const [report, setReport] = useState("");
    const [visible, setVisible] = useState(false);
    let [distance, setDistance] = useState(contentArr.distance);
    console.log('Content distance : ', contentArr.distance);

    let d = new Date();
    let day = d.getDay();
    let dayKor = "";
    if (contentArr.day !== day) {
        dayKor = "어제 "
    } else {
        dayKor = "오늘 "
    }

    useEffect(() => {
        if(contentArr.reportNum >= 3) {setVisible(true);}
        else {}
    }, []); 

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
    return (<>
        {distance ? (
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
                // visible이 false이면 보여주고 true이면 숨기기
                (!visible ? <div className="contentBox"> 
                    <p className="content__owner">랜선친구 {contentArr.randomId}</p>
                    <div className="formBtnBox">
                        {isOwner ? 
                        <>
                            <button onClick={toggleEdit} className="formBtn">수정</button>
                            <button onClick={DeleteContent} className="formBtn">삭제</button>
                        </> 
                        : 
                            <button onClick={()=>setReport(true)} className="formBtn">신고</button>
                        }
                    </div>
                    <p className="content__text">{contentArr.content}</p>
                    <p className="content__time">{dayKor}{contentArr.time}</p>
                    {/* onSaveReport={(reportNum) => setCurrentReportNum(reportNum)}  */}
                    {report ? <Report report={report} contentArr={contentArr} onReport={() => setReport(false)} onThreeReport={() => setVisible(true)} /> : ""}
                </div> : 
                <div className="contentBox">
                    <h4>해당 게시물은 신고를 3번 이상 받아 숨김처리 되었습니다.</h4>
                </div>)
            }
        </>
        ) : ""}
        </>
    )
}

export default Content;
