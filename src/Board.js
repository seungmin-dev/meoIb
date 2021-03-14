import React, {useEffect, useState} from "react";

const Board = () => {
    const [write, setWrite] = useState(false);
    
    // 익명의 ip로 글 쓴 사람 판별(ip 컴포넌트에서 ip값 넘겨오기)
    // 로그인 없이 일단 글 쓸 수 있고
    // 해당 글의 아이피와 접속 아이피가 같으면 수정, 삭제 가능
    // 아니라면 불가능
    // 글 쓰고 아이피, 저장시각, 내용 -> 파이어스토어

    return (
        <div className="board">
            <span className="text"></span>
        </div>
    )
}

export default Board;