import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
import { authApi } from "./api/authApi";

const store = configureStore({
  reducer:rootReducers,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

const initApp = async()=> {
 try {
  await store.dispatch(authApi.endpoints.getUser.initiate({}, {forceRefetch:true}))
  console.log("called 1");
 } catch (error) {
    console.log("error2", error);
 }
}
initApp();


export default store