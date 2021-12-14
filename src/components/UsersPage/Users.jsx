import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries/queries';
import React from "react";
import classes from './Users.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Users = ({users, setActiveUser}) => {

    const { data, loading, error } = useQuery(GET_USERS, { variables: { name: users } });

    let usersFromServer;

    let CircularIndeterminate = () => {
        return (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        );
    }

    let activeUserClick = (owner) => {
        setActiveUser(owner)
    }

    if (loading) return (
        <div className={classes.loadingWrapper}>
            {CircularIndeterminate()}
            <div className={classes.loading}>Loading...</div>
        </div>
    )
        usersFromServer = data.search.edges.map(({ node }) => {
            return (
                <div className={classes.userItem} key={node.id} onClick={() => activeUserClick(node.login)}>
                    <img src={node.avatarUrl} alt="" />
                    <div className={classes.names}>{node.name || node.login}</div>
                </div>
            )
        })

    return (
        <div className={classes.usersWrapper}>
            {usersFromServer}
        </div>
    )
}

export default Users;