import "./loginRoute.css"
import { useState } from "react";
import { authenticateUser, getCookie } from "../../services/taskServices.js";

const LoginRoute = () => {

    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");


      // Listens to the input and updates the login state
  const loginInputHandler = (event) => {
    setUserLogin(event.target.value);
  };

  // Listens to the input and updates the password state
  const passwordAuthorInputHandler = (event) => {
    setUserPassword(event.target.value);
  };

  // store the data in the cookie and
    async function loginData(event) {
      event.preventDefault()
      try {
        const res = await authenticateUser(userLogin, userPassword);
        const resToken = res.data.token
        document.cookie = `token=${resToken}`; 
        console.log(getCookie());
      }
      catch (error){
        if (error.response) {
          const  errorMessage = error.response.data.message;
          alert(errorMessage)
        console.log(error.response.data.message);
        }
      
      }
        // const loginInfo = document.cookie
        // document.cookie = "username=John Doe";
    }

     return(
    <div>    
    <form className="login-from" onSubmit={loginData}>
        <input
        value = {userLogin}
          type="text"
          placeholder="Login"
          required
          max="30"
          min="1"
          onChange={loginInputHandler}
        />
        <input
         value = {userPassword}
          type="password"
          placeholder="Password"
          required
          max="30"
          onChange={passwordAuthorInputHandler}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
        )
}

export default LoginRoute;