import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import classes from './SearchBar.module.css';
import { useState } from "react";

const SearchBar = ({setUsers, clearPrevData}) => {

    let [inputValue, setInputValue] = useState('');

    let onSearchBtnClick = () => {
        setUsers(inputValue)
        setInputValue('')
        clearPrevData()
    }

    return (
        <div className={classes.searchContainer}>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                 <TextField id="outlined-basic" label="Search" variant="outlined" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            </Box>
            <Button onClick={onSearchBtnClick} variant="contained" disableElevation className="search-container__button">
                Search
            </Button>
        </div>
    )
}

export default SearchBar;