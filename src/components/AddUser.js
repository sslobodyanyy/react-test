import React from "react";
import axios from "axios";

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stack, Input, Divider, Button } from "@mui/material";
import { ADD_USER } from '../constants';

const AddUser = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get("https://yesno.wtf/api").then((response) => {
            const id = users.length + 1;
            const status = response.data.answer === "yes" ? "Активен" : "-";
            const avatar = createAvatar(style,{
                seed: `${name}_${age}`,
                dataUri: true
            });

            if (id && avatar && name && age && status) {
                const user = {
                    id,
                    avatar,
                    name,
                    age,
                    status
                };

                dispatch({
                    type: ADD_USER,
                    payload: user
                });

                navigate("/");
            }
        });
    }

    const nameOnChange = (e) => {
        setName(e.target.value);
    }

    const ageOnChange = (e) => {
        const value = e.target.value;
        if (value < 1) {
            e.target.value = 0;
        }
        setAge(e.target.value);
    }

    return (
        <Stack padding={ 1 }
               spacing={ 2 }
               component="form"
               direction="row"
               divider={ <Divider orientation="vertical" flexItem /> }
               onSubmit={ handleSubmit }>
            <Input placeholder="Имя" type="text" onChange={ nameOnChange } />
            <Input placeholder="Возраст" type="number" onChange={ ageOnChange } />
            <Button variant="text" type="submit">Добавить</Button>
        </Stack>
    );
};

export default React.memo(AddUser);