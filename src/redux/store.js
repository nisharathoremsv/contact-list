import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

import rootReducer from './rootReducer'

const persistConfig = {
    key: 'root-2',
    storage,
    whitelist: ['authReducer'], // only name of reducer you want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
)

const store = createStore(persistedReducer, composeEnhancer);

export default store

export const persistor = persistStore(store);
