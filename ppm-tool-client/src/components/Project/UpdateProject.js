import React, { useEffect } from "react";
import { getProject } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createProject } from "../../redux/action";

function UpdateProject() {
  const {project} = useSelector((state) => state.project);
  const errors = useSelector((state) => state.errors.errors);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProject(id, navigate));
  }, []);

  


  const [data, setData] = useState({
    projectName: '',
    description: '',
    start_date: '',
    end_date: '',
    created_At:'',
    projectIdentifier:'',
    updated_At:'',
    id:''


  });

  useEffect(() => {
      setData({ ...project });
  }, [project]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

   

    const newProject = {
      id: project.id, //this must be passed else it will give error to update we pass promary key
      projectName: data.projectName,
      projectIdentifier: data.projectIdentifier,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
    };

    dispatch(createProject(newProject, navigate));
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={
                    "form-control form-control-lg " +
                    (errors.projectName != null ? "is-invalid" : " ")
                  }
                  placeholder="Project Name"
                  name="projectName"
                  value={data.projectName}
                  onChange={inputChangeHandler}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group has-danger">
                <input
                  type="text"
                  className={"form-control form-control-lg "}
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={data.projectIdentifier}
                  disabled
                />
              </div>
              <div className="form-group">
                <textarea
                  className={
                    "form-control form-control-lg " +
                    (errors.description != null ? "is-invalid" : " ")
                  }
                  placeholder="Project Description"
                  name="description"
                  value={data.description}
                  onChange={inputChangeHandler}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={
                    "form-control form-control-lg " +
                    (errors.start_date != null ? "is-invalid" : " ")
                  }
                  name="start_date"
                  value={data.start_date}
                  onChange={inputChangeHandler}
                />
                <p>{errors.start_date}</p>
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={
                    "form-control form-control-lg " +
                    (errors.end_date != null ? "is-invalid" : " ")
                  }
                  name="end_date"
                  value={data.end_date}
                  onChange={inputChangeHandler}
                />
                <p>{errors.end_date}</p>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;
