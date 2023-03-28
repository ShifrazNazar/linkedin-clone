import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

function App() {

  // The useSelector hook from react-redux is used to retrieve the current user from the global state managed by the userSlice reducer, which is defined in the ./features/userSlice file. The useDispatch hook is also used to dispatch the login and logout actions to the userSlice reducer.
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // The useEffect hook is used to listen for changes in the user's authentication state. When the user is logged in, the login action is dispatched to update the user's information in the global state. When the user logs out, the logout action is dispatched to clear the user's information from the global state.

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  // The return statement renders either the Login component if the user is not logged in, or the Sidebar, Feed, and Widgets components if the user is logged in. The Header component is rendered in both cases.
  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;



