import { combineReducers } from "redux"
import GetAllUsersReducer from './users/getAllUsers'
import NewUserReducer from './users/newUser'
import UpdateUserReducer from './users/updateUser'
import DeleteUserReducer from './users/deleteUser'

export const rootReducer = combineReducers({
    allUserReducer: GetAllUsersReducer,
    addNewUser: NewUserReducer,
    updateUser: UpdateUserReducer,
    deleteUser: DeleteUserReducer
})

export type RootState = ReturnType<typeof rootReducer>