import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


function Landing() {

    const navigate=useNavigate();
    const validToken=useSelector(state=>state.security.validToken);

    useEffect(() => {
        if(validToken)
        navigate("/dashboard")
    
     
    }, [validToken])


  return (
    <div className="landing">
    <div className="light-overlay landing-inner text-dark">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">Personal Kanban Tool</h1>
                    <p className="lead">
                        Create your account to join active projects or start you own
                    </p>
                    <hr />
                    <Link className="btn btn-lg btn-primary mr-2" to="/register">
                        Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default Landing