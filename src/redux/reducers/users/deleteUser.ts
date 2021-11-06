import { USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_ERROR } from '../../../constant/ActionTypes/UserType'

const deleteUser = (state: object = {}, action: any) => {
    switch (action.type) {
        case USER_DELETE_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case USER_DELETE_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case USER_DELETE_ERROR: {
            let obj = {
                loading: false,
                status: action.response,
            };
            return obj;
        }
        default:
            return state;
    }
}

export default deleteUser