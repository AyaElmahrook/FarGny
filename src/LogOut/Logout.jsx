import React from 'react'
import { Link } from 'react-router-dom'

export default function Logout({getToken}) {
    function handelLogOut(){
       localStorage.removeItem("token");
       getToken();
    }
  return (
    <Link to="/login" onClick={handelLogOut} className="nav-link">
                    Log out
                  </Link>
  )
}
