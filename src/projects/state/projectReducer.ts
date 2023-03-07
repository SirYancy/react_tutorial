import {
    DELETE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    FIND_PROJECT_FAILURE,
    FIND_PROJECT_REQUEST,
    FIND_PROJECT_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    ProjectActionTypes,
    ProjectState,
    SAVE_PROJECT_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS
} from "./projectTypes";
import {Project} from "../Project";

export const initialProjectState: ProjectState = {
    projects: [],
    loading: false,
    error: undefined,
    page: 1
};

export function projectReducer(
    state = initialProjectState,
    action: ProjectActionTypes
) {
    switch(action.type) {
        case FIND_PROJECT_REQUEST:
            return { ...state, loading: true, error: "" };
        case FIND_PROJECT_SUCCESS:
            let project: Project;
            project = action.payload.project;
            return {
                ...state,
                loading: false,
                page: 0,
                projects: [project],
                errors: '',
            };
        case FIND_PROJECT_FAILURE:
            return { ...state, loading: false, error: action.payload.message };
        case LOAD_PROJECTS_REQUEST:
            return { ...state, loading: true, error: "" };
        case LOAD_PROJECTS_SUCCESS:
            let projects: Project[];
            const { page } = action.payload;
            if(page === 1){
                projects = action.payload.projects;
            } else {
                projects = [...state.projects, ...action.payload.projects];
            }
            return {
                ...state,
                loading: false,
                page,
                projects,
                errors: '',
            };
        case LOAD_PROJECTS_FAILURE:
            return { ...state, loading: false, error: action.payload.message };

        case SAVE_PROJECT_REQUEST:
            return { ...state };
        case SAVE_PROJECT_SUCCESS:
            if(action.payload.isNew){
                return {
                    ...state,
                    projects: [...state.projects, action.payload],
                };
            } else {
                return {
                    ...state,
                    projecst: state.projects.map((project: Project) => {
                        return project.id === action.payload.id
                        ? Object.assign({}, project, action.payload)
                        : project;
                    }),
                };
            }
        case SAVE_PROJECT_FAILURE:
            return { ...state, error: action.payload.message };

        case DELETE_PROJECT_REQUEST:
            return { ...state, };
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                projects: state.projects.filter(
                    (project: Project) => project.id != action.payload.id
                ),
            };
        case DELETE_PROJECT_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
}