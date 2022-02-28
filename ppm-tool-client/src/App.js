import './App.css';
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Layout/Header';
import { Route , Routes } from 'react-router-dom';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTask/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './UserManagement/Register';
import Login from './UserManagement/Login';
import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { useDispatch } from 'react-redux';
import {login, logout}  from './redux/securityAction'
import * as types from './redux/actionType';
import store from './redux/store';
import SecureRoutes from './securityUtils/SecureRoutes';

const jwtToken=localStorage.jwtToken;

if( jwtToken)
{
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);
  
  store.dispatch({
    type: types.SET_CURRENT_USER ,
    payload: decode_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decode_jwtToken.exp < currentTime) {
       store.dispatch(logout());
       window.location.href='/login';
  }
}

function App() {


  
  return (
    <div className="App">
    
 
    <Header/> 
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>

   
     <Route  element={<SecureRoutes/>}>
    <Route  path="/dashboard" element={   <Dashboard/>}/>
    <Route  path='/addProject' element={<AddProject/>}/>
    <Route  path='/updateProject/:id' element={<UpdateProject/>}/>
    <Route  path='/projectBoard/:id' element={<ProjectBoard/>}/>
    <Route  path='/addProjectTask/:id' element={<AddProjectTask/>}/>
    <Route  path='/updateProjectTask/:backlog_id/:pt_id' element={<UpdateProjectTask/>}/>
    </Route>

    </Routes>

    </div>
  );
}

export default App;
