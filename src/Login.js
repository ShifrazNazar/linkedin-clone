import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  
  // loginToApp
  
  // This method is called when the user clicks the "Sign In" button. It uses Firebase's signInWithEmailAndPassword method to authenticate the user with their email and password. If the authentication is successful, the login action is dispatched with the user's email, uid, display name, and profile URL. If the authentication fails, an error message is displayed.
  const loginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
    };
    
    // register
    
    // This method is called when the user clicks the "Register Now" button. It first checks that the user has entered a full name, as it is required for registration. It then uses Firebase's createUserWithEmailAndPassword method to create a new user with the given email and password. Once the user is created, their display name and profile picture URL are updated using updateProfile, and the login action is dispatched with the user's email, uid, display name, and profile URL. If any of these steps fail, an error message is displayed.
    // The component uses useDispatch from the react-redux library to dispatch the login action with the user's credentials.
    const register = () => {
      if (!name) {
      return alert("Please enter a full name");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <h1>Linked</h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
          alt="Linkedin"
        />
      </div>

      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full name (required if registering)"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          type="text"
          placeholder="Profile pic URL (optional)"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;


