import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_ERROR } from '../../../constant/ActionTypes/UserType'

const updateUser = (state: object = {}, action: any) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case USER_UPDATE_SUCCESS: {
            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case USER_UPDATE_ERROR: {
            let obj: any = {
                loading: false,
                status: action.response,
            };
            return obj;
        }
        default:
            return state;
    }
}

export default updateUser