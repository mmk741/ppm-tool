import * as types from './actionType'

const initialState={
    projects:[],
    project:{}
};

const reducer=(state=initialState,action)=>{

    switch(action.type)
    {
        case types.GET_PROJECTS:
            return{
                ...state,
                projects:action.payload
            }

           case types.GET_PROJECT:
               return{
                   ...state,
                   project:action.payload
               } 

            case types.DELETE_PROJECT:
                return {
                    ...state,
                    projects:state.projects.filter(project=>project.projectIdentifier!==action.payload)
                }   

        default:return state;
    }

}

export default reducer;