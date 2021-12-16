import "./Navigation.css";
import home from "../../img/home.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  //Check if the users is logged in by checking the cookie
  const onLogOut = () => {
    if (document.cookie === "") {
      alert("You are currently logged out.");
    } else {
      //deletes all the cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      alert("Logout successful!");
    }
  };

  return (
    <div className="navigation-wrapper">
      <div className="logo-wrapper">
        <a href="/">
          <img src={home} alt="" className="logo-img" />
        </a>
        <a href="/">
          {" "}
          <div className="logo-title">Home</div>
        </a>
      </div>
      <div className="navigation-links-wrapper">
        <div>
          <Link to={"/add-wish-route"}>Add Wish</Link>
        </div>
        <div>
          <Link to={"/login-route"}>Login</Link>
        </div>
        <div onClick={onLogOut}>Logout</div>
      </div>
    </div>
  );
};

export default Navigation;
