
import {
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    ProjectState,
} from './projectTypes';
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {projectAPI} from "../projectAPI";
import {Project} from "../Project";

export function loadProjects(
    page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: LOAD_PROJECTS_REQUEST });
        return projectAPI
            .get(page)
            .then((data) => {
                dispatch({
                    type: LOAD_PROJECTS_SUCCESS,
                    payload: { projects: data, page },
                });
            })
            .catch((error) => {
                dispatch({ type: LOAD_PROJECTS_FAILURE, payload: error });
            });
    };
}

export function saveProject(
    project: Project
): ThunkAction<void, ProjectState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: SAVE_PROJECT_REQUEST });
        return projectAPI
            .put(project)
            .then((data) => {
                dispatch({ type: SAVE_PROJECT_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type: SAVE_PROJECT_FAILURE });
            });
    };
}