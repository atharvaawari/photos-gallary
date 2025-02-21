import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
import rootReducers from "./rootReducer";
import { authApi } from "./api/authApi";

const store = configureStore({
  reducer:rootReducers,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

const initApp = async()=> {

 try {
  await store.dispatch(authApi.endpoints.getUser.initiate({}, {forceRefetch:true}))
 } catch (error) {
    console.log("error2", error);
 }
}
initApp();


export default store