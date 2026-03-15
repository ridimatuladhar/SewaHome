// import { Navigate } from "react-router-dom";
// import { useEffect, useState, useCallback } from "react";

// const ProtectedRoute = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const SESSION_DURATION = 24 * 60 * 60 * 1000;

//   const resetSessionTimer = useCallback(() => {
//     localStorage.setItem("loginTime", new Date().getTime().toString());
//   }, []);

//   useEffect(() => {
//     const loginStatus = localStorage.getItem("isAdminLoggedIn") === "true";
//     const loginTime = localStorage.getItem("loginTime");
//     const currentTime = new Date().getTime();

//     if (loginStatus && loginTime) {
//       const timeElapsed = currentTime - parseInt(loginTime);
      
//       if (timeElapsed > SESSION_DURATION) {
//         localStorage.removeItem("isAdminLoggedIn");
//         localStorage.removeItem("loginTime");
//         setIsLoggedIn(false);
//       } else {
//         setIsLoggedIn(true);
//         const remainingTime = SESSION_DURATION - timeElapsed;
//         const timeoutId = setTimeout(() => {
//           localStorage.removeItem("isAdminLoggedIn");
//           localStorage.removeItem("loginTime");
//           window.location.reload();
//         }, remainingTime);

//         return () => clearTimeout(timeoutId);
//       }
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [SESSION_DURATION]);

//   // Add activity listeners to reset timer
//   useEffect(() => {
//     if (!isLoggedIn) return;

//     const activities = ['click', 'keypress', 'mousemove', 'scroll'];
//     const handleActivity = () => resetSessionTimer();

//     activities.forEach(event => {
//       window.addEventListener(event, handleActivity);
//     });

//     return () => {
//       activities.forEach(event => {
//         window.removeEventListener(event, handleActivity);
//       });
//     };
//   }, [isLoggedIn, resetSessionTimer]);

//   return isLoggedIn ? children : <Navigate to="/adminlogin" replace />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  console.log("ProtectedRoute check: isLoggedIn =", isLoggedIn); // <- DEBUG
  return isLoggedIn ? children : <Navigate to="/adminlogin" replace />;
};

export default ProtectedRoute;
