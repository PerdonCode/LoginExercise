import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // this is not the right way of doing this (big advantage: infinite loop)
  // const storedUsedLoggedInformation = localStorage.getItem("isLoggedIn");
  // bc if we reassign a state the function runs again...
  // so after setIsloggedIn is called the function runs agains and we get an infinite loop 
  // if(storedUsedLoggedInformation ==='1'){
  //   setIsLoggedIn(true);
  // }


  // useffect will run after the whole fuction has run and only if the dependencie had changed
  useEffect(() => {
    const storedUsedLoggedInformation = localStorage.getItem("isLoggedIn");
     
    if(storedUsedLoggedInformation ==='1'){
      setIsLoggedIn(true);
    }
  },[]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // set user to is loged in we dont need useEffect here...
    // but IF the user retreshed te page or leaves and comes back later
    // the user login session is gone and needs to log in again
    // this comes beacause if u use a useState the function is called again and this time 
    // is has nog user login credentials 
    // here comes useEffect in play!
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
