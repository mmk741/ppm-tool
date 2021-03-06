import React,{useEffect} from 'react'
import CreateProjectButton from './Project/CreateProjectButton'
import ProjectItem from './Project/ProjectItem'
import {getProjects} from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'


function Dashboard() {

  
  const dispatch=useDispatch();
 
  useEffect(() => {
    
   dispatch(getProjects());
    
  }, [])
  

  return (
    <div className="projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Projects</h1>
                    <br />
                    <CreateProjectButton/>
                    <br />
                    <hr />
                    <ProjectItem />

                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard