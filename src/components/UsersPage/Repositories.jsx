import { useQuery } from "@apollo/client";
import React from "react";
import { GET_REPOSITORIES } from '../../queries/queries';
// import classes from './Repositories.module.css';

const Repositories = ({login}) => {

    const {data, loading, error} = useQuery(GET_REPOSITORIES, { variables: { login: login } })

    console.log(data)

    let reposArray = data.user.repositories.edges;
    let repositoriesFromServer;

    if(reposArray.length !== 0){
        repositoriesFromServer = reposArray.map(({node}) => {
            return (
                    <div key={node.id}>{node.name}</div>
            )
        })
    }
    
    return (
        <>
        {data && repositoriesFromServer}
        </>
    )

}

export default Repositories;