import axios from "axios";
import * as types from './actionType'; 
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser=(newUser,navigate)=>async dispatch=>{
    try {
        await axios.post("/api/users/register",newUser);
        navigate('/login');
        dispatch({
            type:types.GET_ERRORS,
            payload:{}
        })

    } catch (err) {
        dispatch({
            type:types.GET_ERRORS,
            payload:err.response.data
        })
    }
}


export const login = LoginRequest => async dispatch => {
    try {
      // post => Login Request
      const res = await axios.post("/api/users/login", LoginRequest);
      // extract token from res.data
      const { token } = res.data;
      // store the token in the localStorage
      localStorage.setItem("jwtToken", token);
      // set our token in header ***
      setJWTToken(token);
      // decode token on React
      const decoded = jwt_decode(token);
      // dispatch to our securityReducer
      dispatch({
        type: types.SET_CURRENT_USER ,
        payload: decoded
      });
    } catch (err) {
      dispatch({
        type:types.GET_ERRORS ,
        payload: err.response.data
      });
    }
  };


  export const logout=()=>dispatch=>{
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
      type: types.SET_CURRENT_USER ,
      payload: ""
    });

  }