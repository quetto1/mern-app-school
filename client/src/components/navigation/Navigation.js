import "./Navigation.css";
import home from "../../img/home.png"

const Navigation = () => {


    return (
        <div className="navigation-wrapper">
            <div className="logo-wrapper">
                   <a href="/"><img src={home} alt="" className="logo-img" /></a> 
                   <a href="/"> <div className="logo-title">Home</div></a> 
            </div>
            {/* make register only visable for unlogged people and Login for Logged in users? Probably different solution for that later  */}
            <div className="navigation-links-wrapper">
                <div>Login</div>
                <div>Register</div>
                <div>Add Wish</div>
                <div></div>
            </div>
        </div>
    )

}

export default Navigation;