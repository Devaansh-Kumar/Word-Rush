import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PrivateRoute(props) {
    const {Component} = props
    const navigate = useNavigate();
    useEffect(() => {
      let token = localStorage.getItem('token');
      if(!token) {
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