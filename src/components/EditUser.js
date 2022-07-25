import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Input, Stack } from "@mui/material";
import { EDIT_USER } from "../constants";

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const users = useSelector((state) => state.users);
    const user = users.find((user) => user.id === parseInt(params.id));

    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: EDIT_USER,
            payload: {
                id: user.id,
                avatar: user.avatar,
                name: name,
                age: age,
                status: user.status
            }
        });

        navigate("/");
    }

    const nameOnChange = (e) => {
        setName(e.target.value);
    }

    const ageOnChange = (e) => {
        setAge(e.target.value);
    }

    return (
        <Stack padding={ 1 }
               spacing={ 2 }
               component="form"
               direction="row"
               divider={ <Divider orientation="vertical" flexItem /> }
               onSubmit={ handleSubmit }>
            <Input name="name" placeholder="Имя" type="text" defaultValue={user.name} onChange={ nameOnChange } />
            <Input name="age" placeholder="Возраст" type="number" defaultValue={user.age} onChange={ ageOnChange } />
            <Button variant="outlined" color="secondary" type="submit">Сохранить</Button>
        </Stack>
    );
};

export default React.memo(EditUser);