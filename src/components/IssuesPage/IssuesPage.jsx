import React from "react";
import { GET_ISSUES_OF_REPO } from '../../queries/queries';
import { useQuery } from "@apollo/client";
import Button from '@mui/material/Button';
import classes from "./Issues.module.css";
import {CircularIndeterminate} from '../UsersPage/Users';

const IssuesPage = ({login, currentRepo, starsCount, watchCount, userName, setOpen}) => {

    const {data, loading, error} = useQuery(GET_ISSUES_OF_REPO, { variables: { login: login, name: currentRepo } })
    let issuesFromServer;

    const setModuleStatus = () => {
        setOpen(true)
    }

    if(data){
        issuesFromServer = data.user.repository.issues.edges.map(({node}) => {
            return (
                <div className={classes.issue} key={node.id}>
                    <div>{node.title}</div>
                    <div>Created {node.createdAt.slice(0, 10)} by {userName}</div>
                </div>
            )
         })
    }

    if (loading) return (
        <div className={classes.loadingWrapper}>
            {CircularIndeterminate()}
            <div className={classes.loading}>Loading...</div>
        </div>
    )

    return (
        <div className={classes.issuesWrapper}>
            <div className={classes.repoTitleContainer}>
                <div className={classes.repoTitle}>Super Cool Repository</div>
                <div className={classes.repoInfo}>{starsCount} stars / {watchCount} watching</div>
            </div>
            <div className={classes.issuesContainer}>
                <div className={classes.issuesTitle}>Open Issues</div>
                <Button variant="contained" disableElevation className="search-container__button" onClick={setModuleStatus}>
                     New Issue
                </Button>
            </div>
            {data && issuesFromServer.length !== 0 ? issuesFromServer : <div className={classes.issuesNotific}>There are no issues here...</div>}
        </div>
    )
}

export default IssuesPage;