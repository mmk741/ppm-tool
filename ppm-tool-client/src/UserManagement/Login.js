import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {login} from '../redux/securityAction';
import { useNavigate } from 'react-router-dom';



function Login() {
 
    const dispatch=useDispatch();
const navigate=useNavigate();
    const validToken= useSelector(state=>state.security.validToken);

    const errors=useSelector((state) => state.errors.errors);

useEffect(() => {
    if(validToken)
    navigate("/dashboard")

 
}, [validToken])


   
    
    const [data, setData] = useState({
        username:"",
        password:""
    })



const onChangeHandler=e=>{
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
}

    const submitHandler=e=>{
        e.preventDefault();

        const loginUser={
            username:data.username,
        password:data.password
        }
        dispatch(login(loginUser))
    }


  return (
    <div className="login">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type="email"  className={
                    "form-control form-control-lg " +
                    (errors.username != null ? "is-invalid" : " ")
                  } placeholder="Email Address" name="username"
                        value={data.username} onChange={onChangeHandler}
                         />

{errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}

                    </div>
                    <div className="form-group">
                        <input type="password"  className={
                    "form-control form-control-lg " +
                    (errors.password != null ? "is-invalid" : " ")
                  } placeholder="Password" name="password" 
                            value={data.password} onChange={onChangeHandler}
                        />
                         {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login