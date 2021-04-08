import React from "react";
import {dbService, authService, firebaseInstance} from "./fbase";

const Authform = ({onAuth}) => {
    const onClickAuth = (event) => {
        firebaseInstance.auth().signInAnonymously()
        .then((user) => {
            console.log('user1 : ',user);
            onAuth();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error Message : ',errorMessage);
        });
    }
    return (
        <div className="authBox" >
            <h4 className="authTitle">익명으로 로그인하고 내 옷차림을 알려주세요!</h4>
            <button name="authBtn" id="authBtn" onClick={onClickAuth}>익명으로 로그인</button>
        </div>
    )
}

export default Authform;