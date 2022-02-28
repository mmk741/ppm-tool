import * as types from './actionType';

const initialState={
     errors:{}
};

 const reducer=(state=initialState,action)=>{
     switch(action.type)
     {
         case types.GET_ERRORS:
         return {
             ...state,
             errors:action.payload
         };

        default: return state
     }
 }

 export default reducer;