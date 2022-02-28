import React from 'react'
import { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import {createProject} from '../../redux/action';
import { useNavigate } from 'react-router-dom';

function AddProject() {


  const [projectName, setProjectName] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
 
  const dispatch =useDispatch();
  const navigate=useNavigate();

  const errors=useSelector(state=>state.errors.errors);
  


     

  const onSubmit=(e)=>{
    e.preventDefault();
    
    const newProject={
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      start_date: start_date,
      end_date: end_date
    }


   dispatch(createProject(newProject,navigate));
  

    


  }
  
  
  return (
    <div>
   

    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Project form</h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={"form-control form-control-lg " + (errors.projectName!=null?"is-invalid":" ") }
                  placeholder="Project Name"
                  name="projectName"
                  value={projectName}
                  onChange={e=>setProjectName(e.target.value)}
                />
                   {errors.projectName && (
                   <div className="invalid-feedback">{errors.projectName}</div>
                 )}
              </div>
              <div className="form-group has-danger">
                <input
                  type="text"
                  className={"form-control form-control-lg " + (errors.projectIdentifier!=null?"is-invalid":" ") }
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={projectIdentifier}
                  onChange={e=>setProjectIdentifier(e.target.value)}
                />
                 {errors.projectIdentifier && (
                   <div className="invalid-feedback">{errors.projectIdentifier}</div>
                 )}
              </div>
              <div className="form-group">
                <textarea
                  className={"form-control form-control-lg " + (errors.description!=null?"is-invalid":" ") }
                  placeholder="Project Description"
                  name="description"
                  value={description}
                  onChange={e=>setDescription(e.target.value)}
                />
                {errors.description && (
                   <div className="invalid-feedback">{errors.description}</div>
                 )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={"form-control form-control-lg " + (errors.start_date!=null?"is-invalid":" ") }
                  name="start_date"
                  value={start_date}
                  onChange={e=>setStart_date(e.target.value)}
                />
                <p>{errors.start_date}</p>
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={"form-control form-control-lg " + (errors.end_date!=null?"is-invalid":" ") }
                  name="end_date"
                  value={end_date}
                  onChange={e=>setEnd_date(e.target.value)}
                />
                <p>{errors.end_date}</p>
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default AddProject