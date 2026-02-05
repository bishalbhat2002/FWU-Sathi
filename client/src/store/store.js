import {configureStore} from "@reduxjs/toolkit" 
import userReducer from "./features/user/user.slice"
import postReducer from "./features/post/post.slice";
import searchReducer from "./features/search/search.slice";
import messageReducer from "./features/message/message.slice";

const store = configureStore({
     reducer: {
          userReducer,                  // this means userReducer:userReducer....
          postReducer,
          searchReducer,
          messageReducer,


     }
})



export default store;




























/***
 * 
 * Redux Toolkit
 * 1. Store
 *        It is redux store where All the data is stored in store.
 * 
 * 2. Provider 
 *        It is used to provide the stored data in components. Without provider 
 *        we cannot get the data. We make wrapper of provider in main component 
 *        so that the data is available in all components.
 * 
 * 3. SLice (feature)
 *        It is Action + Reducer. WE have both in one file.
 *        Action -> Takes data from your application to store in the store.
 * 
 *        Reducer -> It performs operations on the data stored on the redux store. It updates the redux store.
 * 
 * 
 * Steps:
 * 
 * 1. We first configure store, where things will be stored. And provide this store in main component so that states are available everywhere.
 * 2. Then, we make slices (features) which contains name, initial state, and reducers.
 *    Name is the name of slice, initialState is initial value, and reducers are the methods that will be used to update states stored on store.
 * 3. We export all the reducers as actions as: export const {....} = Slice.actions.
 * 4. We also default export the Slider.reducer.
 * 
 * 5. To access the state on any component, we subscribe that state from store as: const variableName = useSelector(state=>state.name.value);
 * 6. To execute any reducer, we must dispatch it using dispatch(); As:
 *        const dispatch = useDispatch();         --> useDispatch() is a hook.
 *        dispatch(actionName());                 --> We call the method inside dispatch().   
 * 
 */