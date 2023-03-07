import ProjectDetail from "./ProjectDetail";
import { AppState } from "../state";
import { useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ProjectState} from "./state/projectTypes";
import {AnyAction} from "redux";
import {findProject} from "./state/projectActions";

function ProjectPage(props: any){

    const loading = useSelector(
        (appState: AppState) => appState.projectState.loading
    );
    const project = useSelector(
        (appstate: AppState) => appstate.projectState.projects[0]
    );
    const error = useSelector(
        (appState: AppState ) => appState.projectState.error
    )
    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        dispatch(findProject(id));
    }, [id]);

    return (
        <div>
            <>
                <h1>Project Detail</h1>
                {loading && (
                    <div className="center-page">
                        <span className="spinner primary"></span>
                        <p>Loading...</p>
                    </div>
                )}
                {error && (
                    <div className="row">
                        <div className="card large error">
                            <section>
                                <p>
                                    <span className="icon-alert inverse "></span>
                                    {error}
                                </p>
                            </section>
                        </div>
                    </div>
                )}
                {project && <ProjectDetail project={project} /> }
            </>
        </div>
    )
}

export default ProjectPage;