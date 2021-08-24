import { combineReducers } from "redux";
 import usersReducers from "../redux/reducers";

// const createReducer = () => {
//   const comnbinedAppReducer = combineReducers({
//     homePageReducer,
//   });

const rootReducer = combineReducers({
    data : usersReducers,
}) ;
export default rootReducer;