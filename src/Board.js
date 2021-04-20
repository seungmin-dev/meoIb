import React, {useState, useEffect} from "react"
import {dbService, authService, firebaseInstance } from "./fbase";
import Create from "./Create";
import Content from "./Content";
import phoneImg from "./assets/mockup.png";
import Modal from "./Modal";
import useModal from "./UseModal";
const {kakao} = window;

const Board = ({coords}) => {
    const [content, setContent] = useState([]);
    const [ip, setIp] = useState("");
    const [creating, setCreating] = useState(false);
    const [auth, setAuth] = useState(false);
    const [authInfo, setAuthInfo] = useState("");
    const [user, setUser] = useState("");
    const [signOut, setSignOut] = useState(true); // singOut할 때 true
    const {isShowing, toggle} = useModal();
    let [signBtnText, setSignBtnText] = useState("LOG IN");
    let [distance, setDistance] = useState(false);
    const [latlon, setLanlon] = useState(coords);

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
        console.log('click btn signOut : ',signOut);
        console.log('click btn signBtnText : ',signBtnText);
        if(signOut === true && signBtnText === "LOG IN") { // 로그아웃 되어있는 상태
            firebaseInstance.auth().signInAnonymously()
            .then((user) => {
                console.log('logged in user : ',user);
                setAuth(true);
                setSignOut(false);
                setSignBtnText("LOG OUT");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('error Message : ',errorMessage);
            });
        } else if(signOut === false && signBtnText === "LOG OUT") { // 로그인 되어있는 상태
            firebaseInstance.auth().signOut().then(() => {
                console.log("Sign-out successful.");
                // window.location.reload(false);
                setAuth(false);
                setSignOut(true);
                setSignBtnText("LOG IN");
            }).catch((error) => {
                console.log('signOut error : ',error);
            });
        }
    }
    
    const getDistance = (conlat, conlon) => {
        var polyline = new kakao.maps.Polyline({
            path : [
                new kakao.maps.LatLng(latlon.lat, latlon.lon),
                new kakao.maps.LatLng(conlat, conlon)
            ]
        });
        console.log('polyline.getLength():', polyline.getLength());
        
        if(polyline.getLength() <= 2000) {
            setDistance(true)
        } else if(polyline.getLength() > 2000) {
            setDistance(false)
        }
        //return polyline.getLength();
        // 내 위치에서 2km 반경에 있는 사람들의 글만 보이게
    }
    const updateDistance = async (contentArr, Boolean) => {
        await dbService.doc(`ㅁㅇㅇㅇ/${contentArr.id}`).update({
            distance : Boolean
        });
    }
    useEffect(() => {
        content.map(contentArr => {
            var polyline = new kakao.maps.Polyline({
                path : [
                    new kakao.maps.LatLng(latlon.lat, latlon.lon),
                    new kakao.maps.LatLng(contentArr.position.lat, contentArr.position.lon)
                ]
            });
            console.log('polyline.getLength():', polyline.getLength());
            
            if(polyline.getLength() <= 2000) {
                updateDistance(contentArr, true);
            } else if(polyline.getLength() > 2000) {
                updateDistance(contentArr, false);
            }
        });
    }, []);
    return (
        <>
        <div className="container">
            <div className="phoneWrap">
                <div className="phone" style={{backgroundImage:"url(" + phoneImg + ")"}}></div>
                <div className="inner__phone"></div>
            </div>
            <div sytle={{marginTop : 30}} className="inner__container">
                <button id="signOutBtn" onClick={onSignOut}>{signBtnText}</button>
                <button onClick={toggle} className="button-default">
                    <span onClick={onClickCreate} id="btnCreate" style={{cursor:'pointer'}}>
                    알려주기
                    </span>
                </button>
                <div className="contentWrap">
                    <div className="inner__contentWrap">
                        {content.map((contentArr) => {
                                <Content key={contentArr.id} contentArr={contentArr} isOwner={contentArr.uid == user.uid} distance={contentArr.distance} /> 
                            }
                        )}
                    </div>
                </div>
                <span></span>
            </div>
        </div>
        {/* 로그인이 되어있지 않고 '알려주기'버튼을 클릭했을 때 */}
        {!auth && signOut && creating ? <Modal isShowing={isShowing} hide={toggle} onAuth={()=>{ setAuth(true); setAuthInfo(user); setSignOut(false); setSignBtnText("LOG OUT"); }} /> : "" }
        {auth && creating ? <Create coords={coords} user={user} onCreate={() => setCreating(false)} /> : "" }
        </>
    )
}

export default Board;