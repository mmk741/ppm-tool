import React, { useState } from 'react'
import { useParams ,Link , useNavigate } from 'react-router-dom'
import { addProjectTask } from '../../../redux/backlogAction';
import { useDispatch ,useSelector } from 'react-redux';

function AddProjectTask() {

    const {id} =useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const errors=useSelector(state=>state.errors.errors);
 
    console.log(errors);
    

    console.log(id);
      const [data, setData] = useState({
        summary: "",
        acceptanceCriteria: "",
        status: "",
        priority: 0,
        dueDate: "",
        projectIdentifier:id,
       
      })

    const onChange=(e)=>{
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    }

    const submitHandler=(e)=>{
        e.preventDefault();

        const newTask={
            summary: data.summary,
            acceptanceCriteria: data.acceptanceCriteria,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate
        };
    dispatch(addProjectTask( id,newTask,navigate));
        console.log(newTask);

    }

  return (
    <div className="add-PBI">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <Link to={`/projectBoard/${id}`} className="btn btn-light">
                    Back to Project Board
                </Link>
                <h4 className="display-4 text-center">Add Project Task</h4>
                <p className="lead text-center">Project Name + Project Code</p>
                <form onSubmit={submitHandler} >
                    <div className="form-group">
                        <input type="text" className={"form-control form-control-lg " + (errors.summary!=null?"is-invalid":" ") } name="summary" placeholder="Project Task summary" 
                            value={data.summary}
                            onChange={onChange}
                        />
                        {errors.summary && ( 
                   <div className="invalid-feedback">{errors.summary}</div>
                 )}
                    </div>
                    <div className="form-group">
                        <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"
                        value={data.acceptanceCriteria}
                        onChange={onChange}
                        ></textarea>
                    </div>
                    <h6>Due Date</h6>
                    <div className="form-group">
                        <input type="date" className="form-control form-control-lg" name="dueDate"
                        value={data.dueDate}
                        onChange={onChange}
                         />
                    </div>
                    <div className="form-group">
                        <select className="form-control form-control-lg" name="priority"
                        value={data.priority}
                        onChange={onChange}
                        >
                            <option value={0}>Select Priority</option>
                            <option value={1}>High</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Low</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select className="form-control form-control-lg" name="status"
                        value={data.status}
                        onChange={onChange}
                        >
                            <option value="">Select Status</option>
                            <option value="TO_DO">TO DO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>

                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default AddProjectTask