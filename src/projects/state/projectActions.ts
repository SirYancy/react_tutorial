
import {
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    ProjectState, FIND_PROJECT_REQUEST, FIND_PROJECT_SUCCESS, FIND_PROJECT_FAILURE,
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

export function findProject(
    id: number
): ThunkAction<void, ProjectState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: FIND_PROJECT_REQUEST });
        return projectAPI
            .find(id)
            .then((data) => {
                dispatch( {
                    type: FIND_PROJECT_SUCCESS,
                    payload: { project: data },
                });
            })
            .catch((error) => {
                dispatch( { type: FIND_PROJECT_FAILURE });
            })
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
