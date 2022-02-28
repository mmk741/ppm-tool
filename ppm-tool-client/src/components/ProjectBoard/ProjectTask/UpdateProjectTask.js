import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectTask,updateProjectTask } from "../../../redux/backlogAction";
import { useParams , Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function UpdateProjectTask() {
  const backlog_data = useSelector((state) => state.backlog.project_task);
  const errors = useSelector((state) => state.errors.errors);
console.log(errors);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backlog_id, pt_id } = useParams();

  const [data, setData] = useState({
    acceptanceCriteria: "",
    dueDate: "",
    priority: "",
    status: "",
    summary: "",
  });

  useEffect(() => {
    dispatch(getProjectTask(backlog_id, pt_id, navigate));
  }, []);

  useEffect(() => {
    setData({ ...backlog_data });
  }, [backlog_data]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      acceptanceCriteria: data.acceptanceCriteria,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status,
      summary: data.summary,
      create_At: backlog_data.create_At,
      id: backlog_data.id,
      projectIdentifer: backlog_data.projectIdentifer,
      projectSequence: backlog_data.projectSequence,
    };
dispatch(updateProjectTask(backlog_id ,pt_id,newProject, navigate))
    
  };

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${backlog_data.projectIdentifer}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">
              Project Name : {backlog_data.projectIdentifer} || Project Code :{" "}
              {backlog_data.projectSequence}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={
                    "form-control form-control-lg " +
                    (errors.summary != null ? "is-invalid" : " ")
                  }
                  name="summary"
                  placeholder="Project Task summary"
                  value={data.summary}
                  onChange={onChangeHandler}
                />
                 {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={data.acceptanceCriteria}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={data.dueDate}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={data.priority}
                  onChange={onChangeHandler}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={data.status}
                  onChange={onChangeHandler}
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
  );
}

export default UpdateProjectTask;
