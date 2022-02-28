import React, { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import Backlog from './Backlog';
import { useDispatch ,useSelector} from 'react-redux';
import {getBacklog} from '../../redux/backlogAction';


function ProjectBoard() {

  const dispatch=  useDispatch();
 
  const errors=useSelector(state=>state.errors.errors);
  const project_tasks =useSelector(state=>state.backlog.project_tasks);
 

const {id} =useParams();

useEffect(() => {
    dispatch(getBacklog(id));

}, [])

let BoardContent;

const boardAlgorithm = (errors, project_tasks) => {
  if (project_tasks.length < 1) {
    if (errors.projectNotFound) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.projectNotFound}
        </div>
      );
    } else if (errors.projectIdentifier ) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.projectIdentifier}
        </div>
      );
    } else {
      return (
        <div className="alert alert-info text-center" role="alert">
          No Project Tasks on this board
        </div>
      );
    }
  } else {
    return <Backlog project_tasks_prop={project_tasks} />;
  }
};

BoardContent = boardAlgorithm(errors, project_tasks);

  return ( 
    <div className="container">
    <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
    </Link>
    <br />
    <hr />
     {BoardContent}
   

    
</div>
  )
}

export default ProjectBoard