import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { ADD_NEW_ISSUE } from '../../queries/queries';
import { useState } from 'react';
import classes from './Modal.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const  BasicModal = ({setOpen, open, repoId}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => setOpen(false);
    const [AddNewIssue] = useMutation(ADD_NEW_ISSUE);

    const onSubmit = () => {
        AddNewIssue({ variables: { id: repoId, title, body: description } })
        setTitle('')
        setDescription('')
        handleClose()
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Issue
          </Typography>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '44ch' },}} noValidate autoComplete="off">
                 <TextField id="outlined-basic" label="Title" variant="outlined" onChange={e => setTitle(e.target.value)}/>
            </Box>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '44ch' },}} noValidate autoComplete="off">
                 <TextField id="outlined-basic" label="Description" variant="outlined" onChange={e => setDescription(e.target.value)}/>
            </Box>
            <Box className={classes.buttonWrapper}>
            <Button variant="contained" disableElevation className={classes.cancel} color='error' onClick={handleClose}>
                Cancel
            </Button>
            <Button  variant="contained" disableElevation className="create" onClick={onSubmit}>
                Create
            </Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
