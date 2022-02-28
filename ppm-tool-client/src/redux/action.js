import axios from "axios";
import * as types from "./actionType";

export const createProject = (project, navigate) => async dispatch => {
    try {
      const res = await axios.post("/api/project", project);
      navigate("/dashboard");
      dispatch({
        type: types.GET_ERRORS,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    }
  };


export const getProjects=()=> async dispatch =>{

  
    const res=await axios.get("/api/project/all");
    
    dispatch({
      type:types.GET_PROJECTS,
      payload:res.data
    })
 
};

export const getProject=(id,navigate)=>async dispatch=>{

  try {
    const res=await axios.get(`/api/project/${id}`);
   dispatch({
     type:types.GET_PROJECT,
     payload:res.data
   });
  } catch (error) {
    navigate("/dashboard")
  }
  
}

export const deleteProject=id=>async dispatch=>{
  await axios.delete(`/api/project/${id}`);
  dispatch({
    type:types.DELETE_PROJECT,
    payload:id
  })
}