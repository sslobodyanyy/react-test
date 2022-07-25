import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import './Users.css';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Button,
    Avatar
} from "@mui/material";

import {
    DELETE_USER,
    SORT_USERS_BY_NAME_ASC,
    SORT_USERS_BY_NAME_DESC,
    SORT_USERS_BY_AGE_ASC,
    SORT_USERS_BY_AGE_DESC,
    ASC,
    DESC } from "../constants";

const Users = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sortDirection, setSortDirection] = useState(ASC);

    const sortUsersBy = (ascType, descType) => {
        if (sortDirection === ASC) {
            setSortDirection(DESC);
            dispatch({
                type: ascType,
                payload: users
            });
        } else {
            setSortDirection(ASC);
            dispatch({
                type: descType,
                payload: users
            });
        }
    }
    const deleteButtonHandle = (user) => {
        dispatch({
            type: DELETE_USER,
            payload: user
        });
    }

    return (

       <Stack direction="column">
            <Button variant="contained" color="success" className="add_user">
                <Link to="/add">Добавить</Link>
            </Button>
            <TableContainer id="users" component={ Paper } className="table-container">
                <Table>
                    <TableHead className="thead">
                        <TableRow align="center">
                            <TableCell>№ п/п</TableCell>
                            <TableCell>Аватар</TableCell>
                            <TableCell
                                onClick={() => sortUsersBy(SORT_USERS_BY_NAME_ASC, SORT_USERS_BY_NAME_DESC)}>Имя</TableCell>
                            <TableCell
                                onClick={() => sortUsersBy(SORT_USERS_BY_AGE_ASC, SORT_USERS_BY_AGE_DESC)}>Возраст</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((user) => (
                                <TableRow key={user.id} align="center">
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>
                                        <Avatar className="img" src={user.avatar} />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                    <TableCell>
                                        <Stack direction="row">
                                            <Button variant="contained"
                                                    onClick={() => navigate(`/${user.id}/edit`)}>Редактировать</Button>
                                            <Button variant="outlined" color="error"
                                                    onClick={() => deleteButtonHandle(user)}>Удалить</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}
export default React.memo(Users);