import axios from "axios";
import { deleteProject } from "./action";
import * as types from './actionType'


export const addProjectTask = (backlog_id ,project_task,navigate)=> async dispatch=>{

   try {
    await axios.post(`/api/backlog/${backlog_id}`,project_task);
    navigate(`/projectBoard/${backlog_id}`);
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


export const getBacklog=backlog_id=>async dispatch=>{
   try {
     
      const res=await axios.get(`/api/backlog/${backlog_id}`);
    
      dispatch({
         type:types.GET_BACKLOG,
         payload:res.data
      })
   } catch (err) {
      dispatch({
         type: types.GET_ERRORS,
         payload: err.response.data
       });
   }
}


export const getProjectTask =(backlog_id ,pt_id,navigate)=> async dispatch=>{

   try {
   const res= await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);

    
    dispatch({
        type: types.GET_BACKLOG_TASK,
        payload: res.data
      });
   } catch (err) {
navigate("/dashboard");
   }

};


export const updateProjectTask=(backlog_id ,pt_id,project_task, navigate)=>async dispatch=>{
   try {
    await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`,project_task);
      navigate(`/projectBoard/${backlog_id}`);
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
}

 export const deleteProjectTask=(backlog_id,pt_id)=>async dispatch=>{
   if(window.confirm(`You are deleting project task ${pt_id} , this can not be undone`));
   await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`);
   dispatch({
      type: types.DELETE_BACKLOG_TASK,
      payload: pt_id
    });
}