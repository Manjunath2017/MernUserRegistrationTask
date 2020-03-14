//// 3rd create reducer
////Reducer it is going to take just 'state' and 'action'
import {SET_ALERT, REMOVE_ALERT} from '../actions/types';

const initialState=[];
/* //// initialState will objects
    {
        id:234125312534523425,
        msg:'password do not match!',
        alertType:'danger'
    }
*/
export default function(state=initialState, action){
    // const {type, payload}=action;
    // console.log( 'type', type);

    switch(action.type){
        case SET_ALERT:
            // console.log('payload 11 line',payload);
            // console.log('state 12 line',state);

            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}
// import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// const initialState = [];

// export default function(state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_ALERT:
//       return [...state, payload];
//     case REMOVE_ALERT:
//       return state.filter(alert => alert.id !== payload);
//     default:
//       return state;
//   }
// }