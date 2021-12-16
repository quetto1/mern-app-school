import "./Navigation.css";
import home from "../../img/home.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { getCookie } from "../../services/taskServices.js";

const Navigation = () => {
    const onLogOut = () => {
        if (document.cookie === '') {
                alert("You are logged out!")
        }
        else{
            //deletes all the cookies
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            alert("You have been logout!")
        }
        console.log(document.cookie);
    }

    // const LoginButton = () => {
    //     const [userLogin, setUserLogin] = useState(getCookie().token);
    //     const onClick = () => document.cookie = '';
      
    //     return (
    //       <div>
    //         { userLogin 
    //           ? <div><Link to={'/login-route'}>Login</Link></div>
    //           : <div><button onClick={onClick}>Logout</button></div> }
    //       </div>
    //     )
    //         }
    return (
        <div className="navigation-wrapper">
            <div className="logo-wrapper">
                   <a href="/"><img src={home} alt="" className="logo-img" /></a> 
                   <a href="/"> <div className="logo-title">Home</div></a> 
            </div>
            {/* make register only visable for unlogged people and Login for Logged in users? Probably different solution for that later  */}
            <div className="navigation-links-wrapper">
                <div><Link to={'/add-wish-route'}>Add Wish</Link></div>
                <div><Link to={'/login-route'}>Login</Link></div>
                <div><button onClick={onLogOut}>Logout</button></div>
            </div>
        </div>
    )

}

export default Navigation;