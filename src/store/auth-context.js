import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  // for better autocomplete IDE
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
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

    if (storedUsedLoggedInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
