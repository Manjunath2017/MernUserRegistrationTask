import {SET_ALERT, REMOVE_ALERT} from './types';
import uuid from 'uuid';

////setAlert receive (...state, payload)
export const setAlert=(msg, alertType)=>dispatch=>{
    
    ////receive data from /register.js

    const id=uuid.v4(); ////vaersion4
    console.log('actions/alert.js line 6 msg', msg);
    console.log('actions/alert.js line 7 alertType', alertType);
    console.log('actions/alert.js line 8 id', id);

    dispatch({
        type:SET_ALERT,
        payload:{msg, alertType, id}
    });
}
