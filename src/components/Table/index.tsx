import React, { useState, useEffect } from 'react';
import { Grid, Box, Paper, Table, TableBody, TableHead, TablePagination, TableContainer, TableRow, Button, TextField, FilledInput, OutlinedInput } from '@material-ui/core'
import { tableColumns } from '../../constant/Columns'
import { TableRecord, TableData } from '../../constant/Interface'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from '../../redux/reducers'
import { StyledTableCell, StyledTableRow, useStyles } from './style'
import { userList, updateUserRecord, deleteUserRecord } from '../../redux/actions/user-action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";

const TableComponent: React.FC<TableRecord> = ({ record, pageNumber, rowPerPageNumber, count, toggle, remove, modal, errorMessage }) => {
    const classes = useStyles();

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [rows, setRows] = useState<TableData[]>([])
    const [counts, setCounts] = useState(0)
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()

    const dataState = useSelector((state: RootState) => {
        return state
    })

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const createData = (id: string, SNo: number, participantName: string, location: string, date: any, units: string, type: string, points: any, action: any): TableData => {
        return { id, SNo, participantName, location, date, units, type, points, action };
    }

    async function fetchMyAPI() {
        let result: any = await dispatch(userList(page, rowsPerPage, ''))
        if (result.type === 'USER_LIST_SUCCESS') {
            const row: any = []
            let obj: any = {}
            setUsers(result.response.data.data.users)
            setCounts(result.response.data.data.pagination.count)
            result?.response?.data?.data?.users?.map((data: any, index: number) => {
                obj = createData(data.id, ++index, data.name, data.country, moment(data.joinDate).format("MM/DD/YYYY"), data.units, data.actionType,
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Box mb={2}>
                            <Button variant="outlined" onClick={() => updatePoints(data.id, data.point)} >+</Button>
                        </Box>
                        <Box mb={2}>
                            <TextField id="outlined-basic" variant="outlined" value={data.point} size={'small'} />
                        </Box>
                        <Box mb={2}>
                            <Button variant="outlined" onClick={() => minusPoints(data.id, data.point)}>-</Button>
                        </Box>
                    </Box>,
                    <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
                        <FontAwesomeIcon icon={faTrashAlt} size="1x" onClick={() => { deleteRecord(data.id) }} />
                    </Box >)
                row.push(obj)
            })
            setRows(row)
        }
        else if (result.type === 'USER_LIST_ERROR') {
            console.log('err', result)
        }
    }

    const deleteRecord = async (id: string) => {
        let result: any = await dispatch(deleteUserRecord(id))
        if (result.type === 'USER_DELETE_SUCCESS') {
            fetchMyAPI()
        }
        else if (result.type === 'USER_DELETE_ERROR') {
            console.log('err', result)
        }
    }

    const updatePoints = async (id: string, val: number) => {
        let points: any = {
            point: ++val
        }
        console.log('points', points, id)
        let result: any = await dispatch(updateUserRecord(points, id))
        if (result.type === 'USER_UPDATE_SUCCESS') {
            fetchMyAPI()
        }
        else if (result.type === 'USER_UPDATE_ERROR') {
            console.log('err', result)
        }
    }

    const minusPoints = async (id: string, val: number) => {
        let points: any = {
            point: --val
        }
        console.log('points', points)
        let result: any = await dispatch(updateUserRecord(points, id))
        if (result.type === 'USER_UPDATE_SUCCESS') {
            fetchMyAPI()
        }
        else if (result.type === 'USER_UPDATE_ERROR') {
            console.log('err', result)
        }
    }

    useEffect(() => {
        fetchMyAPI()
    }, [page, rowsPerPage, record])

    return (
        <>
            <Paper className={classes.root} elevation={10}>
                <TableContainer className={classes.tableTopBorder}>
                    <Table stickyHeader aria-label="sticky table" className={classes.table}>
                        <TableHead >
                            <TableRow>
                                {tableColumns.map((column) => (
                                    <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{column.label}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <StyledTableRow key={row.id}>
                                        {tableColumns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell component="th" scope="row" align={column.align} key={column.id} >
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination className={classes.tableBottomBorder}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={counts && counts}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default TableComponent