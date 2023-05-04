import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, HashRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile/Profile';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './ProtectedRoute';
import { UserAuthContextProvider } from "./UserAuthContext";

serviceWorkerRegistration.register();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <HashRouter basename="/">
        <UserAuthContextProvider>
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route  path="/home" element={
              <ProtectedRoute>
              <App />
              </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
          </Routes>
        </UserAuthContextProvider>
      </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );



// root.render(
//   <App />
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
