import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {deleteProject} from '../../redux/action'

function ProjectItem() {
    const projects=useSelector(state=>state.project.projects);
   const dispatch= useDispatch();
  
   const deleteHandler=(id)=>{
     
    if(window.confirm("Do you want to delete the project"))
    dispatch(deleteProject(id))

   }



  return (

   projects.map(project=>(
    <div className="container" key={project.projectIdentifier}>
    <div className="card card-body bg-light mb-3">
        <div className="row">   
            <div className="col-2">
                <span className="mx-auto">{project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
                <h3>{project.projectName}</h3>
                <p>{project.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
                <ul className="list-group">
                    <Link to={`/projectBoard/${project.projectIdentifier}`}>
                        <li className="list-group-item board">
                            <i className="fa fa-flag-checkered pr-1">Project Board </i>
                        </li>
                    </Link>
                    <Link to={`/updateProject/${project.projectIdentifier}`}>
                        <li className="list-group-item update">
                            <i className="fa fa-edit pr-1">Update Project Info</i>
                        </li>
                    </Link>
                    
                        <li className="list-group-item delete" onClick={()=>deleteHandler(project.projectIdentifier)}>
                            <i className="fa fa-minus-circle pr-1">Delete Project</i>
                        </li>
                    
                </ul>
            </div>
        </div>
    </div>
</div>))
  )
}

export default ProjectItem