import './App.css';
import Navbar from './navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './register/Register';
import Login from './login/Login';
import Home from './Home/Home';
import About from './about/About';
import Movies from './movies/Movies';
import Network from './network/Network';
import People from './people/People';
import NotFound from './notFound/NotFound';
import TvShows from './TvShows/TvShows';
import SingleMovie from './SingleMovie/SingleMovie';
import React ,{ useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';


function App() {
  const [token, setToken] = useState(null)
  function getToken() {
    setToken(jwtDecode(localStorage.getItem("token")));
  }
  useEffect(() => {
  if(localStorage.getItem("token")){
    getToken()
  }
  else
  {
    setToken(null);
  }
  }, [])
  
  //console.log(token);
  //console.log(token);
  function ProtectedRoute(props) {
    if (localStorage.getItem("token") === null) {
       return <Navigate to="/login"/>
    } else {
      //navigate to distination
      return props.children;
    }
  }
  return (
    <>
      <Navbar token={token} getToken={getToken}></Navbar>
      <Routes>
        <Route path='' element={<Register />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login getToken={getToken} />} />
        <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='movie' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path='singleMovie/:movieId' element={<ProtectedRoute><SingleMovie /></ProtectedRoute>} />
        <Route path='tv' element={<ProtectedRoute><TvShows /></ProtectedRoute>} />
        <Route path='network' element={<ProtectedRoute><Network /></ProtectedRoute>} />
        <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
