import React ,{useState,useEffect} from 'react'
import {createNewUser} from '../redux/securityAction'
import { useDispatch , useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


function Register() {

    
    const validToken=useSelector(state=>state.security.validToken);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const errors = useSelector((state) => state.errors.errors);
    console.log(errors);

    useEffect(() => {
        if(validToken)
        navigate("/dashboard")
    
     
    }, [validToken])



const [data, setData] = useState({
    username:"",
    fullName:"",
    password:"",
    confirmPassword:""
})

const changehandler=e=>{
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
}
const submitHandler=(e)=>{
    e.preventDefault();

    const newUser={
        username:data.username,
    fullName:data.fullName,
    password:data.password,
    confirmPassword:data.confirmPassword
    }

    dispatch(createNewUser(newUser,navigate));
}

  return (
    <div className="register">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your Account</p>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type="text"  className={
                    "form-control form-control-lg " +
                    (errors.fullName != null ? "is-invalid" : " ")
                  } placeholder="Name" name="fullName"
                           value={data.fullName} onChange={changehandler}    />
                          
                            {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
                    </div>
                    <div className="form-group">
                        <input type="email" className={
                    "form-control form-control-lg " +
                    (errors.username != null ? "is-invalid" : " ")
                  } placeholder="Email Address" name="username"
                        value={data.username} onChange={changehandler} />

{errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}

                    </div>
                    <div className="form-group">
                        <input type="password" className={
                    "form-control form-control-lg " +
                    (errors.password != null ? "is-invalid" : " ")
                  } placeholder="Password" name="password" 
                            value={data.password} onChange={changehandler}
                        />
 {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}

                    </div>
                    <div className="form-group">
                        <input type="password" className={
                    "form-control form-control-lg " +
                    (errors.password != null ? "is-invalid" : " ")
                  } placeholder="Confirm Password"
                            name="confirmPassword"  value={data.confirmPassword} onChange={changehandler} />
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

export default Register