import * as types from './actionType';
const initialState={
    project_tasks:[],
    project_task:{}
}

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
       case types.GET_BACKLOG: 
              return {
                  ...state,
                    project_tasks:action.payload
              }
         
        case types.GET_BACKLOG_TASK:
              return {
                  ...state,
                  project_task:action.payload
              }   
              
            case types.DELETE_BACKLOG_TASK:
                return {
                    ...state,
                    
                    project_tasks:state.project_tasks.filter(project_task=>project_task.projectSequence !==action.payload)
                }  

        default: return state;
    }
}


export default reducer;