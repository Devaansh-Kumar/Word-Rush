import { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

function PrivateRoute(props) {
    const {Component} = props
    const navigate = useNavigate();
    useEffect(() => {
      let auth = localStorage.getItem('login');
      if(!auth) {
          navigate('/login');
      }
      else{
        navigate('/game');
      }
    })
    return (
      <div>
        <Component />
      </div>
    )
}

export default PrivateRoute;