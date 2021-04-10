import React, {useState, useEffect} from "react"
import {dbService, authService, firebaseInstance } from "./fbase";
import Create from "./Create";
import Content from "./Content";
import phoneImg from "./assets/mockup.png";
// import Authform from "./Authform";
import Modal from "./Modal";
import useModal from "./UseModal";
import logoImg from "./assets/meoib_logo.png";

const Board = ({coords}) => {
    const [content, setContent] = useState([]);
    const [ip, setIp] = useState("");
    const [creating, setCreating] = useState(false);
    const [auth, setAuth] = useState(false);
    const [authInfo, setAuthInfo] = useState("");
    const [user, setUser] = useState("");
    const [signOut, setSignOut] = useState(true); // singOut할 때 true

    const {isShowing, toggle} = useModal();
    
    firebaseInstance.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            setUser(user);
        } else {
        }
    });

    const onClickCreate = (event) => {
        setCreating(true);
        console.log('creating : ',creating);
        console.log('auth : ',auth);
        console.log('signOut : ',signOut);
    }
    useEffect(() => {
        dbService.collection("ㅁㅇㅇㅇ").onSnapshot((snapshot) => {
            const contentArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setContent(contentArr);
        })
    }, []);

    const onSignOut = () => {
        firebaseInstance.auth().signOut().then(() => {
            console.log("Sign-out successful.");
            // window.location.reload(false);
            setAuth(false);
            setSignOut(true);
        }).catch((error) => {
            console.log('signOut error : ',error);
        });
    }
    return (
        <>
        <div className="container">
            <div className="phoneWrap">
                <div className="phone" style={{backgroundImage:"url(" + phoneImg + ")"}}></div>
                <div className="inner__phone"></div>
            </div>
            <div sytle={{marginTop : 30}} className="inner__container">
                <button id="signOutBtn" onClick={onSignOut}>LOG OUT</button>
                <button onClick={toggle} className="button-default">
                    <span onClick={onClickCreate} id="btnCreate" style={{cursor:'pointer'}}>
                    알려주기
                    </span>
                </button>
                <div className="contentWrap">
                    <div className="inner__contentWrap">
                        {content.map(contentArr => 
                        //  isOwner={contentArr.ip === ip}
                            <Content key={contentArr.id} contentArr={contentArr} isOwner={contentArr.uid == user.uid} />
                        )}
                    </div>
                </div>
                <span></span>
            </div>
        </div>
        {/* 로그인이 되어있지 않고 '알려주기'버튼을 클릭했을 때 */}
        {!auth && signOut && creating ? <Modal isShowing={isShowing} hide={toggle} onAuth={()=>{ setAuth(true); setAuthInfo(user); setSignOut(false); }} /> : "" }
        {auth && creating ? <Create coords={coords} user={user} onCreate={() => setCreating(false)} /> : "" }
        </>
    )
}

export default Board;