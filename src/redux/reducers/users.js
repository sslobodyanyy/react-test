import {
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    SORT_USERS_BY_NAME_ASC,
    SORT_USERS_BY_NAME_DESC,
    SORT_USERS_BY_AGE_ASC,
    SORT_USERS_BY_AGE_DESC
} from "../../constants";

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            state = [...state, action.payload];
            console.log(state);
            return state;
        case EDIT_USER:
            state = state.map(user => user.id === action.payload.id ? action.payload : user);
            return state;
        case DELETE_USER:
            state = state.filter(user => user.id !== action.payload.id)
            return state;
        case SORT_USERS_BY_NAME_ASC:
            return state.slice().sort((u1, u2) => {
                const n1 = u1.name.toLowerCase();
                const n2 = u2.name.toLowerCase();

                if (n1 < n2) {
                    return -1;
                }
                if (n1 > n2) {
                    return 1;
                }
                return 0;
            });
        case SORT_USERS_BY_NAME_DESC:
            return state.slice().sort((u1, u2) => {
                const n1 = u1.name.toLowerCase();
                const n2 = u2.name.toLowerCase();

                if (n1 > n2) {
                    return -1;
                }
                if (n1 < n2) {
                    return 1;
                }
                return 0;
            });

        case SORT_USERS_BY_AGE_ASC:
            return state.slice().sort((u1, u2) => {
                const a1 = parseInt(u1.age);
                const a2 = parseInt(u2.age);
                if (a1 < a2) {
                    return -1;
                }
                if (a1 > a2) {
                    return 1;
                }
                return 0;

            })
        case SORT_USERS_BY_AGE_DESC:
            return state.slice().sort((u1, u2) => {
                const a1 = parseInt(u1.age);
                const a2 = parseInt(u2.age);
                if (a1 > a2) {
                    return -1;
                }

                if (a1 < a2) {
                    return 1;
                }
                return 0;
            })
        default:
            return state;
    }
}

export default usersReducer;