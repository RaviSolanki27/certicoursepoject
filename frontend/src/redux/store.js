import storage from "redux-persist/lib/storage";

// // import rootReducer from "./reducer/index";
import { persistReducer, persistStore } from "redux-persist";
// import rootReducer from "./reducer";

// const store =configureStore
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
const store = configureStore({
    reducer:persistedReducer
})
export const persistor = persistStore(store);

export default store