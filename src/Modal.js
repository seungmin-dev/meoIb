import React from 'react';
import ReactDOM from 'react-dom';
import {dbService, authService, firebaseInstance} from "./fbase";

const Modal = ({ isShowing, hide, onAuth }) => {
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
    };
    
    return (isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="authBox" >
                    <h4 className="authTitle">익명으로 로그인하고 내 옷차림을 알려주세요!</h4>
                    <button name="authBtn" id="authBtn" onClick={onClickAuth}>익명으로 로그인</button>
                </div>
            </div>
            </div>
    </React.Fragment>, document.body
    ) : null)
};

export default Modal;