import React, { Fragment, useState, useContext, useEffect } from 'react';
import TableComponent from '../../components/Table'
import { Container, Typography, Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem } from '@material-ui/core'
import { createNewUser, userList } from '../../redux/actions/user-action'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from '../../redux/reducers'

const MainScreen: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [joinDate, setJoinDate] = useState('')
    const [points, setPoints] = useState('')
    const [units, setUnits] = useState('')
    const [actionType, setActionType] = useState('running')
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()

    const dataState = useSelector((state: RootState) => {
        return state
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setActionType(event.target.value as string);
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        let data = {
            name: name,
            country: location,
            joinDate: joinDate,
            units: parseFloat(units),
            point: parseFloat(points),
            actionType: actionType
        }

        let result: any = await dispatch(createNewUser(data))
        if (result.type === 'USER_CREATE_SUCCESS') {
            fetchMyAPI()
        }
        else if (result.type === 'USER_CREATE_ERROR') {
            console.log('err', result)
        }
    }

    async function fetchMyAPI() {
        let result: any = await dispatch(userList(1, 5, ''))
        if (result.type === 'USER_LIST_SUCCESS') {
            setOpen(false);
            setUsers(result.response.data.data.users)
        }
        else if (result.type === 'USER_LIST_ERROR') {
            console.log('err', result)
        }
    }

    // #605D9E
    return (
        <Fragment>
            <Container>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Box mb={2}>
                            <Typography variant="h2" gutterBottom>Leaderboard</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Box mb={2}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Player</Button>
                        </Box>
                    </Grid>
                </Grid>
                <TableComponent record={users} />
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth={'sm'} fullWidth={true}>
                    <DialogTitle id="alert-dialog-title">Add Player</DialogTitle>
                    <form onSubmit={onSubmit}>
                        <DialogContent>
                            <TextField autoFocus margin="dense" id="name" label="Participatant Name" type="text" fullWidth onChange={(e) => setName(e.target.value)} />
                            <TextField autoFocus margin="dense" id="name" label="Location" type="text" fullWidth onChange={(e) => setLocation(e.target.value)} />
                            <TextField id="date" label="Birthday" type="date" fullWidth onChange={(e) => setJoinDate(e.target.value)} />
                            <TextField autoFocus margin="dense" id="name" label="Units" type="text" fullWidth onChange={(e) => setUnits(e.target.value)} />
                            <TextField autoFocus margin="dense" id="name" label="Points" type="text" fullWidth onChange={(e) => setPoints(e.target.value)} />
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={actionType} onChange={handleChange} fullWidth>
                                <MenuItem value={'running'}>Running</MenuItem>
                                <MenuItem value={'walking'}>Walking</MenuItem>
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary" onClick={onSubmit}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </Fragment>
    )
}

export default MainScreen