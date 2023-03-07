import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import ReduxThunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import { ProjectState } from "./projects/state/projectTypes";
import { initialProjectState } from "./projects/state/projectReducer";
import { projectReducer } from "./projects/state/projectReducer";

const reducer = combineReducers({
    projectState: projectReducer
});

export default function configureStore(preloadedState: any) {
    const middlewares = [ReduxThunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancer = composeWithDevTools(middlewareEnhancer);

    return createStore(reducer, preloadedState, enhancer);
}

export interface AppState {
    projectState: ProjectState;
}

export const initialAppState: AppState = {
    projectState: initialProjectState
};

export const store = configureStore(initialAppState);