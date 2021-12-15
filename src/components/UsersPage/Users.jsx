import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries/queries';
import React from "react";
import classes from './Users.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const CircularIndeterminate = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
}


const Users = ({users, setActiveUser, setUserName, clearPrevData}) => {

    const { data, loading, error } = useQuery(GET_USERS, { variables: { name: users } });

    let usersFromServer;

    if (loading) return (
        <div className={classes.loadingWrapper}>
            {CircularIndeterminate()}
            <div className={classes.loading}>Loading...</div>
        </div>
    )

        usersFromServer = data.search.edges.map(({ node }) => {
            
            setUserName(node.name)

            const activeUserClick = (owner) => {
                clearPrevData()
                setActiveUser(owner)
            }

            return (
                <div className={classes.userItem} key={node.id} onClick={() => activeUserClick(node.login)}>
                    <img src={node.avatarUrl} alt="" />
                    <div className={classes.names}>{node.name}</div>
                </div>
            )
        })

    return (
        <div className={classes.main}>
        <div className={classes.usersTitle}>Users</div>
        <div className={classes.usersWrapper}>
            {usersFromServer}
        </div>
        </div>
    )
}

export default Users;