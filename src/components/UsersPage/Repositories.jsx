import { useQuery } from "@apollo/client";
import React from "react";
import { GET_REPOSITORIES } from '../../queries/queries';
import classes from './Repositories.module.css';
import {CircularIndeterminate} from '../UsersPage/Users';

const Repositories = ({login, setCurrentRepo, setStarsCount, setWatchCount, setRepoId}) => {

    const {data, loading, error} = useQuery(GET_REPOSITORIES, { variables: { login: login } })

    let reposFromServer;

    let chooseCurrentRepo = (currentRepoName) => {
        setCurrentRepo(currentRepoName)
    }

    if(data) {
        reposFromServer = data.user.repositories.edges.map(({node}) => {
            setStarsCount(node.stargazerCount)
            setWatchCount(node.watchers.totalCount)
            setRepoId(node.id)
            return (
                <div className={classes.repo} key={node.id}>
                <div  className={classes.repoName} onClick={() => chooseCurrentRepo(node.name)}>
                    {node.name}
                </div>
                <div className={classes.repoInfo}>{node.stargazerCount} stars / {node.watchers.totalCount} watching</div>
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
        <div className={classes.repoContainer}>
        <div className={classes.repoTitle}>Repositories</div>
            {data && reposFromServer.length !== 0 ?  reposFromServer : <div className={classes.repoNotific}>There are no repositories...</div>}
        </div>
    )

}

export default Repositories;